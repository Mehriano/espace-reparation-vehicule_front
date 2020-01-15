import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { VoitureService } from "src/app/Services/voiture-service.service";
import { FormBuilder, FormGroup, Validators, NgForm } from "@angular/forms";
import { UserService } from "src/app/Services/user-service.service";

@Component({
  selector: "app-edit-voiture",
  templateUrl: "./edit-voiture.component.html",
  styleUrls: ["./edit-voiture.component.scss"]
})
export class EditVoitureComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private voitureService: VoitureService,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}
  voitureForm: FormGroup;
  _id: string = "";
  isLoadingResults = false;

  ngOnInit() {
    this.getVoiture(this.route.snapshot.params["id"]);
    this.voitureForm = this.formBuilder.group({
      immatriculation: ["", Validators.required],
      numChasis: ["", Validators.required],
      marque: ["", Validators.required],
      modele: ["", Validators.required],
      kilometrage: ["", [Validators.required, Validators.min(1)]],
      dMC: ["", [Validators.required]],
      sizeMoteur: [
        "",
        [Validators.required, Validators.min(0), Validators.max(2)]
      ],
      energie: [null, Validators.required]
    });
  }
  getVoiture(id) {
    this.voitureService.getVoiture(id).subscribe(data => {
      this._id = data._id;
      this.voitureForm.get("immatriculation").setValue(data.immatriculation);
      this.voitureForm.get("numChasis").setValue(data.numChasis);
      this.voitureForm.get("marque").setValue(data.marque);
      this.voitureForm.get("modele").setValue(data.modele);
      this.voitureForm.get("kilometrage").setValue(data.kilometrage);
      this.voitureForm.get("dMC").setValue(data.dMC);
      this.voitureForm.get("sizeMoteur").setValue(data.sizeMoteur);
      this.voitureForm.get("energie").setValue(data.energie);
    });
  }
  onFormSubmit(form: NgForm) {
    this.isLoadingResults = true;
    if (!(<any>form).responsableId) delete (<any>form).responsableId;
    if (!(<any>form).questionnaireId) delete (<any>form).questionnaireId;
    this.voitureService
      .updateVoiture(this.route.snapshot.params["id"], form)
      .subscribe(
        () => {
          // let id = res["_id"];
          this.isLoadingResults = false;
          this.router.navigate(["/mesvoitures"]);
        },
        err => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }
}
