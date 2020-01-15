import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  emailValidator,
  matchingPasswords
} from "../../theme/utils/app-validators";
import { AppSettings } from "../../app.settings";
import { Settings } from "../../app.settings.model";
import { UserService } from "src/app/Services/user-service.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html"
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  public settings: Settings;
  constructor(
    private userService: UserService,
    public appSettings: AppSettings,
    public fb: FormBuilder,
    public router: Router
  ) {
    this.settings = this.appSettings.settings;
    this.registerForm = this.fb.group(
      {
        nom: [
          null,
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50)
          ])
        ],
        prenom: [
          null,
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50)
          ])
        ],
        userName: [
          null,
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50)
          ])
        ],
        cin: [
          null,
          Validators.compose([Validators.required, Validators.pattern(/^\d+$/)])
        ],
        phone: [
          null,
          Validators.compose([
            Validators.required,
            Validators.pattern(/^[0-9]{8}$/)
          ])
        ],
        fax: [
          null,
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50)
          ])
        ],
        email: [
          null,
          Validators.compose([Validators.required, emailValidator])
        ],
        password: ["", Validators.required],
        passwordConfirm: ["", [Validators.required]],
        adresse: this.fb.group({
          ville: [null, Validators.compose([Validators.required])],
          zone: [null, Validators.compose([])],
          rue: [null, Validators.compose([Validators.required])],
          codePostal: [null, Validators.compose([Validators.required])]
        })
      },
      { validator: matchingPasswords("password", "passwordConfirm") }
    );
  }

  ngOnInit() {
    if (this.userService.isLoggedIn()) this.router.navigate(["/"]);
  }
  public onSubmit(values): void {
    console.log(values);
    if (this.registerForm.valid) {
      console.log("started");
      (<any>values).role = "Administrateur";
      delete (<any>values).passwordConfirm;
      this.userService.signUp(values).subscribe(result => {
        if (result) {
          this.userService
            .login({
              email: (<any>values).email,
              password: (<any>values).password
            })
            .subscribe(result => {
              if (result) this.router.navigate(["/"]);
            });
        } else {
          console.log("error ");
        }
      });
    }
  }

  ngAfterViewInit() {
    this.settings.loadingSpinner = false;
  }
}
