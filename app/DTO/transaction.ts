import { User } from './user'
import { TransactionAccount } from './transactionAccount'
import { Tag } from './tag'
import { TransactionType } from './transactionType'

export interface ITransaction{
    Id: number;
    EnteredDate: Date;
    EnteredBy: User;
    TransactionDate: Date;
    TransactionDateOverride: Date;
    TransactionType: TransactionType;
    AccountReference: TransactionAccount;
    AccountAffected: TransactionAccount;
    Tag: Tag;
    Description: string;
    Value: PaymentCurrencyAmount;
}

export class Transaction {
    Id: number = undefined;
    EnteredDate: Date = undefined;
    EnteredBy: User = undefined;
    TransactionDate: Date = undefined;
    TransactionDateOverride: Date = undefined;
    TransactionType: TransactionType = undefined;
    AccountReference: TransactionAccount = undefined;
    AccountAffected: TransactionAccount = undefined;
    Tag: Tag = undefined;
    Description: string = undefined;
    Value: PaymentCurrencyAmount = undefined;

    getMappableColumns() {
        return ['TransactionDate',
            'TransactionType',
            'Tag',
            'Description',
            'Value'
        ]
    }
}
