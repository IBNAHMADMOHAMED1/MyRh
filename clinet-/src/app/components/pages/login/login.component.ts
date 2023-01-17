import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/services/account/account.service';
import { Alert, AlertType } from 'src/app/interfaces/alert';
import { AlertService } from 'src/app/services/alert/alert.service';
import {Message, MessageService, PrimeNGConfig} from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  emailError: boolean
  passwordError: boolean
  alert: Alert;
  isError = false;
  msgs1: Message[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(2)]],
      who: [false]
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    const payload = {
      email: this.form.value.email,
      password: this.form.value.password,
      type: this.form.value.who ? "agent" : "company"
    }
    this.loading = true;
    this.accountService.login(payload)
      .subscribe(
        (response) => {
        this.loading = false;
        if (response.success) {
          this.router.navigate([this.returnUrl]);
        } else {
            //  this.messageService.add({ severity: 'warn', summary: 'Service Message', detail: 'Via MessageService' });
          }
        },
        (error) => {
          this.isError = true;
            setTimeout(() => {
        this.isError = false;
      }, 5000);
      });
  }

}
