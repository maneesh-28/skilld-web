import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './auth/auth.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      timeOut: 3000
    })

  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
