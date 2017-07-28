import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

@NgModule({
    imports: [
        BrowserModule,
        JsonpModule,
        FormsModule
    ],
    exports: [
        BrowserModule,
        JsonpModule,
        FormsModule
    ]
})
export class CommonModule { }