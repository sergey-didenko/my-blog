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
import {UserDTO} from 'app/shared/auth/dto/user-dto.model';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {TokenStorageService} from 'app/shared/auth/token-storage.service';
import {SERVER_API_URL} from 'app/app.constants';
import {TOKEN_HEADER_KEY} from 'app/shared/auth/auth.interceptor';
import {Observable, Subject} from 'rxjs';
import {isNullOrUndefined} from 'util';
import {BroadcastService} from 'app/shared/broadcast/broadcast.service';

export const AVAILABLE_ROLES = [
    'ROLE_ADMIN',   // 0
    'ROLE_USER',    // 1
];

@Injectable({ providedIn: 'root' })
export class Principal {

    private authenticated = false;
    private user: UserDTO;
    private userSubject = new Subject<any>();

    constructor(private http: HttpClient,
                private tokenStorageService: TokenStorageService,
                private broadcastService: BroadcastService) {
    }

    identity(): Promise<UserDTO> {
        if (this.user) {
            return Promise.resolve(this.user);
        }

        // Main auth method, who get token
        return this.http.get<UserDTO>(SERVER_API_URL + 'authorization', { observe: 'response' })
            .toPromise()
            .then(response => {
                this.authenticateByResponse(response);

                return this.user;
            })
            .catch(() => {
                this.authenticate(null);

                return null;
            });
    }

    authenticateByResponse(response: HttpResponse<UserDTO>) {
        if (response.status == 200) {
            const jwt = response.headers.get(TOKEN_HEADER_KEY);
            if (isNullOrUndefined(this.tokenStorageService.getToken()) && !isNullOrUndefined(jwt)) {
                this.tokenStorageService.saveToken(jwt);
            }

            this.authenticate(response.body);
        }
    }

    authenticate(user: UserDTO) {
        if (!user) {
            this.tokenStorageService.clearToken();
        }

        this.user = user;
        this.authenticated = !isNullOrUndefined(this.user);
        this.userSubject.next(this.user);

        // send broadcast to Navbar
        if (this.authenticated) {
            this.broadcastService.broadcast('authorization_success');
        } else {
            this.broadcastService.broadcast('authorization_end');
        }
    }

    isAuthenticated(): boolean {
        return this.authenticated;
    }

    isIdentityResolved(): boolean {
        return !isNullOrUndefined(this.user);
    }

    getUser(): Observable<any> {
        return this.userSubject.asObservable();
    }

    hasAnyRoles(roles: string[]): Promise<boolean> {
        return Promise.resolve(this.hasAnyRolesDirect(roles));
    }

    hasAnyRolesDirect(roles: string[]): boolean {
        if (!this.authenticated || !this.user || !this.user.roleSet) {
            return false;
        }

        for (let i = 0; i < roles.length; i++) {
            if (this.hasRoles(roles[i])) {
                return true;
            }
        }

        return false;
    }

    hasRoles(role: string): boolean {
        return this.user.roleSet.includes(role);
    }

    getUserRoles(): string[] {
        return this.isIdentityResolved() ? this.user.roleSet : [];
    }

    getUserId(): number {
        return this.isIdentityResolved() ? this.user.id : null;
    }

}
