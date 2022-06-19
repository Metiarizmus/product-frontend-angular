import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {AuthService} from "../shared/service/auth.service";
import {ActivatedRoute, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {


  constructor(private authService: AuthService,
              private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone();

    const token = localStorage.getItem("accessToken")

    if (token) {
      req = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + token)});
    }
    return next.handle(req).pipe(
      catchError((err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status == 401) {
            // redirect user to the logout page
            this.router.navigate(['/login'])
          }
        }
        return throwError(err);
      }))
    );
  }
}
