import { Component, OnInit } from '@angular/core';
import { Transaction } from 'dto/transaction';

@Component({
    templateUrl: './welcome.component.html'
})
export class WelcomeComponent implements OnInit {
    public pageTitle: string = 'Welcome';

    ngOnInit() {
    }
}
