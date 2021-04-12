import { BsModalService } from 'ngx-bootstrap/modal';
import { Mdepartamento } from './../models/departamento.models';
import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';
import { formatCurrency } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private CrudService: CrudService, private modalService: NgbModal, private router: Router) {
    this.ObterRegistros();
  }

  ngOnInit() {
    this.departamento = {};
    this.departamento.DepartamentoId = 0;
  }

  redireciona(el){
    this.id = parseInt(el.dataset.departamentoid);
    this.router.navigate(['/funcionario', this.id]);
  }

  ObterRegistros(){
    this.CrudService.getDepartamentos().subscribe((data: Mdepartamento) => {
      this.departamentos = data;
    }, (error: any) => {
      this.erro = error;
      console.error(error);
    });

  }

  salvar(frm: FormGroup){
    if(this.id == null){
      this.adicionar(frm);
    }else{
      this.atualizar(frm);
    }

  }

  adicionar(frm){
    this.CrudService.addDepartamentos(this.departamento).subscribe((data) => {
       this.departamentos.push(data);
      frm.reset();
    }, (error: any) => {
      this.erro = error;
      console.error(error);
    });
  }

  atualizar(frm){
    this.CrudService.atualiza(this.departamento, this.id).subscribe((data) => {
      const atualizaIndex = data ? this.departamentos.findIndex( d => data.DepartamentoId == d.DepartamentoId): -1;
      if(atualizaIndex > -1){
        this.departamentos[atualizaIndex] = data;
      }
      this.id = null;
      this.ObterRegistros();
      frm.reset();
    }, (error: any) => {
      this.erro = error;
      console.error(error);
    });
  }

  selecionar(el, content){
    this.modalService.open(content, { centered: true });
    this.id = parseInt(el.dataset.departamentoid);
    console.log("id", this.id);
    this.CrudService.selecionaComId(this.id).subscribe((data) => {
      console.log("seleciona", data);
      this.departamento = data;
    }, (error: any) => {
      this.erro = error;
      console.error(error);
    });
  }

  excluir(el){
    this.id = parseInt(el.dataset.departamentoid);
    this.CrudService.excluirDepartamentos(this.id).subscribe((data: Mdepartamento) => {
      this.departamentos = data;
      this.ObterRegistros();
    }, (error: any) => {
      this.erro = error;
      console.error(error);
    });
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

}
