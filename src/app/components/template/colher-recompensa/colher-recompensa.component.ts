import { SnackBarService } from './../../../services/snack-bar.service';
import { take } from 'rxjs/operators';
import { ColherRecompensaService } from './../../../services/colher-recompensa.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-colher-recompensa',
  templateUrl: './colher-recompensa.component.html',
  styleUrls: ['./colher-recompensa.component.css']
})
export class ColherRecompensaComponent implements OnInit {

  constructor(
    private colherRecompensaService: ColherRecompensaService,
    private snackBarService: SnackBarService,

    public dialogRef: MatDialogRef<ColherRecompensaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  onSubmit() {
    let recompensa = {
      recompensa: {
        id: this.data.recompensa.id
      }
    }
    this.colherRecompensaService.save(recompensa).pipe(take(1)).subscribe(
      resp => {
        this.snackBarService.openSnackBar("Recompensa escolhida com sucesso!", "X", false);
        this.dialogRef.close();
      },
      error => {
        this.snackBarService.openSnackBar(error.error.mensagem, "X", true);
      }
    )
  }

  onClose() {
    this.dialogRef.close();
  }

}
