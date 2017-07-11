import {Http, Response, 
        Headers, RequestOptions}  from '@angular/http'
import { Injectable }             from '@angular/core';
import { Dados }                  from './dados.class';


/* CLASSE SERVIÇO: RESPONSÁVEL POR ESTABELECER COMUNICAÇÃO COM O SERVIDOR */

@Injectable()
export class PagamentoService {
  constructor(private http: Http) {}


  public startSession (){

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        
        return this.http.get('http://www.suaApi.com.br/getIdSession', options)
                        .map(res => res.json());
  }

  public store (dados:Dados){

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        
        let body = JSON.stringify({ dados });
        return this.http.post('http://www.suaApi.com.br/store', body, options)
                        .map(res => res.json());
  }

  public cancel (){

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        
        return this.http.get('http://www.suaApi.com.br/cancel', options)
                        .map(res => res.json());
  }


}