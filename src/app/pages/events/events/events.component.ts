import { EventService } from "./../../../Services/events-service.service";
import { EventRep } from "./../../../models/eventRep";
import { MatDialog } from "@angular/material";
import { Component, OnInit } from "@angular/core";
import { DialogDeleteItemDialog } from "src/app/shared/dialog-delete/dialog-delete-item-dialog";
import { formatDate } from "@angular/common";

@Component({
  selector: "app-events",
  templateUrl: "./events.component.html",
  styleUrls: ["./events.component.scss"]
})
export class EventsComponent implements OnInit {
  displayedColumns: string[] = [
    "client",
    "Model de voiture",
    "Immatriculation",
    "issue à",
    "etat",
    "delete"
  ];
  data: any;
  isLoadingResults = true;
  constructor(private eventService: EventService, public dialog: MatDialog) {}
  ngOnInit() {
    this.eventService.getEvents().subscribe(
      res => {
        res.map(
          r => ((<any>r.issuedAt) = formatDate(r.issuedAt, "yyyy/MM/dd", "en"))
        );
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
  openDialog(event, eventRep: EventRep): void {
    event.stopPropagation();
    let dialogRef = this.dialog.open(DialogDeleteItemDialog, {
      data: { name: "Ceci", item: "EventRep", _id: event._id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed", result);
      this.eventService.deleteEvent(result._id).subscribe(
        () => {
          this.data = this.data.filter(eventRep => {
            return eventRep._id != result._id;
          });
        },
        err => {
          console.log("404", err);
        }
      );
    });
  }
  applyFilter(filterValue: string) {
    this.data.filter = filterValue.trim().toLowerCase();
  }
}
