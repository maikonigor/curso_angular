import {CONTATOS} from './contatos.mock'
import {Contato} from './contato.model';
import {Http, Headers, Response} from '@angular/http';
import {Injectable} from '@angular/core';

import 'rxjs/add/operator/toPromise'
import { Observable } from 'rxjs';

@Injectable()
export class ContatoService{

    private apiUrl:string = 'app/contatos';
    private headers: Headers = new Headers({'content-Type': 'application/json'});

    constructor(
        private http: Http
    ){  }

    create(contato:Contato): Promise<Contato>{
        return this.http
            .post(this.apiUrl, JSON.stringify(contato), {headers: this.headers})
            .toPromise()
            .then((response: Response)=>{
                return response.json().data as Contato;
            })
            .catch(this.handleError);
    }

    update(contato: Contato): Promise<Contato>{
        const urlUpdate = `${this.apiUrl}/${contato.id}`; //app/contatos:id
        return this.http
            .put(urlUpdate, JSON.stringify(contato), {headers: this.headers})
            .toPromise()
            .then(()=> contato as Contato)
            .catch(this.handleError);
    }

    delete(contato:Contato):Promise<Contato>{
        const urlUpdate = `${this.apiUrl}/${contato.id}`; //app/contatos:id
        return this.http
            .delete(urlUpdate, {headers: this.headers})
            .toPromise()
            .then(()=> contato as Contato)
            .catch(this.handleError);
    }
   
    getContatos(): Promise<Contato[]>{
        return this.http.get(this.apiUrl)
        .toPromise()
        .then(response => { 
            console.log(response.json().data);
            return response.json().data as Contato[];
        })
    }

    getContato(id: number): Promise<Contato>{
       return  this.getContatos()
        .then((contatos: Contato[])=>{
                return contatos.find((contato)=>{
                    return contato.id === id;
                })
        }).catch(this.handleError);
    }

    private handleError(err: any): Promise<any>{
        console.log("Error: " + err);
        return Promise.reject(err.message || err);
    }

    search(termo:string):Observable<Contato[]>{
        return this.http
                .get(`${this.apiUrl}/?nome=${termo}`)
                .map((resp:Response) => resp.json().data as Contato[]);

    }

}