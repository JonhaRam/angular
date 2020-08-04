import {Component, OnDestroy, OnInit} from '@angular/core';
import {ListSpotsTypes, SpotsTypesService} from '../spots-types.service';
import {Observable, Subscription} from 'rxjs';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-list-spots-types',
  templateUrl: './list-spots-types.component.html',
  styleUrls: ['./list-spots-types.component.css']
})
export class ListSpotsTypesComponent implements OnInit, OnDestroy {

  isProcessing: boolean = false;

  columnsTable = ['id', 'name', 'delete', 'edit'];
  spotsTypes: ListSpotsTypes[] = [];

  checkForUpdate: Subscription;

  constructor(private spotsTypesService: SpotsTypesService,
              private snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.getSpotsTypes();
    this.checkForUpdate = this.spotsTypesService.getMessage().subscribe(myMessage => {
      this.getSpotsTypes();
    });
  }

  ngOnDestroy(): void {
    this.checkForUpdate.unsubscribe();
  }

  getSpotsTypes() {
    this.isProcessing = true;
    this.spotsTypesService.getSpotsTypes().subscribe(
      response => {
        if (response.success) {
          this.spotsTypes = response.data.spots_types as ListSpotsTypes[];
        }
        this.isProcessing = false;
      },
      error => {
        this.isProcessing = false;
      }
    );
  }

  deleteSpotType(spotTypeId: number) {
    // TODO: AGREGAR ALERT PARA CONFIRMACION DE ACCION
    this.isProcessing = true;
    this.spotsTypesService.deleteSpotType(spotTypeId).subscribe(
      response => {
        this.snackBar.open(response.data.message, null, {duration: 3000});
        if (response.success) {
          this.getSpotsTypes();
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
