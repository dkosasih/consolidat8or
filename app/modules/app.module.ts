import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UploadModule} from './csv.upload.module';

import {CommonModule} from './common.module';

import { AppComponent } from '../app.component';
import { WelcomeComponent } from '../components/home/welcome.component';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {useHash:true}),
    UploadModule
  ],
  declarations: [
    AppComponent,
    WelcomeComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
