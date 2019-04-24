import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './template/nav/nav.component';
import { HomeComponent } from './pages/home/home.component';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CanDeactivateGuard, AuthGuard } from './services/auth.guard';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { EditorModule } from '@tinymce/tinymce-angular';
import { PopupModalComponent } from './common/popup-modal/popup-modal.component';
import { TestComponentComponent } from './components/test-component/test-component.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    PopupModalComponent,
    TestComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    HttpModule,
    Ng2ImgMaxModule,
    EditorModule
  ],
  providers: [ApiService, AuthGuard, CanDeactivateGuard],
  bootstrap: [AppComponent],
  entryComponents: [TestComponentComponent]
})
export class AppModule { }
