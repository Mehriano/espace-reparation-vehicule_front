import { Settings } from "./../../../app.settings.model";
import { Voiture } from "./../../../models/voiture";
import { EventService } from "./../../../Services/events-service.service";
import { FormBuilder, Validators } from "@angular/forms";
import { VoitureService } from "./../../../Services/voiture-service.service";
import { Router } from "@angular/router";
import { FormGroup } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/Services/user-service.service";
import { AppSettings } from "../../../app.settings";

@Component({
  selector: "app-addevent",
  templateUrl: "./addevent.component.html",
  styleUrls: ["./addevent.component.scss"]
})
export class AddeventComponent implements OnInit {
  voitures: Voiture[];
  public settings: Settings;
  addEventForm: FormGroup;
  isLoadingResults = false;
  minDate: Date;
  constructor(
    public appSettings: AppSettings,
    private router: Router,
    private voitureService: VoitureService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private eventService: EventService
  ) {
    this.settings = this.appSettings.settings;
    this.minDate = new Date();
  }

  ngOnInit() {
    this.voitureService
      .getUserVoitures(this.userService.getCurrentUser()._id)
      .subscribe(res => {
        this.voitures = res;
      });
    this.addEventForm = this.formBuilder.group({
      vehiculeId: ["", Validators.required],
      start: [null, Validators.required],
      travailDemande: ["", Validators.required],
      observation: ["", Validators.required]
    });
  }
  public onFormSubmit(event): void {
    console.log(event);
    if (this.addEventForm.valid) {
      event.etat = 1;
      this.eventService.addEvent(event).subscribe(result => {
        if (result) this.router.navigate(["dash"]);
      });
    }
  }
  ngAfterViewInit() {
    this.settings.loadingSpinner = false;
  }
}
