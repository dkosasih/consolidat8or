import { IUser } from './user'
import { ITransactionAccount } from './transactionAccount'
import { ITag } from './tag'
import { ITransactionType } from './transactionType'

export interface ITransaction{
    Id: number;
    EnteredDate: string;
    EnteredBy: IUser;
    TransactionDate: string;
    TransactionDateOverride: string;
    TransactionType: ITransactionType;
    AccountReference: ITransactionAccount;
    AccountAffected: ITransactionAccount;
    Tag: ITag;
    Description: string;
    Value: PaymentCurrencyAmount;
}

export class Transaction implements ITransaction {
    Id: number = undefined;
    EnteredDate: string = undefined;
    EnteredBy: IUser = undefined;
    TransactionDate: string = undefined;
    TransactionDateOverride: string = undefined;
    TransactionType: ITransactionType = undefined;
    AccountReference: ITransactionAccount = undefined;
    AccountAffected: ITransactionAccount = undefined;
    Tag: ITag = undefined;
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
