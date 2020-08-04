import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {NewSpotType, SpotsTypesService} from '../spots-types.service';
import {MatSnackBar} from '@angular/material';
import {config} from 'rxjs';

@Component({
  selector: 'app-create-spot-type',
  templateUrl: './create-spot-type.component.html',
  styleUrls: ['./create-spot-type.component.css']
})
export class CreateSpotTypeComponent implements OnInit {

  nameControl: FormControl = new FormControl('', [Validators.required, Validators.minLength(4)]);

  isProcessing: boolean = false;

  constructor(private spotsTypesService: SpotsTypesService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {

  }

  cancel() {
    this.nameControl.reset();
  }

  save() {
    if (this.nameControl.valid) {
      this.isProcessing = true;
      const newSpotType: NewSpotType = {
        name: this.nameControl.value
      };
      this.spotsTypesService.createSpotType(newSpotType).subscribe(
        response => {
          if (response.success) {
            this.snackBar.open('Tipo de espacio creado correctamente', null, {duration: 3000});
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
