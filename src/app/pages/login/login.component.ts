import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { emailValidator } from "../../theme/utils/app-validators";
import { AppSettings } from "../../app.settings";
import { Settings } from "../../app.settings.model";
import { UserService } from "src/app/Services/user-service.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styles: [
    `
      footer {
        bottom: -67px;
      }
    `
  ]
})
export class LoginComponent implements OnInit {
  public invalidLogin: boolean;
  public form: FormGroup;
  public settings: Settings;
  constructor(
    private userService: UserService,
    public appSettings: AppSettings,
    public fb: FormBuilder,
    public router: Router
  ) {
    this.settings = this.appSettings.settings;
    this.form = this.fb.group({
      email: [null, Validators.compose([Validators.required, emailValidator])],
      password: [
        null,
        Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });
  }
  ngOnInit() {
    if (this.userService.isLoggedIn()) this.router.navigate(["/dash"]);
  }

  public onSubmit(values: Object): void {
    if (this.form.valid) {
      this.userService.login(values).subscribe(result => {
        if (result) this.router.navigate(["dash"]);
        else {
          console.log("ayhhh");
          this.invalidLogin = true;
        }
      });
    }
  }

  ngAfterViewInit() {
    this.settings.loadingSpinner = false;
  }
}
