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

import './vendor.ts';

import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { Ng2Webstorage } from 'ngx-webstorage';

import { MyBlogSharedModule, AuthInterceptorProvider } from 'app/shared';
import { MyBlogAppRoutingModule } from './app-routing.module';
import { MyBlogHomeModule } from 'app/home';
import * as moment from 'moment';

import { MainComponent, NavbarComponent, FooterComponent, ActiveMenuDirective, ErrorComponent } from './layouts';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Languages } from 'app/shared/language/language.constants';

import {MyBlogAuthModule} from 'app/auth/auth.module';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        Ng2Webstorage.forRoot({ prefix: 'myb', separator: '-' }),
        // configure the imports
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        MyBlogSharedModule.forRoot(),

        // modules
        MyBlogHomeModule,
        MyBlogAuthModule,

        // routing
        MyBlogAppRoutingModule
    ],
    declarations: [
        MainComponent,
        NavbarComponent,
        ErrorComponent,
        ActiveMenuDirective,
        FooterComponent
    ],
    providers: [
        AuthInterceptorProvider,
        TranslateService
    ],
    bootstrap: [
        MainComponent
    ]
})
export class MyBlogAppModule {
    constructor(private dpConfig: NgbDatepickerConfig,
                private translate: TranslateService) {
        this.dpConfig.minDate = { year: moment().year() - 100, month: 1, day: 1 };

        // default language
        this.translate.setDefaultLang(Languages[0].iso);
    }
}

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
