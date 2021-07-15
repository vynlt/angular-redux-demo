import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AntdModule } from './ant.module';

import { TableFeatureComponent } from './city/table-feature/table-feature.component';
import { FormCreateNewComponent } from './city/form-create-new/form-create-new.component';

import { StoreModule } from '@ngrx/store';
import { cityReducer } from './city/city.reducer';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    TableFeatureComponent,
    FormCreateNewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AntdModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ cityList: cityReducer })
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
