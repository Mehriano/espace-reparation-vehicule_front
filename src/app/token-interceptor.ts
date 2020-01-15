import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from "@angular/common/http";
import { UserService } from "./Services/user-service.service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: UserService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        "x-auth-token": `${this.auth.getToken()}`
      }
    });
    console.log("this is being invockd");
    return next.handle(request);
  }
}
