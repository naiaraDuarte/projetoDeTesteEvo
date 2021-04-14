import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mdepartamento } from '../models/departamento.models';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  departamentoUrl = 'https://localhost:44363/api/Departamentos';

  constructor(private http: HttpClient) {}

  public getDepartamento(): Observable<any> {
    return this.http.get(this.departamentoUrl);
  }

  public postDepartamento(departamento: Mdepartamento) {
    const HttpHeader = new HttpHeaders({
      'content-type': 'application/json',
    });

    return this.http.post(this.departamentoUrl, departamento, {
      headers: HttpHeader,
    });
  }

  public getDepartamentoWithId(id): Observable<any> {
    return this.http.get(this.departamentoUrl + '/' + id);
  }

  public putDepartamento(
    departamento: Mdepartamento,
    id: number
  ): Observable<any> {
    departamento.DepartamentoId = id;
    const HttpHeader = new HttpHeaders({
      'content-type': 'application/json',
    });

    return this.http.put(this.departamentoUrl + '/' + id, departamento, {
      headers: HttpHeader,
    });
  }

  public deleteDepartamento(id) {
    return this.http.delete(this.departamentoUrl + '/' + id);
  }
}
