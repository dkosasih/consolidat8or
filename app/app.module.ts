import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { FileUploadModule } from 'ng2-file-upload';
import { DragulaModule } from 'ng2-dragula';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/home/welcome.component'
import { UploadComponent } from './components/upload/upload.component'
import { PreviewComponent } from './components/preview/preview.component'

import { MappedColumnsService } from './services/mappedColumns.service'

@NgModule({
  imports: [BrowserModule,
    JsonpModule,
    FileUploadModule,
    FormsModule,
    DragulaModule,
    RouterModule.forRoot([
      { path: 'welcome', component: WelcomeComponent },
      { path: 'upload', component: UploadComponent },
      { path: 'tablepreview', component: PreviewComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
    ])
  ],
  providers: [MappedColumnsService],
  declarations: [
    AppComponent,
    WelcomeComponent,
    UploadComponent,
    PreviewComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
