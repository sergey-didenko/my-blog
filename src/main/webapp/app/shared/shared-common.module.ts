import { NgModule } from '@angular/core';

import { MyBlogSharedLibsModule } from './';

@NgModule({
    imports: [
        MyBlogSharedLibsModule
    ],
    declarations: [

    ],
    exports: [
        MyBlogSharedLibsModule,
    ]
})
export class MyBlogSharedCommonModule {}
