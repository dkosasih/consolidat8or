import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Transaction } from '../../DTO/transaction';
import { IUser } from '../../DTO/user'
import { ITransactionAccount } from '../../DTO/transactionAccount'
import { ITag } from '../../DTO/tag'
import { ITransactionType } from '../../DTO/transactionType'
import { List } from '../../helper/collection'

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

    public transactions: List<Transaction> = new List<Transaction>();

    private getMappedColumnByMappableColumnName(columnName: string): string {
        return this.mappedColumns.getMappedColumns()[new Transaction().getMappableColumns().indexOf(columnName)]
    }

    private allEmptyOrNull(object: any) {
        for (var i in object) {
            if (!object[i] || object[i] !== null || object[i] !== "") return false;
        }
        return true;
    }

    private jsonToTransaction(json: any, index: number): Transaction {
        let transaction = new Transaction();

        transaction.Id = index;
        transaction.EnteredDate = new Date();
        transaction.EnteredBy = { Id: 1, username: "dkosasih" };

        transaction.TransactionDate = json[this.getMappedColumnByMappableColumnName("TransactionDate")];

        for (let columnName in transaction.getMappableColumns()) {
            if (this.mappedColumns.getMappedColumns()[columnName].indexOf("Empty") === -1) {
                transaction[columnName] = {
                    Id: index,
                    Name: json[this.mappedColumns.getMappedColumns()[columnName]],
                    Code: json[this.mappedColumns.getMappedColumns()[columnName]]
                };
            }
        }

        return transaction;
    }

    ngOnInit() {
        if (!this.mappedColumns.getMappedColumns() || !this.mappedColumns.getUploadedResult()) {
            this.router.navigateByUrl("/welcome");
        }

        if (this.mappedColumns.getMappedColumns() && this.mappedColumns.getUploadedResult()) {
            console.log(this.mappedColumns.getUploadedResult());
            this.mappedColumns.getUploadedResult().forEach((item: any, index: number) => {
                if (!this.allEmptyOrNull(item)) {
                    this.transactions.add(this.jsonToTransaction(item, index));
                }
            });
        }
    }
}