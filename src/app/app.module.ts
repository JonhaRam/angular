import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SpotsComponent } from './spots/spots.component';
import { ListSpotsComponent } from './spots/list-spots/list-spots.component';
import { CreateSpotComponent } from './spots/create-spot/create-spot.component';
import { EditSpotComponent } from './spots/edit-spot/edit-spot.component';
import { SpotsTypesComponent } from './spots-types/spots-types.component';
import { ListSpotsTypesComponent } from './spots-types/list-spots-types/list-spots-types.component';
import { CreateSpotTypeComponent } from './spots-types/create-spot-type/create-spot-type.component';
import { EditSpotTypeComponent } from './spots-types/edit-spot-type/edit-spot-type.component';
import {AppRoutingModule} from './app-routing.module';
import { HomeComponent } from './home/home.component';
import {HttpClientModule} from '@angular/common/http';
import {SpotsTypesService} from './spots-types/spots-types.service';
import {MatDialogModule, MatProgressSpinnerModule, MatSelectModule, MatSnackBarModule, MatTableModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SpotsService} from './spots/spots.service';

@NgModule({
  declarations: [
    AppComponent,
    SpotsComponent,
    ListSpotsComponent,
    CreateSpotComponent,
    EditSpotComponent,
    SpotsTypesComponent,
    ListSpotsTypesComponent,
    CreateSpotTypeComponent,
    EditSpotTypeComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    // MODULOS PARA COMPONENTES DE ANGULAR MATERUAL
    MatTableModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatDialogModule,

    // RUTAS DE LA APLICACION
    AppRoutingModule,
  ],
  providers: [SpotsTypesService, SpotsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
