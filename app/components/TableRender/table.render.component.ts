import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Transaction } from '../../DTO/transaction';
import { IUser } from '../../DTO/user'
import { ITransactionAccount } from '../../DTO/transactionAccount'
import { ITag } from '../../DTO/tag'
import { ITransactionType } from '../../DTO/transactionType'

@Component({
    selector: 'table-render',
    templateUrl: 'app/components/TableRender/table.render.component.html'
})
export class TableRenderComponent{
    @Input() transactions: Array<Transaction>;
}