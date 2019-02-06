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

import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import {HttpClient} from '@angular/common/http';

const TOKEN_KEY = 'AuthToken';

@Injectable({providedIn: 'root'})
export class TokenStorageService {

    constructor(private http: HttpClient,
                private localStorage: LocalStorageService) {
    }

    getToken(): string {
        return this.localStorage.retrieve(TOKEN_KEY);
    }

    saveToken(token: string) {
        this.localStorage.clear(TOKEN_KEY);
        this.localStorage.store(TOKEN_KEY, token);
    }

    clearToken() {
        this.localStorage.clear(TOKEN_KEY);
    }

}
