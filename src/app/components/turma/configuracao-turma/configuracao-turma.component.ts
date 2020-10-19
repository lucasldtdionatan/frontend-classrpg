import { SnackBarService } from './../../../services/snack-bar.service';
import { ImageUploadService } from './../../../services/image-upload.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { TurmaList } from './../../turma-home/turma-home.model';
import { TurmaService } from './../../turma-home/turma-home.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuracao-turma',
  templateUrl: './configuracao-turma.component.html',
  styleUrls: ['./configuracao-turma.component.css']
})
export class ConfiguracaoTurmaComponent implements OnInit {

  id_turma: string;
  turma: TurmaList;

  imgURL: any = "assets/noImage.png";
  imgSelected: boolean = false;
  isLoading: boolean = false;

  form_turma: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private turmaService: TurmaService,
    private snackBarService: SnackBarService,
    private imageUploadService: ImageUploadService
  ) {

    this.form_turma = this.formBuilder.group({
      titulo: ['', Validators.required],
      descricao: ['', Validators.maxLength(250)],
      imagem: ['']
    })
  }

  ngOnInit(): void {
    this.id_turma = this.turmaService.returnIdTurma();
    this.turmaService.getTurmaById(this.id_turma).pipe(take(1)).subscribe(
      resp => {
        this.turma = resp;

        this.form_turma.patchValue({
          titulo: this.turma.titulo,
          descricao: this.turma.descricao,
          imagem: this.turma.imagem,
        });
        if (this.turma.imagem != null) {
          this.imgURL = this.turma.imagem;
        }
      },
      error => {
        this.snackBarService.openSnackBar('Não foi possível carregar os dados da turma', 'X', true);
      }
    )
  }

  onSubmit() {
    let imgUrlReceived: any;
    this.isLoading = true;

    const formData = new FormData();
    formData.append('file', this.form_turma.get('imagem').value);

    if (this.imgSelected) {
      this.imageUploadService.uploadImage(formData).pipe(take(1)).subscribe(
        resp => {
          imgUrlReceived = resp;
          this.form_turma.value.imagem = imgUrlReceived.url;
          this.sendTurma();
        },
        error => {
          this.snackBarService.openSnackBar('Não foi possível fazer o upload da imagem :(', 'X', true);
          this.isLoading = false;
        }
      );
    } else {
      this.sendTurma();
    }
  }

  sendTurma() {
    this.turma.titulo = this.form_turma.value.titulo;
    this.turma.descricao = this.form_turma.value.descricao;
    this.turma.imagem = this.form_turma.value.imagem,

      this.turmaService.updateTurma(this.turma).pipe(take(1)).subscribe(
        resp => {
          this.isLoading = false;
          this.snackBarService.openSnackBar('Informações atualizadas com sucesso!', 'X', false);
        },
        error => {
          this.isLoading = false;
          this.snackBarService.openSnackBar(error.error.mensagem, 'X', true);
        }
      )
  }

  onCancel() {
    this.form_turma.patchValue({
      titulo: this.turma.titulo,
      descricao: this.turma.descricao,
      imagem: this.turma.imagem,
    });
  }

  imagePreview(files) {
    let imagePath;
    let message;

    if (files.length === 0)
      return;

    let mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      message = "Only images are supported.";
      return;
    }

    this.form_turma.get('imagem').setValue(files[0]);

    let reader = new FileReader();
    imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }

    this.imgSelected = true;
  }
}
