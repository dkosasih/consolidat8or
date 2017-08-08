import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { GtConfig } from 'angular-generic-table/@angular-generic-table/core';
import { FileUploader, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';
import { DragulaService } from 'ng2-dragula';

import { TableSettingService } from 'services/Table.Setting.Service';
import { Transaction } from 'dto/transaction';
import { MappedColumnsService } from 'services/mappedColumns.data.service';

import 'components/upload/upload.component.less'
import 'angular-generic-table/@angular-generic-table/core/generic-table.scss'

@Component({
    selector: 'upload-csv',
    templateUrl: './upload.component.html',
    styleUrls: ['../../styles/fileUpload.css',
        '../../../node_modules/dragula/dist/dragula.min.css']
})
export class UploadComponent implements OnInit {
    private transaction: Transaction = new Transaction();

    uploader: FileUploader;
    hasBaseDropZoneOver: boolean = false;
    uploadedCsvColumns: Array<string>;
    isCsvHasHeader: boolean;
    mappableColumns: Array<string>;
    file: File;
    configObject: GtConfig<any> = { settings: [], fields: [], data: [] };

    constructor(
        private router: Router,
        private tableSettingService: TableSettingService,
        private dragulaService: DragulaService,
        private datePipe: DatePipe,
        public mappedColumns: MappedColumnsService) {
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

    private setupPreviewTableData(json: any) {
        this.configObject = this.tableSettingService.ConstructTableSettingData(json);
       this.configObject.data= this.configObject.data.slice(0,3);
    }

    private bindDataFromFile(data: File, hasHeader: boolean) {
        this.uploadedCsvColumns = [];
        let jsonObject: any;

        this.tableSettingService.ReadJsonFromFile(data, hasHeader).subscribe(result => {
            jsonObject = result;
            this.uploadedCsvColumns = Object.keys(jsonObject[0]).reduce((prev: any, curr: any, index: number) => {
                prev.push(curr);
                return prev;
            }, []);

            if (this.mappableColumns.length > this.uploadedCsvColumns.length) {
                for (let i = 0; i <= (this.mappableColumns.length - this.uploadedCsvColumns.length); i++) {
                    this.uploadedCsvColumns.push("Empty_" + i);
                }
            }

            this.file = data;
            this.setupPreviewTableData(jsonObject);
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

    public Next() {
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