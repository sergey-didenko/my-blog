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

import {Route} from '@angular/router';
import {TestPageComponent} from 'app/home';
import {UserRouteAccessService} from 'app/shared';

export const TestPageRoute: Route = {
    path: 'test-page',
    component: TestPageComponent,
    data: {
        roles: [
            'ROLE_USER'
        ],
        pageTitle: 'Sergey Didenko blog - Test page',
        pageTitleKey: 'home.test-page.head-title'
    },
    canActivate: [UserRouteAccessService]
};
