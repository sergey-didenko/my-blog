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

import {Observable, Subject} from 'rxjs';
import { map, filter } from 'rxjs/operators';
import {Injectable} from '@angular/core';

export interface BroadcastEvent {
    key: any;
    data?: any;
}

@Injectable({ providedIn: 'root' })
export class BroadcastService {
    private broadcastEventSubject: Subject<BroadcastEvent>;

    constructor() {
        this.broadcastEventSubject = new Subject<BroadcastEvent>();
    }

    broadcast(key: any, data?: any) {
        this.broadcastEventSubject.next({key, data});
    }

    listener(key: any): Observable<any> {
        return this.broadcastEventSubject.asObservable()
            .pipe(
                filter(event => event.key === key)
            );
    }

    listenerWithData<T>(key: any): Observable<T> {
        return this.broadcastEventSubject.asObservable()
            .pipe(
                filter(event => event.key === key),
                map(event => <T>event.data)
            );
    }

}
