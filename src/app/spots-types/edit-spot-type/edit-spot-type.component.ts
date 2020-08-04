import {Component, OnInit} from '@angular/core';
import {SpotsTypesService, SpotTypeDetail, SpotTypeUpdated} from '../spots-types.service';
import {FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-edit-spot-type',
  templateUrl: './edit-spot-type.component.html',
  styleUrls: ['./edit-spot-type.component.css']
})
export class EditSpotTypeComponent implements OnInit {

  spotTypeId: string;
  spotType: SpotTypeDetail;

  nameControl: FormControl = new FormControl('', [Validators.required, Validators.minLength(4)]);

  isProcessing: boolean = false;

  constructor(private spotsTypesService: SpotsTypesService,
              private snackBar: MatSnackBar,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.spotTypeId = params.get('id');
      this.getSpotType();
    });
  }

  ngOnInit() {

  }

  getSpotType() {
    this.isProcessing = true;
    this.spotsTypesService.getSpotsType(this.spotTypeId).subscribe(
      response => {
        if (response.success) {
          this.spotType = response.data.spot_type as SpotTypeDetail;
          this.nameControl.setValue(this.spotType.name);
        } else {
          this.snackBar.open('No se ha podido obtener la información del tipo de lugar', null, {duration: 3000});
        }
        this.isProcessing = false;
      },
      error => {
        this.snackBar.open('Ha ocurrido un error', null, {duration: 3000});
        this.isProcessing = false;
      }
    );
  }

  cancel() {
    this.nameControl.reset();
  }

  save() {
    if (this.nameControl.valid) {
      this.isProcessing = true;
      const spotTypeUpdated: SpotTypeUpdated = {
        name: this.nameControl.value
      };
      this.spotsTypesService.updateSpotType(this.spotType.id, spotTypeUpdated).subscribe(
        response => {
          if (response.success) {
            this.snackBar.open('Tipo de espacio actualizado correctamente', null, {duration: 3000});
            this.spotsTypesService.updateMessage(true);
            this.nameControl.reset();
          } else {
            this.snackBar.open(response.data.message, null, {duration: 3000});
          }

          this.isProcessing = false;
        },
        error => {
          // VALIDAR LOS POSIBLES ERRORES QUE SE PUEDEN PRESENTAR
          this.snackBar.open('Ha ocurrido un error', null, {duration: 3000});
          this.isProcessing = false;
        },
      );
    }

  }

}
