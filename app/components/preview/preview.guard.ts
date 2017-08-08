import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MappedColumnsService } from 'services/mappedColumns.data.service';

@Injectable()
export class PreviewGuard implements CanActivate {

    constructor(private mappedColumns: MappedColumnsService,private router:Router) { 
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        if (!this.mappedColumns.getMappedColumns() || !this.mappedColumns.getUploadedResult()) {
            this.router.navigateByUrl("/upload");
            return false;
        }
        return true;
    }
}
