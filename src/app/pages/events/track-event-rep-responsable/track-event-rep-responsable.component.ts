import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { MatDialog, MatStepper } from "@angular/material";
import { AddPieceRechangeComponent } from "../../pieceRechanges/add-piece-rechange/add-piece-rechange.component";
import { ActivatedRoute, Router } from "@angular/router";
import { EventService } from "src/app/Services/events-service.service";
import { AppSettings } from "src/app/app.settings";
import { EventRep } from "src/app/models/eventRep";
import { Settings } from "src/app/app.settings.model";
import { PieceRechangeServiceService } from "src/app/Services/piece-rechange-service.service";

@Component({
  selector: "app-track-event-rep-responsable",
  templateUrl: "./track-event-rep-responsable.component.html",
  styleUrls: ["./track-event-rep-responsable.component.scss"]
})
export class TrackEventRepResponsableComponent implements OnInit {
  reparationCostForm: FormGroup;
  selectedPieces = [];
  public settings: Settings;
  public eventRep: EventRep;
  isLoadingResults = false;
  pieces = [];
  //stepper: MatStepper;
  constructor(
    public appSettings: AppSettings,
    private router: Router,
    private eventService: EventService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private pieceService: PieceRechangeServiceService
  ) {
    this.settings = this.appSettings.settings;
    this.eventService
      .getEvent(this.route.snapshot.params["id"])
      .subscribe(res => {
        this.eventRep = res;
        this.stepper.selectedIndex = this.eventRep.etat.order - 1;
      });
      this.pieceService.getPieceRechanges().subscribe( res  => {
        this.pieces = res;
      })
  }
  @ViewChild("stepper") stepper: MatStepper;
  ngOnInit() {
    this.reparationCostForm = this.formBuilder.group({
      prixMainDOeuvre: [
        null,
        [Validators.required, Validators.pattern(/^[0-9]*$/)]
      ]
    });
  }
  public addPiece() {
    let dialogRef = this.dialog.open(AddPieceRechangeComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedPieces.push(result);
      }
    });
  }
  public confirm() {
    let eventreptosend: any = this.eventRep;
    eventreptosend.etat = this.eventRep.etat.order + 1;

    delete eventreptosend._id;
    eventreptosend.vehiculeId = this.eventRep.vehicule;
    delete eventreptosend.vehicule;
    delete eventreptosend.__v;
    this.eventService
      .updateEvent(this.route.snapshot.params["id"], eventreptosend)
      .subscribe(res => {
        if (res) this.router.navigate(["dash"]);
      });
  }

  getSelectedElementId(item) {
    this.selectedPieces.push(item);
  }
  delete(numSerie) {
    this.selectedPieces.filter(obj => {
      return obj.numSerie !== numSerie;
    });
  }
  onFormSubmit(value) {
    let eventreptosend: any = this.eventRep;
    eventreptosend.etat = this.eventRep.etat.order + 1;
    console.log(this.eventRep);
    delete eventreptosend._id;
    eventreptosend.vehiculeId = this.eventRep.vehicule;
    delete eventreptosend.vehicule;
    delete eventreptosend.__v;
    eventreptosend.pieces = this.selectedPieces;
    eventreptosend.prixMainDOeuvre = value.prixMainDOeuvre;
    let prixtt = 0;
    this.selectedPieces.forEach(item => {
      prixtt += parseFloat(item.prix);
    });
    prixtt += +value.prixMainDOeuvre;
    console.log(prixtt);
    eventreptosend.prixTotale = prixtt;

    this.eventService
      .updateEvent(this.route.snapshot.params["id"], eventreptosend)
      .subscribe(res => {
        if (res) this.router.navigate(["dash"]);
      });
  }
  confirmReparation() {
    let eventreptosend = <any>this.eventRep;
    eventreptosend.etat = this.eventRep.etat.order + 1;
    delete eventreptosend._id;
    eventreptosend.vehiculeId = this.eventRep.vehicule;
    delete eventreptosend.vehicule;
    delete eventreptosend.__v;
    this.eventService
      .updateEvent(this.route.snapshot.params["id"], eventreptosend)
      .subscribe(res => {
        if (res) this.router.navigate(["dash"]);
      });
  }
  ngAfterViewInit() {
    this.settings.loadingSpinner = false;
  }
}
