import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-add-piece-rechange',
  templateUrl: './add-piece-rechange.component.html',
  styleUrls: ['./add-piece-rechange.component.scss']
})
export class AddPieceRechangeComponent implements OnInit {
  pieceRechangeForm: FormGroup;
  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddPieceRechangeComponent>,
    @Inject(MAT_DIALOG_DATA) data) { }

  ngOnInit() {
    this.pieceRechangeForm = this.fb.group({
      nom: ["", Validators.required],
      numSerie: ["", Validators.required],
      prix: [null, Validators.required],
      disponible: [false, Validators.required],
      dureeComande: [""]
    });
  }
  save() {
    this.dialogRef.close(this.pieceRechangeForm.value);
}

close() {
    this.dialogRef.close();
}
}
