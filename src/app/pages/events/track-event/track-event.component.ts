import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { EventService } from "./../../../Services/events-service.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EventRep } from "src/app/models/eventRep";
import { MatStepper } from "@angular/material/stepper";

@Component({
  selector: "app-track-event",
  templateUrl: "./track-event.component.html",
  styleUrls: ["./track-event.component.scss"]
})
export class TrackEventComponent implements OnInit {
  pricePiecesForm: FormGroup;
  event: EventRep;
  stepper: MatStepper;
  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private router: Router
  ) {}

  ngOnInit() {
    this.eventService
      .getEvent(this.route.snapshot.params["id"])
      .subscribe(res => {
        this.event = res;
        this.stepper.selectedIndex = this.event.etat.order;
      });
  }
  public confirmPrice() {
    this.event.etat.order++;
    this.eventService
      .updateEvent(this.route.snapshot.params["id"], this.event)
      .subscribe(res => {
        this.stepper.next();
      });
  }
  public anuller() {
    this.event.etat.order = 0;
    this.eventService
      .updateEvent(this.route.snapshot.params["id"], this.event)
      .subscribe(res => {});
  }
}
