import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-atividade-add',
  templateUrl: './atividade-add.component.html',
  styleUrls: ['./atividade-add.component.css']
})
export class AtividadeAddComponent implements OnInit {
  atividadeForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private Location: Location,
  ) {
    this.atividadeForm = new FormGroup({
      titulo: new FormControl('', Validators.required),
      pontuacao: new FormControl('', Validators.required),
      descricao: new FormControl('', Validators.required),
      dataInicio: new FormControl({ value: '' }, Validators.required),
      dataFinal: new FormControl({ value: '', disabled: true }, Validators.required),
      horarioInicial: new FormControl('', Validators.required),
      horarioFinal: new FormControl('', Validators.required),
    })

    // this.atividadeForm = this.formBuilder.group({
    //   titulo: ['', Validators.required],
    //   pontuacao: ['', Validators.required],
    //   descricao: ['', Validators.required],
    //   dataInicio: ['', Validators.required],
    //   dataFinal: ['', Validators.required],
    //   horarioInicial: ['', Validators.required],
    //   horarioFinal: ['', Validators.required],
    // })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    let teste = this.atividadeForm.get('dataInicio').value;

    console.log(teste);


  }

  onCancel() {
    this.Location.back();
  }

}
