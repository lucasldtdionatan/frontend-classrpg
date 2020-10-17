import { NivelService } from './../nivel.service';
import { TurmaService } from './../../../turma-home/turma-home.service';
import { Nivel } from './../nivel.model';
import { SnackBarService } from './../../../../services/snack-bar.service';
import { ImageUploadService } from './../../../../services/image-upload.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-nivel-add',
  templateUrl: './nivel-add.component.html',
  styleUrls: ['./nivel-add.component.css']
})
export class NivelAddComponent implements OnInit {
  nivelForm: FormGroup;
  nivel: Nivel;
  imgURL: any = "assets/noImage.png";
  imgSelected: boolean = false;

  isLoading: boolean = false;
  idUrl: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private imageUploadService: ImageUploadService,
    private snackBarService: SnackBarService,
    private turmaService: TurmaService,
    private nivelService: NivelService,
    private Location: Location
  ) {
    this.nivelForm = this.formBuilder.group({
      titulo: ['', Validators.required],
      nivel: ['', Validators.required],
      nivelMinimo: ['', Validators.required],
      nivelMaximo: ['', Validators.required],
      imagem: ['']
    })
  }

  ngOnInit(): void {
  }


  onSubmit() {
    let idTurma: any;
    this.isLoading = true
    idTurma = this.turmaService.returnIdTurma();
    this.nivel = {
      experienciaMinima: this.nivelForm.get('nivelMinimo').value,
      experienciaMaxima: this.nivelForm.get('nivelMaximo').value,
      nome: this.nivelForm.get('titulo').value,
      nivel: this.nivelForm.get('nivel').value,
      imagem: '',
      turma: {
        id: idTurma
      }
    }

    if (this.imgSelected) {
      let imgUrl: any;
      const formData = new FormData();
      formData.append('file', this.nivelForm.get('imagem').value);

      this.imageUploadService.uploadImage(formData).subscribe(
        resp => {
          imgUrl = resp;
          this.nivel.imagem = imgUrl.url;
          this.sendNivel();
        },
        error => {
          this.snackBarService.openSnackBar('Não foi possível fazer o upload da imagem :(', 'X', true);
          this.isLoading = false;
        })
    } else {
      this.sendNivel();
    }
  }

  onCancel() {
    // this.router.navigate(['../niveis'])
    this.Location.back();
  }

  sendNivel() {
    this.nivelService.createNivel(this.nivel).subscribe(
      resp => {
        this.snackBarService.openSnackBar('Nivel cadastrado com sucesso!', 'X', false);
        this.Location.back();
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

    this.nivelForm.get('imagem').setValue(files[0]);

    let reader = new FileReader();
    imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }

    this.imgSelected = true;
  }
}
