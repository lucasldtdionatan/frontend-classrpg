import { SnackBarService } from './../../services/snack-bar.service';
import { ImageUploadService } from './../../services/image-upload.service';
import { take } from 'rxjs/operators';
import { User } from './../../models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-configuracao-usuario',
  templateUrl: './configuracao-usuario.component.html',
  styleUrls: ['./configuracao-usuario.component.css']
})
export class ConfiguracaoUsuarioComponent implements OnInit {

  imgURL: any = "assets/noImage.png";
  imgSelected: boolean = false;
  isLoading: boolean = false;

  formUsuario: FormGroup;
  user: User;

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private imageUploadService: ImageUploadService,
    private snackBarService: SnackBarService,
    private Location: Location,
  ) {
    this.formUsuario = this.formBuilder.group({
      nome: ['', Validators.required],
      nickname: ['', Validators.required],
      email: [{ value: '', disabled: true }, Validators.required],
      imagem: ['']
    })
  }

  ngOnInit(): void {
    this.user = this.authenticationService.currentUserValue;

    // console.log(this.user);

    this.formUsuario.patchValue({
      nome: this.user.nome,
      nickname: this.user.nickname,
      email: this.user.email,
      imagem: this.user.imagem,
    })

    if (this.formUsuario.value.imagem != null) {
      this.imgURL = this.formUsuario.value.imagem;
    }
  }

  onSubmit() {
    this.isLoading = true;

    let imgUrlReceived: any;

    this.user.email = this.formUsuario.value.email;
    this.user.nome = this.formUsuario.value.nome;
    this.user.nickname = this.formUsuario.value.nickname;



    const formData = new FormData();
    formData.append('file', this.formUsuario.get('imagem').value);

    if (this.imgSelected) {
      this.imageUploadService.uploadImage(formData).pipe(take(1)).subscribe(
        resp => {
          imgUrlReceived = resp;
          this.user.imagem = this.formUsuario.value.imagem = imgUrlReceived.url;

          this.sendUsuario();
        },
        error => {
          this.snackBarService.openSnackBar('Não foi possível fazer o upload da imagem :(', 'X', true);
          this.isLoading = false;
        }
      )
    } else {
      this.sendUsuario();
    }
  }

  sendUsuario() {
    this.authenticationService.update(this.user).pipe(take(1)).subscribe(
      resp => {
        this.authenticationService.getUsuario(this.user.id);
        this.snackBarService.openSnackBar('Informações atualizadas com sucesso!', 'X', false);
        this.isLoading = false;
      },
      error => {
        this.snackBarService.openSnackBar(error.error.mensagem, 'X', true);
        this.isLoading = false;
      }
    )
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

    this.formUsuario.get('imagem').setValue(files[0]);

    let reader = new FileReader();
    imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }

    this.imgSelected = true;
  }

  onCancel() {
    this.Location.back();
  }
}
