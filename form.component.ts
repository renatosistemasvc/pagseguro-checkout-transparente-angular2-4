import { Component }         from '@angular/core';
import { pagamentoService }  from './pagamento.service';
import { Dados }             from './dados.class';
import { VariableGlobal }    from './variable.global.service';

declare var PagSeguroDirectPayment:any;

@Component({

  templateUrl: "./form.html",

})
export class FormComponent {

  public dados = new Dados ();

  constructor(public pagamentoService: PagamentoService, private variableGlobal: VariableGlobal) {
    
    //CARREGA O JAVASCRIPT DO PAGSEGURO 
    this.carregaJavascriptPagseguro();

  }

  //BUSCA A BANDEIRA DO CARTÃO (EX: VISA, MASTERCARD ETC...) E DEPOIS BUSCA AS PARCELAS;
  //ESTA FUNÇÃO É CHAMADA QUANDO O INPUT QUE RECEBE O NÚMERO DO CARTÃO PERDE O FOCO;
  buscaBandeira(){
    
    PagSeguroDirectPayment.getBrand({
					cardBin: this.dados.numCard,
					success: response => { 
            
            this.dados.bandCard = response.brand.name;
            this.buscaParcelas();
            console.log('Bandeira do cartão: ' + this.dados.bandCard);
        
          },
					error: response => { console.log(response); }
		});	
 
  }


  //BUSCA AS PARCELAS NA API DO PAGSEGURO PARA O CLIENTE ESCOLHER
  buscaParcelas(){

    PagSeguroDirectPayment.getInstallments({

				amount:  '100',              //valor total da compra (deve ser informado)
				brand: this.dados.bandCard, //bandeira do cartão (capturado na função buscaBandeira)
				maxInstallmentNoInterest: 3,
				success: response => { 

          this.dados.parcelas = response.installments[this.dados.bandCard];
          console.log('parcelas: '+ response);

				},
				error: response => {	console.log( response)	}
		});

  }
  
  //AO CLICAR NO BOTÃO PAGAR
  onSubmit(f){

        //BUSCA O HASH DO COMPRADOR JUNTO A API DO PAGSEGURO
        this.dados.hashComprador = PagSeguroDirectPayment.getSenderHash();
     
        //CRIA O HASK DO CARTÃO DE CRÉDITO JUNTO A API DO PAGSEGURO
        PagSeguroDirectPayment.createCardToken({
        
          cardNumber:       this.dados.numCard,
          cvv:              this.dados.codSegCard,
          expirationMonth:  this.dados.mesValidadeCard,
          expirationYear:   this.dados.anoValidadeCard,
          brand:            this.dados.bandCard,
          success: response => {
          
          this.dados.hashCard = response.card.token;
          console.log(this.dados);

          //NESTE MOMENTO JÁ TEMOS TUDO QUE PRECISAMOS!
          //HORA DE ENVIAR OS DADOS PARA O SERVIDOR PARA CONCRETIZAR O PAGAMENTO
          this.enviaDadosParaServidor();
             
          },
          error: response => { console.log(response) }

        });
      
    }

    enviaDadosParaServidor(){

      //COLOQUE AQUI O CÓDIGO PARA ENVIAR OS DADOS PARA O SERVIDOR (PHP, JAVA ETC..) PARA QUE ELE CONSUMA A API DO PAGSEGURO E CONCRETIZE A TRANSAÇÃO
      this.pagamentoService.store(this.dados).subscribe(result => console.log(result));
    }

    //CARREGA O JAVASCRIPT DO PAGSEGURO (A EXPLICAÇÃO ESTA FUNÇÃO ESTÁ LOGO ABAIXO)
    carregaJavascriptPagseguro(){
      
      if(!this.variableGlobal.getStatusScript())
      {
        //SEJA O JAVASCRIPT NO CABEÇÁRIO DA PÁGINA
        new Promise((resolve) => {
          let script: HTMLScriptElement = document.createElement('script');
          script.addEventListener('load', r => resolve());
          script.src = 'https://stc.sandbox.pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.directpayment.js';
          document.head.appendChild(script);      
        });

        //BUSCA UM ID DE SESSÃO NO SERVIDOR (ESTE ID É GERADO PELA API DO PAGSEGURO QUE VOCÊ DEVE CONSUMIR USANDO SEU SERVIDOR. LER DOCUMENTAÇÃO PARA SABER COMO GERAR)
        this.pagamentoService.startSession().subscribe(result => PagSeguroDirectPayment.setSessionId(result));

        this.variableGlobal.setStatusScript(true);
      }

    }

  
}

/*

  PARA USAR O CHECKOUT TRANSPARENTE DO PAGSEGURO, É NECESSÁRIO CARREGAR UM ARQUIVO JS EXTERNO (pagseguro.directpayment.js). 
  AQUI NÓS USAMOS UM SCRIPT PARA QUE ESSE JS SEJA CARREGADO SOMENTE NA HORA QUE ESTE COMPONENTE FOR CHAMADO (EVITANDO CARREGAR O JS DO PAGSEGURO 
  TODA VEZ QUE O COMPONENTE FOR CHAMADO). PORÉM, SE VOCÊ PREFERIR, O JS PODE SER CARREGADO NO INDEX.HTML (FICA AO SEU CRITÉRIO). 

  O SCRIPT, QUE FICA NA FUNÇÃO carregaJavascriptPagseguro(), CRIA UMA TAG DO TIPO SCRIPT NO HEAD DA PÁGINA E SETA O ARQUIVO JS PARA EVITAR QUE O JS SEJA 
  CARREGADO TODA HORA QUE O COMPONENTE FOR CHAMADO. TAMBÉM CRIAMOS UM SERVIÇO GLOBAL QUE ARMAZENA UMA VARIÁVEL BOOLEANA PARA INFICAR SE O JS JÁ 
  FOI CARREGADO OU NÃO. UMA VEZ CARREGADO, O JS NÃO SERÁ CARREGADO NOVAMENTE.

*/