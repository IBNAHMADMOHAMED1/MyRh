import { Injectable } from '@angular/core';

import { Subject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Alert, AlertType } from '../../interfaces/alert';

@Injectable({
  providedIn: 'root'
})
  
export class AlertService {
    private subject = new Subject<Alert>();
    showViaServiceWarn() : Observable < Alert > {
        return this.subject.asObservable();
    }
    onAlert(alert: Alert) {
        this.subject.next(alert);
    }
    
}
