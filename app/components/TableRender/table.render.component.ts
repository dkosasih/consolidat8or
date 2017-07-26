import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Transaction } from '../../dto/transaction';
import { IUser } from '../../dto/user'
import { ITransactionAccount } from '../../dto/transactionAccount'
import { ITag } from '../../dto/tag'
import { ITransactionType } from '../../dto/transactionType'

import {List} from '../../helper/collection'

@Component({
    selector: 'table-render',
    templateUrl: 'app/components/TableRender/table.render.component.html'
})
export class TableRenderComponent{
    @Input() transactions: List<any>;
}