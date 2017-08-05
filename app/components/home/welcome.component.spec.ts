import { async, ComponentFixtureAutoDetect, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { } from 'jasmine';
import { WelcomeComponent } from 'components/home/welcome.component';

describe('Welcome (templateUrl)', () => {

    let comp: WelcomeComponent;
    let fixture: ComponentFixture<WelcomeComponent>;
    let de: DebugElement;
    let el: HTMLElement;

    // async beforeEach
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [WelcomeComponent], // declare the test component
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        })
            .compileComponents();  // compile template and css
    }));

    // synchronous beforeEach
    beforeEach(() => {
        fixture = TestBed.createComponent(WelcomeComponent);

        comp = fixture.componentInstance; // BannerComponent test instance

        // query for the title <h1> by CSS element selector
        de = fixture.debugElement.query(By.css('div[class=panel-heading]'));
        el = de.nativeElement;
    });


    it("should div should be the same as the page title", function () {

        expect(el.textContent).toContain(comp.pageTitle);
    });
});