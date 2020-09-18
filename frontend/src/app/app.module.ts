import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddContentComponent } from './add-content/add-content.component';
import { DetailContentComponent } from './detail-content/detail-content.component';
import { ListContentComponent } from './list-content/list-content.component';

import { FormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AddContentComponent,
    DetailContentComponent,
    ListContentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
