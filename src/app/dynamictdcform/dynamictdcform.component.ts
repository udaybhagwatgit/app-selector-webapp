import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { TdcserviceService } from '../services/tdcservice.service';
import { FormGroup, FormControl, FormArray, Validators } from 'node_modules/@angular/forms';
import { CustomTDCValidator } from './customtdcvalidator';
import { TdcModel } from './tdcmodel';
import { AppError } from '../common/app-error';
import { BadInput } from '../common/bad-input';
declare var $: any;

@Component({
  selector: 'app-dynamictdcform',
  templateUrl: './dynamictdcform.component.html',
  styleUrls: ['./dynamictdcform.component.css']
})
export class DynamictdcformComponent implements OnInit, OnChanges {

  @Input() formObjects: TdcModel[];
  @Input() componentSelected: string;
  @Input() groupValidators: string[];
  dynamicform: FormGroup;
  isFormReady;
  fullResponseBody;
  statusCode;
  operationMessage;
  enabled;
  processing;

  constructor(private tdcService: TdcserviceService) {
  }

  public ngOnChanges(changes: SimpleChanges) {
    this.operationMessage = null;
    const formGroup = {};
    for (let eachFormObject of this.formObjects) {
      formGroup[eachFormObject.controlName] = new FormControl('', this.mapValidators(eachFormObject.validation));
    }
    this.dynamicform = new FormGroup(formGroup, this.mapGroupValidators(this.groupValidators));
    this.isFormReady = true;
  }

  ngOnInit() {
    this.operationMessage = null;
    const formGroup = {};
    for (let eachFormObject of this.formObjects) {
      formGroup[eachFormObject.controlName] = new FormControl('', this.mapValidators(eachFormObject.validation));
    }
    this.dynamicform = new FormGroup(formGroup, this.mapGroupValidators(this.groupValidators));
    this.isFormReady = true;
  }

  mapValidators(validators) {
    const formValidators = [];
    if (validators) {
      for (const validation of Object.keys(validators)) {
        if (validation === 'required') {
          formValidators.push(Validators.required);
        } else if (validation === 'futureDateForbidden') {
          formValidators.push(CustomTDCValidator.futureDateValidator);
        }
      }
    }
    return formValidators;
  }

  mapGroupValidators(validators) {
    const groupValidators = [];
    if (validators) {
      for (const validation of Object.keys(validators)) {
        if (validation === 'fromDateLessThanToDate') {
          groupValidators.push(CustomTDCValidator.fromAndToDate);
        }
      }
    }
    return groupValidators;
  }

  onSubmit() {
    this.enabled = !this.enabled;
    this.processing = true;
    this.operationMessage = null;
    console.log(this.dynamicform);
    console.log(this.dynamicform.value);
    console.log(this.componentSelected);

     // this.tdcService.submitFormForCleanup(this.dynamicform.value, this.componentSelected);
    this.tdcService.postResource('/' + this.componentSelected, this.dynamicform.value).subscribe(
      response => {
        this.fullResponseBody = response.responseBody;
        this.statusCode = response.statusCode;
        this.operationMessage = this.fullResponseBody.operationMessage;
        this.enabled = false;
        this.processing = false;
      },
      (error: AppError) => {
        if (error instanceof BadInput) {
          this.dynamicform.setErrors(error.originalError);
        } else {
          throw error;
        }
      }
    );
  }

}
