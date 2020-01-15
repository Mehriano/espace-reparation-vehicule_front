import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { VoitureService } from "./../../../Services/voiture-service.service";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/Services/user-service.service";

@Component({
  selector: "app-add-voiture",
  templateUrl: "./add-voiture.component.html",
  styleUrls: ["./add-voiture.component.scss"]
})
export class AddVoitureComponent implements OnInit {
  voitureForm: FormGroup;
  _id: string = "";
  nom: string = "";
  isLoadingResults = false;
  constructor(
    private router: Router,
    private voitureService: VoitureService,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit() {
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
  public onFormSubmit(voiture): void {
    console.log(voiture);
    if (this.voitureForm.valid) {
      /*  voiture.dMC = new DatePipe("en-US").transform(
            voiture.dMC,
            "dd-mm-yyyy"
        ); */
      voiture.proprietaire = this.userService.getCurrentUser()._id;
      this.voitureService.addVoiture(voiture).subscribe(result => {
        if (result) this.router.navigate(["dash"]);
      });
    }
  }
}
