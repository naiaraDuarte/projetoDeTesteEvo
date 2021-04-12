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
  return this.http.get(this.funcionarioUrl + '/porDepartamento/' + DepartamentoId);
}

public addFuncionario(funcionario: any){
  const HttpHeader = new HttpHeaders({
    'content-type': 'application/json'
  })
  funcionario.funcionarioId = 0;

  console.log(funcionario);

  return this.http.post(this.funcionarioUrl, funcionario);
}

public atualiza(funcionario: any, id:number): Observable<any>{
  funcionario.funcionarioId = id;
  console.log("Departamento", this.funcionarioUrl + '/' + id, funcionario);
  const HttpHeader = new HttpHeaders({
    'content-type': 'application/json'
  })

  return this.http.put(this.funcionarioUrl + '/' + id, funcionario, {headers: HttpHeader});
}

public selecionaComId(id): Observable<any>{
  return this.http.get(this.funcionarioUrl + '/' + id);
}

public excluirFuncionario(id){
  return this.http.delete(this.funcionarioUrl + '/' + id);
}
}
