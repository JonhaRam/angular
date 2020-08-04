import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {SpotsTypesOptions, SpotsTypesService, SpotTypeDetail} from '../../spots-types/spots-types.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NewSpot, SpotDetail, SpotsService, SpotUpdated} from '../spots.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-edit-spot',
  templateUrl: './edit-spot.component.html',
  styleUrls: ['./edit-spot.component.css']
})
export class EditSpotComponent implements OnInit {

  spotId: string;
  spot: SpotDetail;

  isProcessing: boolean = false;

  spotsTypesOptions: SpotsTypesOptions[] = [];

  updateSpotForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    number: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required]),
    zipCode: new FormControl('', [Validators.required, Validators.pattern('[0-9]{5}')]),
    lat: new FormControl('', [Validators.required]),
    lng: new FormControl('', [Validators.required]),
    spotType: new FormControl('', [Validators.required])
  });

  constructor(private spotsService: SpotsService,
              private spotsTypeService: SpotsTypesService,
              private location: Location,
              private router: Router,
              private snackBar: MatSnackBar,
              private activatedRoute: ActivatedRoute) {
    this.spotId = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.isProcessing = true;

    this.spotsTypeService.getSpotsTypesOptions().subscribe(
      response => {
        if (response.success) {
          this.spotsTypesOptions = response.data.spots_types as SpotsTypesOptions[];
          this.getSpot();
        }
      },
      error => {

      }
    );

  }

  getSpot() {
    this.spotsService.getSpot(this.spotId).subscribe(
      response => {
        if (response.success) {
          this.spot = response.data.spot as SpotDetail;
          this.updateSpotForm.get('name').setValue(this.spot.name);
          this.updateSpotForm.get('image').setValue(this.spot.image);
          this.updateSpotForm.get('number').setValue(this.spot.number);
          this.updateSpotForm.get('street').setValue(this.spot.street);
          this.updateSpotForm.get('zipCode').setValue(this.spot.zip_code);
          this.updateSpotForm.get('lat').setValue(this.spot.lat);
          this.updateSpotForm.get('lng').setValue(this.spot.lng);

          const actualSpotType: SpotsTypesOptions = this.spotsTypesOptions.find(
            sp => sp.id === this.spot.spot_type.id
          );
          this.updateSpotForm.get('spotType').patchValue(actualSpotType);

        } else {
          this.snackBar.open('No se ha podido obtener la información del lugar', null, {duration: 3000});
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
    this.location.back();
  }

  save() {
    console.log(this.updateSpotForm.value);
    if (this.updateSpotForm.valid) {
      this.isProcessing = true;

      const spotUpdated: SpotUpdated = {
        name: this.updateSpotForm.get('name').value,
        spot_type_id: this.updateSpotForm.get('spotType').value.id,
        image: this.updateSpotForm.get('image').value,
        number: this.updateSpotForm.get('number').value,
        street: this.updateSpotForm.get('street').value,
        zip_code: this.updateSpotForm.get('zipCode').value,
        lat: this.updateSpotForm.get('lat').value,
        lng: this.updateSpotForm.get('lng').value
      };

      this.spotsService.updateSpot(this.spotId, spotUpdated).subscribe(
        response => {
          if (response.success) {
            this.snackBar.open('Lugar actualizado correctamente', null, {duration: 3000});
            this.router.navigateByUrl('/spots');
          } else {
            this.snackBar.open(response.data.message, null, {duration: 3000});
          }
          this.isProcessing = false;
        },
        error => {
          // VALIDAR LOS POSIBLES ERRORES QUE SE PUEDEN PRESENTAR
          this.snackBar.open('Ha ocurrido un error', null, {duration: 3000});
          this.isProcessing = false;
        }
      );
    }

  }

}
