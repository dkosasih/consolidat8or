import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WelcomeComponent } from './welcome.component';

describe('BannerComponent (templateUrl)', () => {

    let comp: WelcomeComponent;
    let fixture: ComponentFixture<WelcomeComponent>;
    let de: DebugElement;
    let el: HTMLElement;

    // async beforeEach
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [WelcomeComponent], // declare the test component
        })
            .compileComponents();  // compile template and css
    }));

    // synchronous beforeEach
    beforeEach(() => {
        fixture = TestBed.createComponent(WelcomeComponent);

        comp = fixture.componentInstance; // BannerComponent test instance

        // query for the title <h1> by CSS element selector
        de = fixture.debugElement.query(By.css('h1'));
        el = de.nativeElement;
    });


    it("should pass", function () {
        let a = 1 + 1;
        expect(true).toEqual(true);
    });
});