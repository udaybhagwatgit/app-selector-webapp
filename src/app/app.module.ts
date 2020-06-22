import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';

import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TdcsampleoneComponent } from './tdcsampleone/tdcsampleone.component';
import { DynamictdcformComponent } from './dynamictdcform/dynamictdcform.component';
import { AppErrorHandler } from './common/app-error-handler';

import { TdcserviceService } from './services/tdcservice.service';
@NgModule({
  declarations: [
    AppComponent,    
    TdcsampleoneComponent,
    DynamictdcformComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'TDC-Xsrf-Cookie',
      headerName: 'TDC-Xsrf-Header',
    })
  ],
  // tslint:disable-next-line:max-line-length
  providers: [TdcserviceService, {provide: ErrorHandler, useClass: AppErrorHandler}],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
  }
}
