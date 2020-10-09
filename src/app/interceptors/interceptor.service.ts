import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http'
import { AuthenticationService } from '../services/auth.service';
import { environment } from 'src/environments/environment';

export const InterceptorSkipHeader = 'X-Skip-Interceptor';
@Injectable()
export class Interceptor implements HttpInterceptor {

    constructor(private authenticationService: AuthenticationService) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        // if (request.headers.has(InterceptorSkipHeader)) {
        //     const headers = request.headers.delete(InterceptorSkipHeader);
        //     return next.handle(request.clone({ headers }));
        // }


        const token = localStorage.getItem('Authorization');
        console.log(token);

        if (token != null) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            })

        }
        return next.handle(request);
        // const token = this.authenticationService.getToken;


        // const currentUser = this.authenticationService.currentUserValue;
        // const isLoggedIn = currentUser && currentUser.token;
        // const isApiUrl = request.url.startsWith(environment.apiUrl);
        // if (isLoggedIn && isApiUrl){
        //     request = request.clone({
        //         setHeaders: {
        //             Authorization: `Bearer ${currentUser.token}`
        //         }
        //     });
        // }


    }
}