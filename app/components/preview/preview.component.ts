import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { Transaction } from 'dto/transaction';
import { IUser } from 'dto/user'
import { ITransactionAccount } from 'dto/transactionAccount'
import { ITag } from 'dto/tag'
import { ITransactionType } from 'dto/transactionType'
import { List } from 'helper/collection'

import { MappedColumnsService } from 'services/mappedColumns.data.service';

@Component({
    selector: 'preview',
    templateUrl: './preview.component.html'
})
export class PreviewComponent implements OnInit {
    constructor(
        private router: Router,
        private mappedColumns: MappedColumnsService) {
    }

    public transactions: List<Transaction> = new List<Transaction>();

    private getMappedColumnByMappableColumnName(columnName: string): string {
        return this.mappedColumns.getMappedColumns()[new Transaction().getMappableColumns().indexOf(columnName)]
    }

    private allEmptyOrNull(object: any) {
        for (var i in object) {
            if (object[i] && object[i] !== null && object[i] !== "\r" && object[i] !== "") {
                return false;
            }
        }
        return true;
    }

    public Reset(){
        
    }
    private jsonToTransaction(transactions: any, json: any, index: number) {
        if (!this.allEmptyOrNull(json)) {
            let transaction = new Transaction();

            transaction.Id = index;
            transaction.EnteredDate = new Date();
            // TODO: get the real logged in username 
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

            transactions.add(transaction);
        }
        return transactions;
    }

    ngOnInit() {
        this.transactions = this.mappedColumns.getUploadedResult().reduce(this.jsonToTransaction.bind(this), new List<Transaction>());

        Observable.from<Array<Transaction>>(this.transactions.items()).pluck('TransactionDate').subscribe(bla => { console.log(bla); });
    }
}