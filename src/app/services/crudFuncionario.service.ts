import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CrudFuncionarioService {
  funcionarioUrl = environment.urlDaApi + 'api/Funcionarios';

  constructor(private http: HttpClient) {}

  public getFuncionario(DepartamentoId): Observable<any> {
    return this.http.get(
      this.funcionarioUrl + '/porDepartamento/' + DepartamentoId
    );
  }

  public postFuncionario(funcionario: any) {

    return this.http.post(this.funcionarioUrl, funcionario);
  }

  public getFuncionarioWithId(id): Observable<any> {
    return this.http.get(this.funcionarioUrl + '/' + id);
  }

  public putFuncionario(funcionario: any, id: number): Observable<any> {
    funcionario.funcionarioId = id;
    const HttpHeader = new HttpHeaders({
      'content-type': 'application/json',
    });

    return this.http.put(this.funcionarioUrl + '/' + id, funcionario, {
      headers: HttpHeader,
    });
  }

  public deleteFuncionario(id) {
    return this.http.delete(this.funcionarioUrl + '/' + id);
  }
}
