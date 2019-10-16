import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { InfoMapComponent } from './home/info-map/info-map.component';
import { SelectorsComponent } from './home/selectors/selectors.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListDialogComponent } from './list-dialog/list-dialog.component';
import { FlightItemComponent } from './home/flight-item/flight-item.component';
import { AvailableFlightsComponent } from './home/available-flights/available-flights.component';
import { TncComponent } from './home/tnc/tnc.component';
import { TravellerDetailsComponent } from './home/traveller-details/traveller-details.component';
import { CongoComponent } from './congo/congo.component';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    InfoMapComponent,
    SelectorsComponent,
    ListDialogComponent,
    FlightItemComponent,
    AvailableFlightsComponent,
    TncComponent,
    TravellerDetailsComponent,
    CongoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    MatAutocompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
