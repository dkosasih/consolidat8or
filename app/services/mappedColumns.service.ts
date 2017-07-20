import {Injectable} from '@angular/core'

@Injectable()
export class MappedColumnsService {
    private uploadedCsvColumns:Array<string>;

    getMappedColumns(){
        return this.uploadedCsvColumns;
    }

    public setMappedColumns(mappedColumns:Array<string>){
        this.uploadedCsvColumns = mappedColumns;
    }
}