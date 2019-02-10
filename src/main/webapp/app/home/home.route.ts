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

import {Routes} from '@angular/router';
import {HomeComponent} from 'app/home/home/home.component';
import {TestPageRoute} from 'app/home/test-page/test-page.route';
import {AboutPageRoute} from 'app/home/about-page/about-page.route';
import {AboutProjectPageRoute} from 'app/home/about-project-page/about-project-page.route';

export const HOME_ROUTES: Routes = [
    {
        path: '',
        component: HomeComponent,
        data: {
            authorities: [],
            pageTitle: 'home.head-title'
        }
    },
    TestPageRoute,
    AboutPageRoute,
    AboutProjectPageRoute
];
