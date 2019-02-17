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
import { Router, ActivatedRouteSnapshot, NavigationEnd, NavigationError } from '@angular/router';
import {LanguageHelper} from 'app/shared';
import {isNullOrUndefined} from 'util';

@Component({
    selector: 'myb-main',
    templateUrl: './main.component.html'
})
export class MainComponent implements OnInit {
    constructor(private languageHelper: LanguageHelper, private router: Router) {}

    private getPageTitle(routeSnapshot: ActivatedRouteSnapshot) {
        const title: string = routeSnapshot.data && routeSnapshot.data['pageTitle'] ? routeSnapshot.data['pageTitle'] : null;
        if (!isNullOrUndefined(title)) {
            this.languageHelper.updateTitle(title);
        }

        let titleKey: string = routeSnapshot.data && routeSnapshot.data['pageTitleKey'] ? routeSnapshot.data['pageTitleKey'] : 'myBlogApp';
        if (routeSnapshot.firstChild) {
            titleKey = this.getPageTitle(routeSnapshot.firstChild) || titleKey;
        }
        return titleKey;
    }

    ngOnInit() {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.languageHelper.updateTitle(this.getPageTitle(this.router.routerState.snapshot.root));
            }
            if (event instanceof NavigationError && event.error.status === 404) {
                this.router.navigate(['/404']);
            }
        });
    }
}
