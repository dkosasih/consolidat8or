import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/pluck';

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

    private jsonToTransaction(transactions: any, json: any, index: number) {
        if (!this.allEmptyOrNull(json)) {
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

            transactions.add(transaction);
        }
         return transactions;
    }

    ngOnInit() {
        if (!this.mappedColumns.getMappedColumns() || !this.mappedColumns.getUploadedResult()) {
            this.router.navigateByUrl("/welcome");
        } else {
             this.transactions = this.mappedColumns.getUploadedResult().reduce(this.jsonToTransaction.bind(this), new List<Transaction>());
        }

         //Observable.from<Array<Transaction>>(this.transactions.items()).pluck('TransactionDate').subscribe(bla=>{console.log(bla);});
    }
}