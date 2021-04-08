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

  public addDepartamentos(departamento: any){
    const HttpHeader = new HttpHeaders({
      'content-type': 'application/json'
    })

    return this.http.post(this.departamentoUrl, departamento, {headers: HttpHeader});
  }

}
