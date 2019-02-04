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
import { ActivatedRoute } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'myb-error',
    templateUrl: './error.component.html'
})
export class ErrorComponent implements OnInit {
    errorMessage: string;
    error403: boolean;
    error404: boolean;

    constructor(private route: ActivatedRoute,
                public translate: TranslateService) {}

    ngOnInit() {
        this.route.data.subscribe(routeData => {
            if (routeData.error403) {
                this.error403 = routeData.error403;
            }
            if (routeData.error404) {
                this.error404 = routeData.error404;
            }
            if (routeData.errorMessage) {
                this.errorMessage = routeData.errorMessage;
            }
        });
    }
}
