/*
Copyright 2019 Sergey Didenko <sergey.didenko.dev@gmail.com>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

		http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Principal} from 'app/shared/auth/principal.service';

@Injectable({ providedIn: 'root'})
export class UserRouteAccessService implements CanActivate {
    constructor(private router: Router,
                private principal: Principal) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.checkLogin(route.data['roles']);
    }

    checkLogin(roles: string[]): Promise<boolean> {
        const principal = this.principal;
        return Promise.resolve(
            principal.identity().then(user => {
                if (!roles || roles.length === 0) {
                    return true;
                }

                if (user) {
                    return principal.hasAnyRoles(roles).then(response => {
                        return response;
                    });
                }

                this.router.navigate(['accessdenied']).then(() => {
                    // only show the login dialog, if the user hasn't logged in yet
                    if (!user) {
                        this.router.navigate([
                                {
                                    outlets: {
                                        popup: 'auth/login'
                                    }
                                }
                            ]
                        );
                    }
                });
                return false;
            })
        );
    }
}
