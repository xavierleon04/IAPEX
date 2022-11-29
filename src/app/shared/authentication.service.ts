import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginObject } from "../services/login-object.model";
import { Session } from "../pages/core/models/session.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
/**
 * Created by xavi on 5/16/17.
 */
@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  private basePath = environment.API_URL;

  login(loginObj: LoginObject): Observable<Session> {
    try {
      return this.http.post<Session>(this.basePath + "login/", loginObj);
    } catch (error) {}
  }

  logout(): Observable<Boolean> {
    return this.http.post<Boolean>(this.basePath + "logout", {});
  }
}
