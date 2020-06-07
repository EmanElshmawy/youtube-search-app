import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { DomSanitizer} from '@angular/platform-browser';
import { NgxIndexedDBModule } from 'ngx-indexed-db';
import { dbConfig } from './db-config';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule ,FormsModule } from '@angular/forms';
import { SearchInputComponent } from './search-input/search-input.component';
import { CardComponent } from './card/card.component';
import { VideosState } from './shared/state';

@NgModule({
  declarations: [
    AppComponent,
    SearchInputComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxIndexedDBModule.forRoot(dbConfig),
    NgxsModule.forRoot([VideosState]) ,
    NgxsReduxDevtoolsPluginModule.forRoot(),
    // StoreModule.forRoot(VideosState),
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
