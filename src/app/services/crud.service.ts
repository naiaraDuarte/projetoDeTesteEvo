import { DepartamentoComponent } from './../departamento/departamento.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mdepartamento } from '../models/departamento.models';

@Injectable({
  providedIn: 'root'
})

export class CrudService {

  departamentoUrl = 'https://localhost:44363/api/Departamentos';

  constructor(private http: HttpClient) { }

  public getDepartamentos(): Observable<any>{
    return this.http.get(this.departamentoUrl);
  }

  //colocar o tipo ao inves do any
  public addDepartamentos(departamento: any){
    const HttpHeader = new HttpHeaders({
      'content-type': 'application/json'
    })

    return this.http.post(this.departamentoUrl, departamento, {headers: HttpHeader});
  }

  public selecionaComId(id): Observable<any>{
    return this.http.get(this.departamentoUrl + '/' + id);
  }

  public atualiza(departamento: any, id:number): Observable<any>{
    departamento.DepartamentoId = id;
    console.log("Departamento", this.departamentoUrl + '/' + id, departamento);
    const HttpHeader = new HttpHeaders({
      'content-type': 'application/json'
    })

    return this.http.put(this.departamentoUrl + '/' + id, departamento, {headers: HttpHeader});
  }

  public excluirDepartamentos(id){
    return this.http.delete(this.departamentoUrl + '/' + id);
  }

}
