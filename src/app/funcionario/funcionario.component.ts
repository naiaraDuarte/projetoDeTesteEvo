import { environment } from './../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { CrudFuncionarioService } from '../services/crudFuncionario.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Mfuncionario } from '../models/funcionario.models';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.css'],
})
export class FuncionarioComponent implements OnInit {
  urlImagemTeste: string = '/assets/img/default.jpg';
  imagemSelecionada: File = null;
  funcionarios: any;
  funcionario: any;
  id: number = null;
  departamentoId: number;
  foto = '';
  imagemParaAlterar: string = '';

  constructor(
    private CrudService: CrudFuncionarioService,
    private modalService: NgbModal,
    private route: ActivatedRoute
  ) {
    this.departamentoId = parseInt(this.route.snapshot.paramMap.get('id'));
    this.ObterRegistros();
  }

  ngOnInit() {
    this.funcionario = {};
    this.funcionario.funcionarioId = this.id;
    this.funcionario.departamentoId = this.departamentoId;
  }

  ObterRegistros() {
    this.CrudService.getFuncionario(this.departamentoId).subscribe(
      (data: Mfuncionario) => {
        this.funcionarios = data;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  salvar(frm: FormGroup) {
    if (this.id == null) {
      this.adicionar(frm);
    } else {
      this.atualizar(frm);

    }
    this.foto = '';
  }

  adicionar(frm) {
    this.funcionario.foto = this.foto;
    this.funcionario.funcionarioId = 0;
    this.CrudService.postFuncionario(this.funcionario).subscribe(
      (data) => {
        this.funcionarios.push(data);
        frm.reset();
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  atualizar(frm) {
    this.funcionario.foto = this.foto;
    this.CrudService.putFuncionario(this.funcionario, this.id).subscribe(
      (data) => {
        this.id = null;
        this.ObterRegistros();
        frm.reset();
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  selecionar(el, content) {
    this.modalService.open(content, { centered: true });
    this.id = parseInt(el.dataset.funcionarioid);
    this.CrudService.getFuncionarioWithId(this.id).subscribe(
      (data: Mfuncionario) => {
        this.funcionario = data;
        this.urlImagemTeste = "https://localhost:44363/" + this.funcionario.foto;
        console.log('seleciona', this.urlImagemTeste);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  excluir() {
    this.CrudService.deleteFuncionario(this.id).subscribe(
      (data: Mfuncionario) => {
        this.funcionarios = data;
        this.id = null;
        this.ObterRegistros();
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  public uploadConcluido = (event) => {
    this.foto = event.dbPath;
  };

  public criarPathImg = (serverPath: string) => {
    if(serverPath != ''){
      return environment.urlDaApi +`${serverPath}`;
    }
    return this.urlImagemTeste;
  };

  abrirModal(content) {
    this.id = null;
    this.funcionario.foto = '/assets/img/default.jpg';
    this.funcionario.nome = '';
    this.funcionario.rg = '';
    this.modalService.open(content, { centered: true });
  }

  modalConfirmacaoExcluir(content, el) {
    this.id = parseInt(el.dataset.funcionarioid);
    this.modalService.open(content);
  }
}

