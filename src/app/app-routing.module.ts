import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {SpotsTypesComponent} from './spots-types/spots-types.component';
import {SpotsComponent} from './spots/spots.component';
import {ListSpotsComponent} from './spots/list-spots/list-spots.component';
import {CreateSpotComponent} from './spots/create-spot/create-spot.component';
import {CreateSpotTypeComponent} from './spots-types/create-spot-type/create-spot-type.component';
import {EditSpotTypeComponent} from './spots-types/edit-spot-type/edit-spot-type.component';
import {EditSpotComponent} from './spots/edit-spot/edit-spot.component'; // CLI imports router

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'spots-types',
    component: SpotsTypesComponent,
    children: [
      {
        path: '',
        component: CreateSpotTypeComponent
      },
      {
        path: 'edit/:id',
        component: EditSpotTypeComponent
      }
    ]
  },
  {
    path: 'spots',
    component: SpotsComponent,
    children: [
      {
        path: '',
        component: ListSpotsComponent
      },
      {
        path: 'create',
        component: CreateSpotComponent
      },
      {
        path: 'edit/:id',
        component: EditSpotComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
