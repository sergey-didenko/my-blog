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

import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {Principal} from 'app/shared';

/**
 * @whatItDoes Conditionally includes an HTML element if current user has any
 * of the authorities passed as the `expression`.
 *
 * @howToUse
 *     <some-element *mybHasAnyRole="'ROLE_ADMIN'">...</some-element>
 *     <some-element *mybHasAnyRole="['ROLE_ADMIN', 'ROLE_USER']">...</some-element>
 */
@Directive({
    selector: '[mybHasAnyRole]'
})
export class HasAnyRoleDirective {
    private roles: string[];

    constructor(private principal: Principal,
                private templateRef: TemplateRef<any>,
                private viewContainerRef: ViewContainerRef) {
    }

    @Input()
    set mybHasAnyRole(value: string | string[]) {
        this.roles = typeof value === 'string' ? [value] : value;
        this.updateView();

        // Get notified each time authentication state changes.
        this.principal.getUser().subscribe(() => this.updateView());
    }

    private updateView(): void {
        this.principal.hasAnyRoles(this.roles).then(result => {
            this.viewContainerRef.clear();
            if (result) {
                this.viewContainerRef.createEmbeddedView(this.templateRef);
            }
        });
    }
}
