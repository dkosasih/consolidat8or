import { Component, OnInit, Input } from '@angular/core';
import { FileUploader, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';
import { DragulaService } from 'ng2-dragula';
import { CsvReader } from '../../helper/csv.reader';
import { Transaction } from '../../DTO/transaction';
import { MappedColumnsService } from '../../services/mappedColumns.service';
import { Router } from '@angular/router';

import './upload.component.less'

@Component({
    selector: 'upload-csv',
    templateUrl: 'app/components/upload/upload.component.html',
    styleUrls: ['app/styles/fileUpload.css',
        'node_modules/dragula/dist/dragula.min.css'],
    providers: [CsvReader]
})
export class UploadComponent implements OnInit {
    private transaction: Transaction = new Transaction();

    uploader: FileUploader;
    hasBaseDropZoneOver: boolean = false;
    uploadedCsvColumns: Array<string>;
    isCsvHasHeader: boolean;
    mappableColumns: Array<string>;
    file: File;

    constructor(
        private router: Router,
        private dragulaService: DragulaService,
        private csvReader: CsvReader,
        private mappedColumns: MappedColumnsService) {
        dragulaService.dropModel.subscribe((value: any) => {
            this.onDropModel(value.slice(1));
        });
        dragulaService.removeModel.subscribe((value: any) => {
            this.onRemoveModel(value.slice(1));
        });
    }

    private onDropModel(args: any) {
        let [el, target, source] = args;
    }

    private onRemoveModel(args: any) {
        let [el, source] = args;
    }

    private cleanFileName() {
        (<HTMLInputElement>document.getElementById("singleUploader")).value = null;
    }

    private addBlank() {
        this.uploadedCsvColumns.push("Empty_" + (Math.floor(Math.random() * 100) + 1).toString());
    }

    private bindDataFromFile(data: File, hasHeader: boolean) {
        this.csvReader.readCsvData(data, hasHeader, (result) => {
            this.uploadedCsvColumns = [];
            let jsonObject = result;

            for (let key in jsonObject[0]) {
                this.uploadedCsvColumns.push(key);
            }

            if (this.mappableColumns.length > this.uploadedCsvColumns.length) {
                for (let i = 0; i <= (this.mappableColumns.length - this.uploadedCsvColumns.length); i++) {
                    this.uploadedCsvColumns.push("Empty_" + i);
                }
            }

            this.file = data;
            this.mappedColumns.setUploadedResult(jsonObject);
        });
    }

    public fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }

    public onRemoveClick(item: any) {
        this.uploadedCsvColumns = this.uploadedCsvColumns.filter(f => { return f != item; });
    }

    public rebindColumn() {
        if (this.file) {
            this.bindDataFromFile(this.file, !this.isCsvHasHeader);
        }
    }

    public createTableBasedOnMapping() {
        this.mappedColumns.setMappedColumns(this.uploadedCsvColumns);
        this.router.navigateByUrl('/tablepreview');
    }

    ngOnInit() {
        this.uploader = new FileUploader({
            url: '',
            allowedMimeType: ['application/vnd.ms-excel']
        });

        this.mappableColumns = this.transaction.getMappableColumns();

        this.uploader.onAfterAddingFile = (f) => {
            if (this.uploader.queue.length > 1) {
                this.uploader.removeFromQueue(this.uploader.queue[0]);
            }
            this.cleanFileName();

this.bindDataFromFile(f._file, this.isCsvHasHeader);
          
        };

        this.uploader.onWhenAddingFileFailed = function (item, filter, options) {
            this.cleanFileName();
        };
    }
}