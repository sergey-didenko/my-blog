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

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';

import { VERSION } from 'app/app.constants';
import {AuthService, LanguageHelper, Principal} from 'app/shared';
import {BroadcastService} from 'app/shared/broadcast/broadcast.service';
import { TranslateService } from '@ngx-translate/core';
import {MatSnackBar} from '@angular/material';
import {UserDTO} from 'app/shared/auth/dto/user-dto.model';

@Component({
    selector: 'myb-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['navbar.scss']
})
export class NavbarComponent implements OnInit {
    isNavbarCollapsed: boolean;
    languages: any[];
    version: string;

    user: UserDTO;

    constructor(private translateService: TranslateService,
                private languageHelper: LanguageHelper,
                private sessionStorage: SessionStorageService,
                private router: Router,
                public principal: Principal,
                private broadcastService: BroadcastService,
                private authService: AuthService,
                private snackBar: MatSnackBar) {
        this.version = VERSION ? 'v' + VERSION : '';
        this.isNavbarCollapsed = true;
    }

    ngOnInit() {
        this.languageHelper.getAll().then(languages => {
            this.languages = languages;
        });

        // add listener, waiting for Principal notification
        this.broadcastService.listener('authorization_success').subscribe(() => {
            this.getUser();
        });

        this.broadcastService.listener('authorization_end').subscribe(() => {
            this.user = null;
        });

        // and then try to auth
        this.getUser();
    }

    getUser() {
        /**
         * Try to get authorization
         */
        this.principal.identity().then(user => {
            this.user = user;
            if (user) {
                console.log('Login successful from token storage, user name:' + this.user.name);
            } else {
                console.log('Not authorized, the token does not exist');
            }
        });
    }

    changeLanguage(languageKey: string) {
        this.sessionStorage.store('locale', languageKey);
        this.translateService.use(languageKey);
    }

    collapseNavbar() {
        this.isNavbarCollapsed = true;
    }

    toggleNavbar() {
        this.isNavbarCollapsed = !this.isNavbarCollapsed;
    }

    logout() {
        this.authService.logout();
        this.translateService.get('global.auth.logout').toPromise().then(translate => {
            this.snackBar.open(translate, '', {
                duration: 2500
            });
        });
    }

}
