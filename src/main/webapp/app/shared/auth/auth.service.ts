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
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserDTO} from 'app/shared/auth/dto/user-dto.model';
import {SERVER_API_URL} from 'app/app.constants';
import {LoginDTO} from 'app/shared/auth/dto/login-dto.model';
import {Principal} from 'app/shared/auth/principal.service';
import {RegisterDTO} from 'app/shared/auth/dto/register-dto.model';

@Injectable({ providedIn: 'root' })
export class AuthService {

    constructor(private http: HttpClient,
                private principal: Principal) {
    }

    login(loginDTO: LoginDTO): Observable<HttpResponse<UserDTO>> {
        const req: Observable<HttpResponse<UserDTO>> = this.http.post<UserDTO>(SERVER_API_URL + 'authorization/login', loginDTO, { observe: 'response' });

        this.processAuthResponse(req);

        return req;
    }

    register(registerDTO: RegisterDTO): Observable<HttpResponse<UserDTO>> {
        const req: Observable<HttpResponse<UserDTO>> = this.http.post<UserDTO>(SERVER_API_URL + 'authorization/register', registerDTO, { observe: 'response' });

        this.processAuthResponse(req);

        return req;
    }

    logout() {
        this.principal.authenticate(null);
    }

    /**
     * Process Auth response and put it principal
     * @param req
     */
    private processAuthResponse(req: Observable<HttpResponse<UserDTO>>) {
        req.toPromise().then(response => this.principal.authenticateByResponse(response));
    }

}
