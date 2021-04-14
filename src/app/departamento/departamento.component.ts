import { Mdepartamento } from './../models/departamento.models';
import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crudDepartamento.service';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.css']
})
export class DepartamentoComponent implements OnInit {
  departamentos:any;
  departamento: any;
  id: number;

  constructor(private CrudService: CrudService, private modalService: NgbModal, private router: Router) {
    this.ObterRegistros();
  }

  ngOnInit() {
    this.departamento = {};
    this.departamento.DepartamentoId = 0;
  }

  ObterRegistros(){
    this.CrudService.getDepartamento().subscribe((data: Mdepartamento) => {
      this.departamentos = data;
    }, (error: any) => {
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
    this.departamento.DepartamentoId = 0;
    this.CrudService.postDepartamento(this.departamento).subscribe((data: Mdepartamento) => {
       this.departamentos.push(data);
      frm.reset();
    }, (error: any) => {
      console.error(error);
    });
  }

  atualizar(frm){
    this.CrudService.putDepartamento(this.departamento, this.id).subscribe((data) => {
      this.id = null;
      this.ObterRegistros();
      frm.reset();
    }, (error: any) => {
      console.error(error);
    });
  }

  selecionar(el, content){
    this.modalService.open(content, { centered: true });
    this.id = parseInt(el.dataset.departamentoid);
    this.CrudService.getDepartamentoWithId(this.id).subscribe((data: Mdepartamento) => {
      this.departamento = data;
    }, (error: any) => {
      console.error(error);
    });
  }

  excluir(el){
    this.id = parseInt(el.dataset.departamentoid);
    this.CrudService.deleteDepartamento(this.id).subscribe((data: Mdepartamento) => {
      this.departamentos = data;
      this.ObterRegistros();
    }, (error: any) => {
      console.error(error);
    });
  }

  redirecionar(el){
    this.id = parseInt(el.dataset.departamentoid);
    this.router.navigate(['/funcionario', this.id]);
  }

  abrirModal(content) {
    this.id = null;
    this.modalService.open(content, { centered: true });
  }
}
