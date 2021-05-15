import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()

export class SesionGuard implements CanActivate {

    constructor(private router: Router) {

     }

    canActivate() {

        if (sessionStorage.getItem('estadoSessicon')==='true') {
            return true;
        }
        this.router.navigate(['/']);
        return false;

    }
}
