import {Injectable} from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/User';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/Operators';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class MemberEditResolver implements Resolve<User>{
    resolve(route: ActivatedRouteSnapshot): Observable<User>
    {
        return this.userService.getUser(this.authService.decodedToken.nameid).pipe(
            catchError(error => {
                this.alertify.error('problem occured');
                this.router.navigate(['/members']);
                return of(null);
            })
        );
    }

    constructor(private userService: UserService, private authService: AuthService,
                private router: Router,
                private alertify: AlertifyService){}

}
