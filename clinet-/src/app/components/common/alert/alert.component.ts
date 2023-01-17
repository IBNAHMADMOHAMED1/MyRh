import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-alert',
  template: `
    <div [ngClass]="['alert', 'alert-' + type]" *ngIf="visible" style="display: flex; justify-content: space-between; align-items: center;">
     <strong>  {{ message }}  </strong> 

        <button 
        (click)="close()"
        type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>

    </div>
  `,
  styles: [`
    .alert {
      padding: 15px;
      margin-bottom: 20px;
      border: 1px solid transparent;
      border-radius: 4px;
    }
    .alert-success {
      background-color: #dff0d8;
      border-color: #d6e9c6;
      color: #3c763d;
    }
    .alert-danger {
      background-color: #f2dede;
      border-color: #ebccd1;
      color: #a94442;
    }
    .alert-warning {
      background-color: #fcf8e3;
      border-color: #faebcc;
      color: #8a6d3b;
    }
    .alert-info {
      background-color: #d9edf7;
      border-color: #bce8f1;
      color: #31708f;
    }
  `]
})
export class AlertComponent {
  @Input() message: string;
  @Input() type: 'success' | 'danger' | 'warning' | 'info' = 'info';
  visible = true;

  close() {
    this.visible = false;
  }
}
