import { EventService } from "./../../../Services/events-service.service";
import { EventRep } from "./../../../models/eventRep";
import { MatDialog } from "@angular/material";
import { Component, OnInit } from "@angular/core";
import { DialogDeleteItemDialog } from "src/app/shared/dialog-delete/dialog-delete-item-dialog";
import { UserService } from "src/app/Services/user-service.service";

@Component({
  selector: "app-my-events",
  templateUrl: "./my-events.component.html",
  styleUrls: ["./my-events.component.scss"]
})
export class MyEventsComponent implements OnInit {
  displayedColumns: string[] = [
    "Model",
    "Immatriculation",
    "issueà",
    "etat",
    "delete"
  ];
  data: EventRep[] = [];
  isLoadingResults = true;
  constructor(
    private eventService: EventService,
    public dialog: MatDialog,
    private userService: UserService
  ) {}
  ngOnInit() {
    this.eventService
      .getUserevents(this.userService.getCurrentUser()._id)
      .subscribe(
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
  openDialog(event, eventRep: EventRep): void {
    event.stopPropagation();
    let dialogRef = this.dialog.open(DialogDeleteItemDialog, {
      data: { name: "Ceci", item: "EventRep", _id: eventRep._id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed", result);
      this.eventService.deleteEvent(result._id).subscribe(
        () => {
          this.data = this.data.filter(eRep => {
            return eRep._id != result._id;
          });
        },
        err => {
          console.log("404", err);
        }
      );
    });
  }
}
