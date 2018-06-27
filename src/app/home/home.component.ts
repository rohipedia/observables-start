import { Component, OnInit } from '@angular/core';

import { Observable } from "rxjs/Observable";
import 'rxjs/Rx';
import { Observer } from "rxjs/Observer";
import { OnDestroy } from "@angular/core";
import { Subscription } from "rxjs/Subscription";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
    numbersObsSubscription: Subscription;
    customObsSubscription: Subscription;

    constructor() {
    }

    ngOnInit() {
        const myNumbers = Observable.interval(1000);
        //noinspection TypeScriptValidateTypes
        this.numbersObsSubscription = myNumbers
            .map(
                (data: number) => {
                    return data * 2;
                }
            )
            .subscribe(
                (number: number) => {
                    console.log(number);
                }
            );

        const myObservable = Observable.create((observer: Observer) => {
            setTimeout(() => {
                observer.next('First package')
            }, 2000);
            setTimeout(() => {
                observer.next('Second package')
            }, 4000);
            setTimeout(() => {
                //observer.error('This does not work')
                observer.complete();
            }, 5000);
            setTimeout(() => {
                observer.next('Third package')
            }, 6000);
        });

        this.customObsSubscription = myObservable.subscribe(
            (data: string) => { console.log(data); },
            (error: string) => { console.log(error); },
            () => { console.log('completed'); }
        )
    }

    ngOnDestroy() {
        this.numbersObsSubscription.unsubscribe();
        this.customObsSubscription.unsubscribe();
    }

}
