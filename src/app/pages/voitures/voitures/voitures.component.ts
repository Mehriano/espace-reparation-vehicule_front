import { Voiture } from "./../../../models/voiture";
import { MatDialog } from "@angular/material";
import { VoitureService } from "./../../../Services/voiture-service.service";
import { Component, OnInit } from "@angular/core";
import { DialogDeleteItemDialog } from "src/app/shared/dialog-delete/dialog-delete-item-dialog";
import { formatDate } from "@angular/common";

@Component({
  selector: "app-voitures",
  templateUrl: "./voitures.component.html",
  styleUrls: ["./voitures.component.scss"]
})
export class VoituresComponent implements OnInit {
  displayedColumns: string[] = ["immatriculation","numChasis","modele","marque","kilometrage","dMC","sizeMoteur","energie", "delete"];
  data: Voiture[] = [];
  isLoadingResults = true;
  constructor(
    private voitureService: VoitureService,
    public dialog: MatDialog
  ) {}
  ngOnInit() {
    this.voitureService.getVoitures().subscribe(
      res => {
        res.map( r => r.dMC = formatDate(r.dMC, 'yyyy/MM/dd', 'en'))
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
  openDialog(event, voiture: Voiture): void {
    event.stopPropagation();
    let dialogRef = this.dialog.open(DialogDeleteItemDialog, {
      data: { name: voiture.modele, item: "Voiture", _id: voiture._id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed", result);
      this.voitureService.deleteVoiture(result._id).subscribe(
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
