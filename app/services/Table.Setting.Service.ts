import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Rx'
import { GtConfig } from 'angular-generic-table/@angular-generic-table/core';
import { CsvReader } from 'services/csv.reader.service'

@Injectable()
export class TableSettingService {
    _csvReader: CsvReader;

    constructor(private csvReader: CsvReader) {
        this._csvReader = csvReader
    }

    public ReadJsonFromFile(data: File, hasHeader: boolean): Observable<any> {
        return new Observable((observer: any) => {
            this.getData(data, hasHeader, observer);
        });
    }

    public ConstructTableSettingData(json: any): GtConfig<any> {
        let localConfigObject: GtConfig<any> = { settings: [], fields: [], data: [] };

        Object.keys(json[0]).reduce((prev: any, curr: any, index: number) => {
            prev.push(curr);

            // setting setup
            localConfigObject.settings.push({ objectKey: curr, columnOrder: index, sort: 'enable' });

            // fields setup
            localConfigObject.fields.push({
                name: curr,
                objectKey: curr
            });

            return prev;
        }, []);

        // Data Sample
        for (let i = 0; i < json.length - 1; i++) {
            let tempObject: any = {};
            localConfigObject.settings.forEach((item: any) => {
                tempObject[item.objectKey] = json[i][item.objectKey];
            });
            localConfigObject.data.push(tempObject);
        }

        return localConfigObject;
    }

    private getData(data: File, hasHeader: boolean, observer: any) {
        this._csvReader.readCsvData(data, hasHeader, (result) => observer.next(result));
    }

}
