import { HttpErrorResponse, HttpInterceptor, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, switchMap, throwError } from "rxjs";
import { AuthService } from "../../shared/services/auth-service";

export const authInterceptor: HttpInterceptorFn = (req, next) => {

    const authService = inject(AuthService);
    const token = authService.getAccessToken();

    let authReq =  req;
    if (token) {
        authReq = req.clone({
            setHeaders: { Authorization: `Bearer ${token}` }
        })
    }

    return next(authReq).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        // Refresh Token
        return authService.refreshToken().pipe(
          switchMap((newToken:any) => {
            const retryReq = req.clone({
              setHeaders: { Authorization: `Bearer ${newToken.access}` }
            });
            return next(retryReq);
          })
        );
      }
      return throwError(() => error);
    })
  );

}
