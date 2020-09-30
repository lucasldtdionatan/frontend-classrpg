import { ErrorStateMatcher } from '@angular/material/core';
import { SnackBarService } from './../../../../services/snack-bar.service';
import { Location } from '@angular/common';
import { take } from 'rxjs/operators';
import { NivelService } from './../nivel.service';
import { TurmaService } from './../../../turma-home/turma-home.service';
import { Nivel } from './../nivel.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nivel-edit',
  templateUrl: './nivel-edit.component.html',
  styleUrls: ['./nivel-edit.component.css']
})
export class NivelEditComponent implements OnInit {
  id: string;
  nivelForm: FormGroup;
  nivel: Nivel;
  imgURL: any = "assets/noImage.png";
  imgSelected: boolean = false;

  isLoading: boolean = false;
  idUrl: string;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private turmaService: TurmaService,
    private nivelService: NivelService,
    private Location: Location,
    private snackBarService: SnackBarService
  ) {
    this.nivelForm = this.formBuilder.group({
      titulo: ['', Validators.required],
      nivel: ['', Validators.required],
      nivelMinimo: ['', Validators.required],
      nivelMaximo: ['', Validators.required],
      imagem: ['']
    })

    this.id = this.route.snapshot.paramMap.get('id')
    this.nivelService.getByIdNivel(this.id).pipe(take(1)).subscribe(
      resp => {
        this.nivel = resp;
        this.nivelForm.patchValue({
          titulo: this.nivel.nome,
          nivel: this.nivel.nivel,
          nivelMinimo: this.nivel.experienciaMinima,
          nivelMaximo: this.nivel.experienciaMaxima,
          imagem: this.nivel.imagem
        })
        if (this.nivel.imagem != null) {
          this.imgURL = this.nivel.imagem;
        }
      }
    )
  }

  ngOnInit(): void {

  }

  onSubmit() {
    let idTurma: any;
    this.isLoading = true
    idTurma = this.turmaService.returnIdTurma();

    this.nivel.nome = this.nivelForm.get('titulo').value;
    this.nivel.nivel = this.nivelForm.get('nivel').value;
    this.nivel.experienciaMinima = this.nivelForm.get('nivelMinimo').value;
    this.nivel.experienciaMaxima = this.nivelForm.get('nivelMaximo').value;

    this.nivelService.updateNivel(this.nivel).pipe(take(1)).subscribe(
      resp => {
        this.snackBarService.openSnackBar('Nivel atualizado com sucesso!', 'X', false);
        this.Location.back();
        this.isLoading = false;
      },
      error => {
        this.snackBarService.openSnackBar(error.error.mensagem, 'X', true);
        this.isLoading = false;
      }
    )
  }

  onCancel() {
    this.Location.back()
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
