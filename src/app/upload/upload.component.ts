import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpEventType, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnInit {
  urlImagem: string = '/assets/img/default.jpg';
  imagemSelecionada: File = null;
  progress: number;
  message: string;

  @Output() public onUploadFinished = new EventEmitter();

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  carregarImagem(file: FileList) {
    this.imagemSelecionada = file.item(0);

    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.urlImagem = event.target.result;
    };
    reader.readAsDataURL(this.imagemSelecionada);
  }

  public uploadImagem = (files) => {
    this.carregarImagem(files);
    if (files.length === 0) {
      return;
    }
    let ImagemParaUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', ImagemParaUpload, ImagemParaUpload.name);
    this.http
      .post('https://localhost:44363/api/Upload', formData, {
        reportProgress: true,
        observe: 'events',
      })
      .subscribe((data) => {
        if (data.type === HttpEventType.UploadProgress)
          this.progress = Math.round((100 * data.loaded) / data.total);
        else if (data.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(data.body);
        }
      });
  };
}
