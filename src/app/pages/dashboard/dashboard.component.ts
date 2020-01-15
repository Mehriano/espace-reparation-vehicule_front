import { EventService } from "./../../Services/events-service.service";
import { Component, OnInit } from "@angular/core";
import { EventRep } from "src/app/models/eventRep";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  data: EventRep[];
  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.eventService.getEvents().subscribe(
      res => {
        this.data = res;
      },
      err => {
        console.log(err);
      }
    );
  }
}
