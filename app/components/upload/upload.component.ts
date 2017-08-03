import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { GtConfig } from 'angular-generic-table/@angular-generic-table/core';
import { FileUploader, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';
import { DragulaService } from 'ng2-dragula';   
import { CsvReader } from '../../helper/csv.reader';
import { Transaction } from '../../DTO/transaction';
import { MappedColumnsService } from '../../services/mappedColumns.service';

import './upload.component.less'
import '../../../node_modules/angular-generic-table/@angular-generic-table/core/generic-table.scss'

@Component({
    selector: 'upload-csv',
    templateUrl: './upload.component.html',
    styleUrls: ['../../styles/fileUpload.css',
        '../../../node_modules/dragula/dist/dragula.min.css'],
    providers: [CsvReader]
})
export class UploadComponent implements OnInit {
    private transaction: Transaction = new Transaction();

     @ViewChild('myTable') genericTable : any;
    uploader: FileUploader;
    hasBaseDropZoneOver: boolean = false;
    uploadedCsvColumns: Array<string>;
    isCsvHasHeader: boolean;
    mappableColumns: Array<string>;
    file: File;
    configObject: GtConfig<any> = { settings: [], fields: [], data: [] };

    constructor(
        private router: Router,
        private dragulaService: DragulaService,
        private csvReader: CsvReader,
        private datePipe: DatePipe,
        public mappedColumns: MappedColumnsService) {
        dragulaService.dropModel.subscribe((value: any) => {
            this.onDropModel(value.slice(1));
        });
        dragulaService.removeModel.subscribe((value: any) => {
            this.onRemoveModel(value.slice(1));
        });

        // this.configObject = {
        //     settings: [{
        //         objectKey: 'id',
        //         sort: 'asc',
        //         sortOrder: 1,
        //         columnOrder: 0
        //     }, {
        //         objectKey: 'name',
        //         sort: 'asc',
        //         sortOrder: 0,
        //         columnOrder: 1
        //     }, {
        //         objectKey: 'date',
        //         sort: 'enable',
        //         columnOrder: 2,
        //         visible: true
        //     }],
        //     fields: [{
        //         name: 'Id',
        //         objectKey: 'id'
        //     }, {
        //         name: 'Name',
        //         objectKey: 'name'
        //     }, {
        //         name: 'date',
        //         objectKey: 'date',
        //         render: (so: any) => `${this.datePipe.transform(so.date, 'dd/MM/yyyy')}`,
        //         stackedHeading: 'Custom heading'
        //     }],
        //     data: [{
        //         'id': 1,
        //         'name': 'Anna',
        //         'date': new Date()
        //     }, {
        //         'id': 2,
        //         'name': 'Julie',
        //         'date': new Date()
        //     }, {
        //         'id': 3,
        //         'name': 'Lillian',
        //         'date': new Date()
        //     }, {
        //         'id': 4,
        //         'name': 'Norma',
        //         'date': new Date()
        //     }, {
        //         'id': 5,
        //         'name': 'Ralph',
        //         'date': new Date()
        //     }]
        // };
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
        //reset table field
        let localConfigObject:GtConfig<any> = { settings: [], fields: [], data: [] };

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
        for (let i = 0; i < (json.length < 4 ? json.length : 3); i++) {
            let tempObject: any = {};
            localConfigObject.settings.forEach((item: any) => {
                tempObject[item.objectKey] = json[i][item.objectKey];
            });
            localConfigObject.data.push(tempObject);
        }
        this.configObject = localConfigObject;
    }

    private bindDataFromFile(data: File, hasHeader: boolean) {
        this.csvReader.readCsvData(data, hasHeader, (result) => {
            this.uploadedCsvColumns = [];
            let jsonObject = result;

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