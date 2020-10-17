import { RecompensaService } from './../recompensa.service';
import { TurmaService } from './../../../turma-home/turma-home.service';
import { SnackBarService } from './../../../../services/snack-bar.service';
import { User } from './../../../../models/user.model';
import { Recompensa } from './../recompensa.model';
import { take } from 'rxjs/operators';
import { ImageUploadService } from './../../../../services/image-upload.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-recompensa-add',
  templateUrl: './recompensa-add.component.html',
  styleUrls: ['./recompensa-add.component.css']
})
export class RecompensaAddComponent implements OnInit {

  isLoading: boolean = false;
  imgSelected: boolean = false;
  recompensaForm: FormGroup;
  imgURL: any = "assets/noImage.png";

  recompensa: Recompensa;

  constructor(
    private formBuilder: FormBuilder,
    private imageUploadService: ImageUploadService,
    private snackBarService: SnackBarService,
    private turmaService: TurmaService,
    private recompensaService: RecompensaService,
    private Location: Location
  ) {

    this.recompensaForm = this.formBuilder.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      nivelMinimo: ['', Validators.required],
      experiencia: [''],
      imagem: ['']
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.isLoading = true;
    let imgUrlReceived: any;
    let idTurma = this.turmaService.returnIdTurma();
    const formData = new FormData();
    formData.append('file', this.recompensaForm.get('imagem').value);

    this.recompensa = {
      nome: this.recompensaForm.get('nome').value,
      descricao: this.recompensaForm.get('descricao').value,
      experiencia: this.recompensaForm.get('experiencia').value,
      nivel: this.recompensaForm.get('nivelMinimo').value,
      imagem: '',
      turma: {
        id: idTurma
      }
    }

    if (this.imgSelected) {
      this.imageUploadService.uploadImage(formData).pipe(take(1)).subscribe(
        resp => {
          imgUrlReceived = resp;
          this.recompensa.imagem = imgUrlReceived.url;
          this.sendRecompensa();
        },
        error => {
          this.snackBarService.openSnackBar('Não foi possível fazer o upload da imagem :(', 'X', true);
          this.isLoading = false;
        }
      );
    } else {
      this.sendRecompensa();
    }
  }

  sendRecompensa() {
    this.recompensaService.createRecompensa(this.recompensa).pipe(take(1)).subscribe(
      resp => {
        this.snackBarService.openSnackBar('Recompensa criada com sucesso!', 'X', false);
        this.Location.back();
      },
      error => {
        this.isLoading = false;
        this.snackBarService.openSnackBar(error.error.mensagem, 'X', true);
      }
    )
  }

  onCancel() {
    this.Location.back();
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

    this.recompensaForm.get('imagem').setValue(files[0]);

    let reader = new FileReader();
    imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
    this.imgSelected = true;
  }

}
