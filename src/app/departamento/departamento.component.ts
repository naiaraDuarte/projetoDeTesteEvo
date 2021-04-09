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
  id: number;

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
    }, (error: any) => {
      this.erro = error;
      console.error(error);
    });

  }

  adicionar(frm: FormGroup){
    if(this.id == null){
      this.CrudService.addDepartamentos(this.departamento).subscribe((data) => {
        this.departamentos = data as string[];
        frm.reset();
      }, (error: any) => {
        this.erro = error;
        console.error(error);
      });
    }else{
      this.CrudService.atualiza(this.departamento, this.id).subscribe((data) => {
        this.departamentos = data as string[];
        frm.reset();
      }, (error: any) => {
        this.erro = error;
        console.error(error);
      });
    }

  }

  seleciona(el){
    this.id = parseInt(el.dataset.departamentoid);
    console.log("id", this.id);
    this.CrudService.selecionaComId(this.id).subscribe((data: Mdepartamento) => {
      console.log("seleciona", data);
      this.departamentos = data;

    }, (error: any) => {
      this.erro = error;
      console.error(error);
    });
  }

  excluir(el){
    this.id = parseInt(el.dataset.departamentoid);
    this.CrudService.excluirDepartamentos(this.id).subscribe((data: Mdepartamento) => {
      this.departamentos = data;

    }, (error: any) => {
      this.erro = error;
      console.error(error);
    });
  }

  modal(add){
    this.modalService.open(add, { centered: true });
  }

}
