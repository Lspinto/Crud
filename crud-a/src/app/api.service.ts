import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseurl = "http://127.0.0.1:8000/"
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { }

  getAllClientes(): Observable<any>{
    return this.http.get(this.baseurl + 'clienteviews/', {headers: this.httpHeaders})
  };


  getOneClientes(id): Observable<any>{
    return this.http.get(this.baseurl + 'clienteviews/' + id + '/', {headers: this.httpHeaders})
  };


  updateCliente(cliente): Observable<any>{
    const body = { nome: cliente.nome, idade: cliente.idade, cpf: cliente.cpf};
    return this.http.put(this.baseurl + 'clienteviews/' + cliente.id + '/', body,
     {headers: this.httpHeaders})
  }

  createCliente(cliente): Observable<any>{
    const body = { nome: cliente.nome, idade: cliente.idade, cpf: cliente.cpf};
    return this.http.post(this.baseurl + 'clienteviews/', body,
     {headers: this.httpHeaders})
  }

  deleteCliente(id): Observable<any>{
      return this.http.delete(this.baseurl + 'clienteviews/' + id + '/',
       {headers: this.httpHeaders})
  }
}
