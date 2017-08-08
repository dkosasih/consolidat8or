import { Injectable } from '@angular/core'

@Injectable()
export class MappedColumnsService {
    private uploadedCsvColumns: Array<string>;
    private uploadedJsonObject: any;

    public getMappedColumns() {
        return this.uploadedCsvColumns;
    }

    public setMappedColumns(mappedColumns: Array<string>) {
        this.uploadedCsvColumns = mappedColumns;
    }

    public getUploadedResult() {
        return this.uploadedJsonObject;
    }

    public setUploadedResult(uploadedObject: any) {
        this.uploadedJsonObject = uploadedObject;
    }
}