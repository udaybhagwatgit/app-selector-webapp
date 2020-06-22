import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import { TdcserviceService } from '../services/tdcservice.service';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';

@Component({
  selector: 'app-tdcsampleone',
  templateUrl: './tdcsampleone.component.html',
  styleUrls: ['./tdcsampleone.component.css']
})
export class TdcsampleoneComponent implements OnInit {

  someddlvalues;
  errorMessage;
  initialFieldValues;
  componentName;
  unexpectedErrorOne;
  unexpectedErrorTwo;
  groupValidators;

  form = new FormGroup ({
    components : new FormControl({})
  });

  ngOnInit() {

    this.tdcService.getResource('').subscribe(
      response => {
          this.someddlvalues = response.fields[0].fieldValues;
      },
      (error: AppError) => {
        if (error instanceof NotFoundError) {
          this.unexpectedErrorOne = 'The requested Components to delete were no found. Please try later.';
        } else {
        this.unexpectedErrorOne = 'Some unexpected error has occured while getting Components to delete.';
      }
    }
    );
  }

  constructor(private tdcService: TdcserviceService) { }

  onSelect() {
    let controlObj: any;
    controlObj = (this.form.get('components'));
    this.tdcService.getResource('/' + controlObj.value.id).subscribe(
      response => {
        this.initialFieldValues = response.fields;
        this.componentName = response.component;
        this.groupValidators = response.groupValidators;
      },
      (error: AppError) => {
        if (error instanceof NotFoundError) {
          this.unexpectedErrorTwo = 'The requested Components information were no found. Please try later.';
        } else {
        this.unexpectedErrorTwo = 'Some unexpected error has occured while getting Components to delete';
      }
    }
    );
  }
}
