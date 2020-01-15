import { Http, Headers, RequestOptions } from "@angular/http";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tokenNotExpired, JwtHelper } from "angular2-jwt";
import { map } from "rxjs/operators";
import { pipe } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UserService {
  public currentUser: any = null;

  url: string = "http://localhost:3000/api/user";
  constructor(private http: Http, private httpc: HttpClient) {
    let token = this.getToken();
    if (token) {
      let jwt = new JwtHelper();
      this.currentUser = jwt.decodeToken(token);
    }
  }

  signUp(user) {
    return this.http.post(this.url, user);
  }

  login(credentials) {
    return this.http.post("http://localhost:3000/api/auth", credentials).pipe(
      map(result => {
        if (result) {
          localStorage.setItem("token", (<any>result)._body);
          let jwt = new JwtHelper();
          this.currentUser = jwt.decodeToken(this.getToken());

          return true;
        } else {
          console.log("smlqkjdfml");
          console.log(result);
          return false;
        }
      })
    );
  }
  getRolelessUsers() {
    /*let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("x-auth-token", `${this.getToken()}`);
    const options = new RequestOptions({ headers: headers });*/
    return <any>this.http.get(this.url + "/roleless");
  }
  logout() {
    localStorage.removeItem("token");
    this.currentUser = null;
  }
  getCurrentUser(): any {
    let jwt = new JwtHelper();
    console.log(jwt.decodeToken(this.getToken()));
    return jwt.decodeToken(this.getToken());
  }
  getToken() {
    console.log("getting Token...");
    return localStorage.getItem("token");
  }
  isLoggedIn() {
    return this.getToken() == undefined ? false : true;
  }
}
