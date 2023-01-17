import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-invalid-feedback',
  templateUrl: './invalid-feedback.component.html',
  styleUrls: ['./invalid-feedback.component.scss']
})
export class InvalidFeedbackComponent implements OnInit {

  @Input() control;
  @Input() label:string;

  constructor() { }

  ngOnInit(): void {
  }

}
