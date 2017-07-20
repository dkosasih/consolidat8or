import { Component, OnInit, Input } from '@angular/core';
import { Transaction } from '../../DTO/transaction';
import { MappedColumnsService } from '../../services/mappedColumns.service';
import { Router } from '@angular/router';

@Component({
    selector: 'preview',
    templateUrl: 'app/components/preview/preview.component.html'
})
export class PreviewComponent implements OnInit {
    constructor(
        public router: Router,
        public mappedColumns: MappedColumnsService) {
    }

    ngOnInit(){
        if (!this.mappedColumns.getMappedColumns()){
            this.router.navigateByUrl("/welcome");
        }
    }
}