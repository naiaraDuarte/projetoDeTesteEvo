import { BsModalService } from 'ngx-bootstrap/modal';
import { Mdepartamento } from './../models/departamento.models';
import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';
import { formatCurrency } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.css']
})
export class DepartamentoComponent implements OnInit {
  departamentos:any;
  erro: any;
  data: Array<any>;
  closeResult: string;
  departamento: any;

  constructor(private CrudService: CrudService, private modalService: NgbModal) {
    this.getter();
  }

  ngOnInit() {
    this.departamento = {};
    this.departamento.DepartamentoId = 0;
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

  adicionar(frm: FormGroup){
    console.log("TESTE", this.departamento);
    this.CrudService.addDepartamentos(this.departamento).subscribe((data: Mdepartamento) => {
      //this.departamentos = data;
      console.log("RESPOSTAAAAAAAAA", data);
      frm.reset();
    }, (error: any) => {
      this.erro = error;
      console.error(error);
    });
  }

  modal(add){
    this.modalService.open(add, { centered: true });
  }

}
