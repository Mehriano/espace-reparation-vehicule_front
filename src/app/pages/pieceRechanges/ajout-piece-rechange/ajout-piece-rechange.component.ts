import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/Services/user-service.service";
import { PieceRechangeServiceService } from "src/app/Services/piece-rechange-service.service";
@Component({
  selector: "app-ajout-piece-rechange",
  templateUrl: "./ajout-piece-rechange.component.html",
  styleUrls: ["./ajout-piece-rechange.component.scss"]
})
export class AjoutPieceRechangeComponent implements OnInit {
  pieceRechangeForm: FormGroup;
  _id: string = "";
  nom: string = "";
  isLoadingResults = false;
  //item: boolean;
  constructor(
    private router: Router,
    private pieceRechangeServiceService: PieceRechangeServiceService,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.pieceRechangeForm = this.formBuilder.group({
      nom: ["", Validators.required],
      numSerie: ["", Validators.required],
      prix: [null, Validators.required],
      disponible: [false, Validators.required],
      dureeComande: [null, [Validators.required]]
    });
  }
  public onFormSubmit(pieceRechange): void {
    console.log(pieceRechange);
    if (this.pieceRechangeForm.valid) {
      /*  pieceRechange.dMC = new DatePipe("en-US").transform(
            pieceRechange.dMC,
            "dd-mm-yyyy"
        ); */
      pieceRechange.proprietaire = this.userService.getCurrentUser()._id;
      this.pieceRechangeServiceService
        .addPieceRechange(pieceRechange)
        .subscribe(result => {
          if (result) this.router.navigate(["dash"]);
        });
    }
  }
}
