import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: 'app/components/home/welcome.component.html'
})
export class WelcomeComponent implements OnInit {
    public pageTitle: string = '';

    ngOnInit() {
    }
}
