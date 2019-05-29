import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavComponent } from './template/nav/nav.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PopupModalComponent } from './common/popup-modal/popup-modal.component';
import { TestComponentComponent } from './components/test-component/test-component.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

import { ApiService } from './services/api.service';
import { AuthGuard, CanDeactivateGuard } from './services/auth.guard';
import { AppSettingsService } from './services/app-settings.service';
import { AuthService } from './services/auth.service';
import { ContractActionFormComponent } from './components/contract-action-form/contract-action-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    PopupModalComponent,
    TestComponentComponent,
    DashboardComponent,
    ContractActionFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    HttpModule,
    Ng2ImgMaxModule,
    EditorModule,
    ReactiveFormsModule
  ],
  providers: [ApiService, AuthGuard, CanDeactivateGuard, AppSettingsService, AuthService],
  bootstrap: [AppComponent],
  entryComponents: [
    TestComponentComponent,
    ContractActionFormComponent
  ]
})
export class AppModule { }
