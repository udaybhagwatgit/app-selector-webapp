export class TdcModel {
    labelName: string;
    fieldType: string;
    controlName: string;
    fieldValues: Iterable<Map<string, string>>;
    validation: Map<string, boolean>;
}
