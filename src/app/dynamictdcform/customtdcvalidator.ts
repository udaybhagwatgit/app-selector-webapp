import { AbstractControl, ValidationErrors, FormGroup, FormControl } from '@angular/forms';


export class CustomTDCValidator {

    static futureDateValidator(control: AbstractControl): ValidationErrors | null {
        const date: string = control.value;
        const dateSplit: string[] = date.split('-');
        const dateFromUI = new Date(+dateSplit[0], (+dateSplit[1] - 1), +dateSplit[2]);
        const currentDate = new Date();

        if (dateFromUI > currentDate) {
            return {
                futureDateForbidden : true
            };
        }
        return null;
    }

    static fromAndToDate(control: AbstractControl) {
        const fromDate: string = control.get('fromDate').value;
        const toDate: string = control.get('toDate').value;
        const dateSplitOne: string[] = fromDate.split('-');
        const dateSplitTwo: string[] = toDate.split('-');
        const fromDateUI = new Date(+dateSplitOne[0], (+dateSplitOne[1] - 1), +dateSplitOne[2]);
        const toDateUI = new Date(+dateSplitTwo[0], (+dateSplitTwo[1] - 1), +dateSplitTwo[2]);
        if (fromDateUI > toDateUI) {
            return  {
                fromDateLessThanToDate : true
            };
        }
        return null;
    }
}

