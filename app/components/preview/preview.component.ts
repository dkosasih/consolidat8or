import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Transaction } from '../../DTO/transaction';
import { IUser } from '../../DTO/user'
import { ITransactionAccount } from '../../DTO/transactionAccount'
import { ITag } from '../../DTO/tag'
import { ITransactionType } from '../../DTO/transactionType'

import { MappedColumnsService } from '../../services/mappedColumns.service';

@Component({
    selector: 'preview',
    templateUrl: 'app/components/preview/preview.component.html'
})
export class PreviewComponent implements OnInit {
    constructor(
        public router: Router,
        public mappedColumns: MappedColumnsService) {
    }

    public transactions: Array<Transaction> = [];

    private getMappedColumnByMappableColumnName(columnName: string): string {
        return this.mappedColumns.getMappedColumns()[new Transaction().getMappableColumns().indexOf(columnName)]
    }

    ngOnInit() {
        console.log("ll", this.mappedColumns.getUploadedResult());
        console.log("hh", this.mappedColumns.getUploadedResult());
        console.log("nn", this.mappedColumns.getMappedColumns());
        console.log("ii", this.mappedColumns.getMappedColumns());
        if (!this.mappedColumns.getMappedColumns() || !this.mappedColumns.getUploadedResult()) {
            this.router.navigateByUrl("/welcome");
        }

        if (this.mappedColumns.getMappedColumns() && this.mappedColumns.getUploadedResult()) {
            this.mappedColumns.getUploadedResult().forEach((item: any, index: number) => {
                let transaction = new Transaction();

                transaction.Id = 1;
                transaction.EnteredDate = new Date().toDateString();
                transaction.EnteredBy = { Id: 1, username: "dkosasih" };

                transaction.TransactionDate = item[this.getMappedColumnByMappableColumnName("TransactionDate")];

                if (this.getMappedColumnByMappableColumnName("TransactionType").indexOf("Empty") === -1) {
                    transaction.TransactionType = {
                        Id: index,
                        Name: item[this.getMappedColumnByMappableColumnName("TransactionType")],
                        Code: item[this.getMappedColumnByMappableColumnName("TransactionType")]
                    };
                }

                if (this.getMappedColumnByMappableColumnName("Tag").indexOf("Empty") === -1) {
                    transaction.Tag = {
                        Id: index,
                        Name: item[this.getMappedColumnByMappableColumnName("Tag")],
                        Code: item[this.getMappedColumnByMappableColumnName("Tag")]
                    };
                }

                if (this.getMappedColumnByMappableColumnName("Description").indexOf("Empty") === -1) {
                    transaction.Description = this.getMappedColumnByMappableColumnName("Description")
                }

                if (this.getMappedColumnByMappableColumnName("Value").indexOf("Empty") === -1) {
                    transaction.Value = { value: this.getMappedColumnByMappableColumnName("Value") };
                }

                this.transactions.push(transaction);
            });
        }
    }
}