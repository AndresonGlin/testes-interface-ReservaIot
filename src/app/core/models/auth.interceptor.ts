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
          switchMap((res: any) => {
            const newAccessToken = res.tokenAccess;

            localStorage.setItem('access_token', newAccessToken);

            const retryReq = req.clone({
              setHeaders: { Authorization: `Bearer ${newAccessToken}` }
            });

            return next(retryReq);
          })
        );
      }
      return throwError(() => error);
    })
  );

}
