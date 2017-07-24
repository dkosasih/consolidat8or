import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { FileUploadModule } from 'ng2-file-upload';
import { DragulaModule } from 'ng2-dragula';

import { UploadComponent } from '../components/upload/upload.component'
import { PreviewComponent } from '../components/preview/preview.component'
import { TableRenderComponent } from '../components/tablerender/table.render.component'

import { MappedColumnsService } from '../services/mappedColumns.service'

const routes: Routes = [
    { path: 'upload', component: UploadComponent },
    { path: 'tablepreview', component: PreviewComponent }
];


@NgModule({
    imports: [
        BrowserModule,
        JsonpModule,
        FormsModule,
        FileUploadModule,
        DragulaModule,
        RouterModule.forChild(routes)
    ],

    providers: [MappedColumnsService],
    declarations: [
        UploadComponent,
        PreviewComponent,
        TableRenderComponent
    ]

})
export class UploadModule { }