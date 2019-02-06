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

import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MyBlogSharedModule} from 'app/shared';
import {MyBlogAuthRoute} from 'app/auth/auth.route';

import {LoginComponent, LoginPopupComponent} from 'app/auth/login/login.component';
import {RegisterComponent, RegisterPopupComponent} from 'app/auth/register/register.component';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MyBlogSharedModule,
        RouterModule.forChild(MyBlogAuthRoute)
    ],
    exports: [

    ],
    declarations: [
        LoginComponent,
        LoginPopupComponent,
        RegisterComponent,
        RegisterPopupComponent
    ],
    entryComponents: [
        LoginComponent,
        LoginPopupComponent,
        RegisterComponent,
        RegisterPopupComponent
    ],
    providers: [

    ]
})
export class MyBlogAuthModule {

}
