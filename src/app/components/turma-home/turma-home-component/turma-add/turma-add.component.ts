import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { ImageUploadService } from './../../../../services/image-upload.service';
import { SnackBarService } from './../../../../services/snack-bar.service';
import { TurmaService } from './../../turma-home.service';

import { Turma } from './../../turma-home.model';

@Component({
  selector: 'app-turma-add',
  templateUrl: './turma-add.component.html',
  styleUrls: ['./turma-add.component.css']
})
export class TurmaAddComponent implements OnInit {

  imgURL: any = "assets/noImage.png";
  imgSelected: boolean = false;
  turma: Turma;

  formTurma: FormGroup;
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private turmaService: TurmaService,
    private snackBarService: SnackBarService,
    private formBuilder: FormBuilder,
    private imageUploadService: ImageUploadService
  ) {
    this.formTurma = this.formBuilder.group({
      titulo: ['', Validators.required],
      descricao: ['', Validators.maxLength(250)],
      imagem: ['']
    })
  }

  ngOnInit(): void {

  }

  onSubmit() {
    this.isLoading = true;
    this.turma = {
      titulo: this.formTurma.get("titulo").value,
      descricao: this.formTurma.get("descricao").value,

    }

    if (this.imgSelected) {
      let awsUrlImage;

      const formData = new FormData();
      formData.append('file', this.formTurma.get('imagem').value);

      this.imageUploadService.uploadImage(formData)
        .subscribe(resp => {
          awsUrlImage = resp;

          this.turma.imagem = awsUrlImage.url;

          this.sendTurma();
        },
          error => {
            this.snackBarService.openSnackBar('Não foi possível fazer o upload da imagem :(', 'X', true);
            this.isLoading = false;
          })

    } else {
      this.sendTurma();
    }

  }

  onCancel() {
    this.router.navigate(['/turmas'])
  }

  sendTurma() {
    this.turmaService.createTurma(this.turma)
      .subscribe(
        resp => {
          this.snackBarService.openSnackBar('Turma cadastrada com sucesso!', 'X', false);
          this.router.navigate(['/turmas']);
          this.isLoading = false;
        },
        error => {
          this.snackBarService.openSnackBar(error.error.mensagem, 'X', true);
          this.isLoading = false;
        })
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

    this.formTurma.get('imagem').setValue(files[0]);

    let reader = new FileReader();
    imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }

    this.imgSelected = true;
  }
}
