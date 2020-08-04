import { Component, OnInit } from '@angular/core';
import {SpotsTypesOptions, SpotsTypesService} from '../../spots-types/spots-types.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NewSpot, SpotsService} from '../spots.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-create-spot',
  templateUrl: './create-spot.component.html',
  styleUrls: ['./create-spot.component.css']
})
export class CreateSpotComponent implements OnInit {

  isProcessing: boolean = false;

  spotsTypesOptions: SpotsTypesOptions[] = [];

  newSpotForm: FormGroup = new FormGroup({
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

  }

  cancel() {
    this.location.back();
  }

  save() {
    if (this.newSpotForm.valid) {
      this.isProcessing = true;

      const newSpot: NewSpot = {
        name: this.newSpotForm.get('name').value,
        spot_type_id: this.newSpotForm.get('spotType').value.id,
        image: this.newSpotForm.get('image').value,
        number: this.newSpotForm.get('number').value,
        street: this.newSpotForm.get('street').value,
        zip_code: this.newSpotForm.get('zipCode').value,
        lat: this.newSpotForm.get('lat').value,
        lng: this.newSpotForm.get('lng').value
      };

      this.spotsService.createSpot(newSpot).subscribe(
        response => {
          if (response.success) {
            this.snackBar.open('Lugar creado correctamente', null, {duration: 3000});
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
