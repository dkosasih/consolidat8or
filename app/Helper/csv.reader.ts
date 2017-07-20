import { Injectable } from '@angular/core';

@Injectable()
export class CsvReader {
    public readCsvData(data: File, includeHeader: boolean, callback: (res: any) => void): any {
        const reader = new FileReader();
        reader.onload = () => {
            let jsonObject = this.csvJSON(reader.result, includeHeader);
            callback(jsonObject);

        };
        reader.readAsText(data);
    }

    private csvJSON(csv: string, includeHeader: boolean = false) {
        var lines = csv.split("\n");
        var defaultAlphabetMap = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        var result = [];
        var headers = lines[0].split(",");

        for (var i = 1; i < lines.length; i++) {
            var obj = {};
            var currentline = lines[i].split(",");

            for (var j = 0; j < headers.length; j++) {
                if (includeHeader) {
                    if (headers[j] && headers[j] !== "") {
                        obj[includeHeader ? headers[j] : defaultAlphabetMap[j]] = currentline[j];
                    }
                } else {
                    obj[includeHeader ? headers[j] : defaultAlphabetMap[j]] = currentline[j];
                }
            }
            result.push(obj);
        }
        return (result); //JSON
    }

}