import { Mdepartamento } from './../models/departamento.models';
import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.css']
})
export class DepartamentoComponent implements OnInit {
  departamentos:any;
  erro: any;
  data: Array<any>;

  constructor(private CrudService: CrudService) {
    this.getter();

    /*this.data = [
        { id: 1, firstName: 'John', lastName: 'Doe' },
        { id: 1, firstName: 'Michael', lastName: 'Smith' },
        { id: 3, firstName: 'Michael', lastName: 'Jordan'},
        { id: 1, firstName: 'Tanya', lastName: 'Blake' }
    ];*/
  }

  ngOnInit() {
  }

  getter(){

    this.CrudService.getDepartamentos().subscribe((data: Mdepartamento) => {
      this.departamentos = data;
      console.log('depDATSA', data);
      console.log('dep', this.departamentos);
    }, (error: any) => {
      this.erro = error;
      console.error(error);
    });

  }

}
