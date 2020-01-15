import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
@Component({
  selector: "dialog-delete-item-dialog",
  templateUrl: "dialog-delete-item-dialog.html"
})
export class DialogDeleteItemDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogDeleteItemDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
