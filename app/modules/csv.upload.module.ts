import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { CommonModule } from './common.module';
import { DatePipe } from '@angular/common';

import { FileUploadModule } from 'ng2-file-upload';
import { DragulaModule } from 'ng2-dragula';
import { GenericTableModule } from '@angular-generic-table/core';

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
        CommonModule,
        FileUploadModule,
        DragulaModule,
        GenericTableModule,
        RouterModule.forChild(routes)
    ],

    providers: [MappedColumnsService, DatePipe],
    declarations: [
        UploadComponent,
        PreviewComponent,
        TableRenderComponent        
    ]

})
export class UploadModule { }