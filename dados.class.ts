export class Dados{

    public id:number;
    public nome:string       = 'Danilo Azevendo Santos';
    public telefone:string   = '(77) 988997889';
    public email:string      = 'teste@sandbox.pagseguro.com.br';
    public cpf:string        = '957.937.874-61';
    public nascimento:string = '16/09/1987';
    public logradouro:string = 'Av Central';
    public numero:string     = '45';
    public bairro:string     = 'Centro';
    public cep:string        = '45002-055';
    public cidade:string     = 'Vitória da Conquista';
    public estado:string     = 'ba';
    public numCard:string;              //ex: '4111111111111111'      
    public mesValidadeCard:string;      // ex: '12';
    public anoValidadeCard:string;      // ex: '2030';
    public codSegCard:string;           // ex: '123';
    public hashComprador:string;        // preenchido dinamicamente
    public bandCard:string;             // preenchido dinamicamente
    public hashCard:string;             // preenchido dinamicamente
    public parcelas:Array<Object> = []; // preenchido dinamicamente

    constructor(obj?) {
        
        Object.assign(this, obj, {}, {});
    }
}

