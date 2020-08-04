import { Component, OnInit } from '@angular/core';
import {ListSpots, SpotsService} from '../spots.service';
import {FormControl, Validators} from '@angular/forms';
import {SpotsTypesOptions, SpotsTypesService} from '../../spots-types/spots-types.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-list-spots',
  templateUrl: './list-spots.component.html',
  styleUrls: ['./list-spots.component.css']
})
export class ListSpotsComponent implements OnInit {

  isProcessing: boolean = false;

  columnsTable = ['id', 'spot_type', 'name', 'image', 'address', 'created_at', 'delete', 'edit'];
  spots: ListSpots[] = [];

  spotsTypesOptions: SpotsTypesOptions[] = [];
  spotTypeControl: FormControl = new FormControl('');

  constructor(private spotsService: SpotsService,
              private spotsTypeService: SpotsTypesService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.spotsTypeService.getSpotsTypesOptions().subscribe(
      response => {
        if (response.success) {
          this.spotsTypesOptions = response.data.spots_types as SpotsTypesOptions[];
        }
      },
      error => {

      }
    );
    this.getSpots();

    this.spotTypeControl.valueChanges.subscribe((value: SpotsTypesOptions) => {
      this.getSpots(value.id.toString());
    });
  }

  getSpots(spotType: string = '') {
    this.isProcessing = true;
    this.spotsService.getSpots(spotType).subscribe(
      response => {
        if (response.success) {
          this.spots = response.data.spots as ListSpots[];
        }
        this.isProcessing = false;
      },
      error => {
        this.isProcessing = false;
      }
    );
  }

  deleteSpot(spotId: number) {
    // TODO: AGREGAR ALERT PARA CONFIRMACION DE ACCION
    this.isProcessing = true;
    this.spotsService.deleteSpot(spotId).subscribe(
      response => {
        this.snackBar.open(response.data.message, null, {duration: 3000});
        if (response.success) {
          this.getSpots();
        }
        this.isProcessing = false;
      },
      error => {
        this.snackBar.open('Ha ocurrido un error al realizar la operación', null, {duration: 3000});
        this.isProcessing = false;
      }
    );
  }

}
