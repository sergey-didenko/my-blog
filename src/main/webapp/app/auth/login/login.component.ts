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

import {
    AfterViewInit,
    Component,
    Inject,
    OnInit
} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {LoginDTO} from 'app/shared/auth/dto/login-dto.model';
import {AuthService} from 'app/shared';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'myb-login',
    templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

    loginDTO: LoginDTO = new LoginDTO();

    constructor(public dialogRef: MatDialogRef<LoginComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private snackBar: MatSnackBar,
                private authService: AuthService,
                private translateService: TranslateService) {
    }

    ngOnInit(): void {
        this.dialogRef.afterClosed().subscribe(() => {
            this.cancel();
        });
    }

    cancel(): void {
        this.dialogRef.close();
    }

    ok(): void {
        this.login();
        this.dialogRef.close();
    }

    login() {
        this.authService.login(this.loginDTO).toPromise().then(
            response => {
                console.log(response);
                if (response.status == 200) {
                    this.openSnackBar('global.auth.login.success');
                } else {
                    this.openSnackBar('global.auth.login.fail');
                }
            }
        ).catch( err => {
            this.openSnackBar('global.auth.login.fail');
        });
    }

    openSnackBar(key: string) {
        this.translateService.get(key).toPromise().then(translate => {
            this.snackBar.open(translate, '', {
                duration: 2500
            });
        });
    }

}

@Component({
    selector: 'myb-login-popup',
    template: ''
})
export class LoginPopupComponent implements AfterViewInit {

    constructor(private router: Router,
                public dialog: MatDialog) {}

    ngAfterViewInit(): void {
        this.openDialog();
    }

    openDialog(): void {
        setTimeout(() => {
            const dialogRef = this.dialog.open(LoginComponent, {
                width: '400px'
            });

            dialogRef.afterClosed().subscribe(() => {
                // close popup component
                this.closePopup();
            });
        }, 0);
    }

    /**
     * Close popup component.
     * Go to home page
     */
    closePopup(): void {
        this.router.navigateByUrl('/');
    }

}
