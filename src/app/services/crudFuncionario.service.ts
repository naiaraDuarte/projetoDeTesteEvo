import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudFuncionarioService {

  funcionarioUrl = 'https://localhost:44363/api/Funcionarios';

constructor(private http: HttpClient) { }

public getFuncionarios(DepartamentoId): Observable<any>{
  return this.http.get(this.funcionarioUrl + '/teste/' + DepartamentoId);
}

public addFuncionario(funcionario: any){
  const HttpHeader = new HttpHeaders({
    'content-type': 'application/json'
  })
  funcionario.funcionarioId = 0;

  console.log(funcionario);

  return this.http.post("https://localhost:44363/api/Funcionarios", funcionario);
}

public atualiza(departamento: any, id:number): Observable<any>{
  departamento.DepartamentoId = id;
  console.log("Departamento", this.funcionarioUrl + '/' + id, departamento);
  const HttpHeader = new HttpHeaders({
    'content-type': 'application/json'
  })

  return this.http.put(this.funcionarioUrl + '/' + id, departamento, {headers: HttpHeader});
}
}
