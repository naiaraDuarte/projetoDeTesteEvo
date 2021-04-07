import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mdepartamento } from '../models/departamento.models';

@Injectable({
  providedIn: 'root'
})

export class CrudService {

  constructor(private http: HttpClient) { }

  public getDepartamentos(): Observable<any>{
    return this.http.get('https://localhost:44363/api/Departamentos');
  }

}
