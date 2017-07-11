# INTEGRAÇÃO DO CHECKOUT TRANSPARENTE DO PAGSEGURO COM O ANGULAR 2/4

Simples integração do checkout transparente do pagseguro com o angular 2/4 (código referente ao frontend).

Este exemplo visa; 


    1 - inserir o javascript do pagseguro dinamicamente, ou seja, no momento em que o componente de pagamento for chamado;
    2 - busca o id da sessão do checkout junto a api do seu servidor;
    3 - busca a bandeira do cartão de crédito;
    4 - busca as parcelas disponíveis para a compra em questão;
    5 - gera o hash do comprador (necessário para transação do checkout transparente do pagseguro);
    6 - gera o hash do cartão de crédito (necessário para transação de cartão de crédito do checkout transparente do pagseguro); 
    7 - outros detalhes a cerca do código frontend para checkout transparente;

em minhas aplicações, estu usando o laravel para o bachend. Estou usando uma biblioteca que já traz toda a lógica do checkout do lado do servidor.
a bibliotéca é esta: https://github.com/artistas/laravel-pagseguro você pode criar a sua própria biblioteca na linguagem que você preferir, usar algum SDK etc.. verifique a documentação do pagseguro para saber mais detalhes a respeito.

Este código é apenas demonstrativo. Ele foi testado e está funcionando, porém é necessário implementar algumas validações para evitar erros. 

Dúvidas: renatosistemas.vc@gmail.com
at.te: Renato Souza