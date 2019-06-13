import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { ServiceService } from '../service/lawnService.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: ServiceService, private router: Router) { }

    canActivate() {
        if (this.authService.isAuthenticated()) {
            return true;
        }
        else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}