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

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CookieModule } from 'ngx-cookie';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    imports: [
        NgbModule.forRoot(),
        InfiniteScrollModule,
        CookieModule.forRoot(),
        FontAwesomeModule
    ],
    exports: [
        FormsModule,
        CommonModule,
        NgbModule,
        InfiniteScrollModule,
        FontAwesomeModule
    ]
})
export class MyBlogSharedLibsModule {
    static forRoot() {
        return {
            ngModule: MyBlogSharedLibsModule
        };
    }
}
