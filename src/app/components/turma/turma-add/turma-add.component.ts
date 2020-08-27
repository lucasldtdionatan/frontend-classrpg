import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-turma-add',
  templateUrl: './turma-add.component.html',
  styleUrls: ['./turma-add.component.css']
})
export class TurmaAddComponent implements OnInit {
  imagePath;
  imgURL: any = "assets/noImage.png";
    message: string;


  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(typeof(this.imgURL));
  }

  imagePreview(files) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }
}
