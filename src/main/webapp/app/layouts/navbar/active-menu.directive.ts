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

import { Directive, OnInit, ElementRef, Renderer, Input } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Languages } from 'app/shared/language/language.constants';

@Directive({
    selector: '[mybActiveMenu]'
})
export class ActiveMenuDirective implements OnInit {
    @Input() mybActiveMenu: string;

    constructor(private el: ElementRef, private renderer: Renderer, private translateService: TranslateService) {}

    ngOnInit() {
        this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
            this.updateActiveFlag(event.lang);
        });
        this.updateActiveFlag(Languages[0].iso);
    }

    updateActiveFlag(selectedLanguage) {
        if (this.mybActiveMenu === selectedLanguage) {
            this.renderer.setElementClass(this.el.nativeElement, 'mat-menu-item-active', true);
        } else {
            this.renderer.setElementClass(this.el.nativeElement, 'mat-menu-item-active', false);
        }
    }
}
