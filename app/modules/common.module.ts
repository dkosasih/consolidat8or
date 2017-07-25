import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { UploadModule } from './csv.upload.module'
import {List} from '../../app/helper/collection'

@NgModule({
    imports: [
        BrowserModule,
        JsonpModule,
        FormsModule,
        UploadModule
    ],
    exports: [
        BrowserModule,
        JsonpModule,
        FormsModule,
        UploadModule
    ]
})
export class CommonModule { }