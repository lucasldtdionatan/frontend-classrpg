import { ImageUploadService } from './../../../../services/image-upload.service';
import { SnackBarService } from './../../../../services/snack-bar.service';
import { take } from 'rxjs/operators';
import { RecompensaService } from './../recompensa.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Recompensa } from '../recompensa.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-recompensa-edit',
  templateUrl: './recompensa-edit.component.html',
  styleUrls: ['./recompensa-edit.component.css']
})
export class RecompensaEditComponent implements OnInit {

  isLoading: boolean = false;
  imgSelected: boolean = false;
  imgURL: any = "assets/noImage.png";
  recompensaForm: FormGroup;
  id_recompensa: string;
  recompensa: Recompensa;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private recompensaService: RecompensaService,
    private Location: Location,
    private snackBarService: SnackBarService,
    private imageUploadService: ImageUploadService,
  ) {
    this.recompensaForm = this.formBuilder.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      nivel: ['', Validators.required],
      experiencia: [''],
      imagem: ['']
    });

    this.id_recompensa = this.route.snapshot.paramMap.get('id');
    this.recompensaService.getById(this.id_recompensa).pipe(take(1)).subscribe(
      resp => {
        this.recompensa = resp;

        this.recompensaForm.patchValue({
          nome: this.recompensa.nome,
          descricao: this.recompensa.descricao,
          nivel: this.recompensa.nivel,
          experiencia: this.recompensa.experiencia,
          imagem: this.recompensa.imagem
        })

        if (this.recompensa.imagem != null) {
          this.imgURL = this.recompensa.imagem;
        }
      }
    )
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.isLoading = true;
    let imgUrlReceived: any;

    const formData = new FormData();
    formData.append('file', this.recompensaForm.get('imagem').value);

    if (this.imgSelected) {
      this.imageUploadService.uploadImage(formData).pipe(take(1)).subscribe(
        resp => {
          imgUrlReceived = resp;
          this.recompensaForm.value.imagem = imgUrlReceived.url;
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
    this.recompensaService.update(this.id_recompensa, this.recompensaForm.value).pipe(take(1)).subscribe(
      resp => {
        this.snackBarService.openSnackBar('Recompensa atualizada com sucesso!', 'X', false);
        this.Location.back();
      },
      error => {
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
