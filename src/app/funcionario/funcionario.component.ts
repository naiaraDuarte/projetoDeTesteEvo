import { Component, OnInit } from '@angular/core';
import { CrudFuncionarioService } from '../services/crudFuncionario.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Mfuncionario } from '../models/funcionario.models';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.css']
})
export class FuncionarioComponent implements OnInit {

  urlImagem: string = "/assets/img/default.jpg";
  imagemSelecionada : File = null;
  funcionarios:any;
  erro: any;
  data: Array<any>;
  closeResult: string;
  funcionario: any;
  id: number = null;
  DepartamentoId: number;

  constructor(private CrudService: CrudFuncionarioService, private modalService: NgbModal, private route: ActivatedRoute) {
    this.DepartamentoId = parseInt(this.route.snapshot.paramMap.get('id'));
    this.ObterRegistros();
  }

  ngOnInit() {
    this.funcionario = {};
    this.funcionario.funcionarioId = this.id;
    this.funcionario.departamentoId = this.DepartamentoId;
    this.funcionario.foto = '';
  }

  carregarImagem(file: FileList){
    this.imagemSelecionada = file.item(0);

    var reader = new FileReader();
    reader.onload = (event: any) =>{
      this.urlImagem = event.target.result;
    }
    reader.readAsDataURL(this.imagemSelecionada);
  }

  ObterRegistros(){
    console.log(this.DepartamentoId);
    this.CrudService.getFuncionarios(this.DepartamentoId).subscribe((data: Mfuncionario) => {
      console.log(data);
      this.funcionarios = data;
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

    this.CrudService.addFuncionario(this.funcionario).subscribe((data) => {
       this.funcionarios.push(data);
      frm.reset();
    }, (error: any) => {
      this.erro = error;
      console.error(error);
    });
  }

  atualizar(frm){
    this.CrudService.atualiza(this.funcionario, this.id).subscribe((data) => {
      this.id = null;
      this.ObterRegistros();
      frm.reset();
    }, (error: any) => {
      this.erro = error;
      console.error(error);
    });
  }

  selecionar(el){
    this.id = parseInt(el.dataset.funcionarioid);
    console.log("id", this.id);
    this.CrudService.selecionaComId(this.id).subscribe((data: Mfuncionario) => {
      console.log("seleciona", data);
      this.funcionario = data;

    }, (error: any) => {
      this.erro = error;
      console.error(error);
    });
  }

  excluir(el){
    this.id = parseInt(el.dataset.funcionarioid);
    this.CrudService.excluirFuncionario(this.id).subscribe((data: Mfuncionario) => {
      this.funcionarios = data;
      this.ObterRegistros();
    }, (error: any) => {
      this.erro = error;
      console.error(error);
    });
  }

}
