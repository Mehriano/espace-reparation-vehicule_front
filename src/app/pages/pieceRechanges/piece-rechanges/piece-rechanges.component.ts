import { PieceRechangeServiceService } from "./../../../Services/piece-rechange-service.service";

import { PieceRechange } from "./../../../models/pieceRechange";
import { MatDialog } from "@angular/material";
import { Component, OnInit } from "@angular/core";
import { DialogDeleteItemDialog } from "src/app/shared/dialog-delete/dialog-delete-item-dialog";

@Component({
  selector: "app-piece-rechanges",
  templateUrl: "./piece-rechanges.component.html",
  styleUrls: ["./piece-rechanges.component.scss"]
})
export class PieceRechangesComponent implements OnInit {
  displayedColumns: string[] = [
    "nom",
    "numSerie",
    "prix",
    "disponible",
    "dureeComande",
    "delete"
  ];
  data: PieceRechange[] = [];
  isLoadingResults = true;
  constructor(
    private pieceRechangeService: PieceRechangeServiceService,
    public dialog: MatDialog
  ) {}
  ngOnInit() {
    this.pieceRechangeService.getPieceRechanges().subscribe(
      res => {
        this.data = res;
        console.log(this.data);
        this.isLoadingResults = false;
      },
      err => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
  }
  openDialog(event, pieceRechange: PieceRechange): void {
    event.stopPropagation();
    let dialogRef = this.dialog.open(DialogDeleteItemDialog, {
      data: {
        name: pieceRechange.nom,
        item: "PieceRechange",
        _id: pieceRechange._id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed", result);
      this.pieceRechangeService.deletePieceRechange(result._id).subscribe(
        () => {
          this.data = this.data.filter(ville => {
            return ville._id != result._id;
          });
        },
        err => {
          console.log("404", err);
        }
      );
    });
  }
}
