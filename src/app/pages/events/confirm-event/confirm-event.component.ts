import { Component, OnInit } from "@angular/core";
import { Settings } from "src/app/app.settings.model";
import { FormGroup, FormBuilder } from "@angular/forms";
import { AppSettings } from "src/app/app.settings";
import { Router, ActivatedRoute } from "@angular/router";
import { EventService } from "src/app/Services/events-service.service";
import { EventRep } from "src/app/models/eventRep";

@Component({
  selector: "app-confirm-event",
  templateUrl: "./confirm-event.component.html",
  styleUrls: ["./confirm-event.component.scss"]
})
export class ConfirmEventComponent implements OnInit {
  public settings: Settings;
  event: EventRep;
  isLoadingResults = false;
  minDate: Date;
  constructor(
    public appSettings: AppSettings,
    private router: Router,
    private eventService: EventService,
    private route: ActivatedRoute
  ) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
    this.eventService
      .getEvent(this.route.snapshot.params["id"])
      .subscribe(res => {
        this.event = res;
      });
  }
  public confirmEvent() {
    this.event.etat.order++;
    this.eventService
      .updateEvent(this.route.snapshot.params["id"], this.event)
      .subscribe(res => {
        if (res) this.router.navigate(["dash"]);
      });
  }
  public anuller() {
    this.event.etat.order = 0;
    this.eventService
      .updateEvent(this.route.snapshot.params["id"], this.event)
      .subscribe(res => {});
  }
  ngAfterViewInit() {
    this.settings.loadingSpinner = false;
  }
}
