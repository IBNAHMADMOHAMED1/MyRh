import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/services/account/account.service';
import { Alert, AlertType } from 'src/app/interfaces/alert';
import { AlertService } from 'src/app/services/alert/alert.service';
import { Message, MessageService, PrimeNGConfig } from 'primeng/api';
import { Company } from 'src/app/interfaces/company';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [MessageService]
})
export class SignupComponent implements OnInit {


  form: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  alert: Alert;
  isError = false;
  msgs1: Message[] = [];
  file: File;
  


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
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', [Validators.required, Validators.minLength(2)]],
      phoneNumber: ['', [Validators.required, Validators.minLength(2)]],
      address: ['', [Validators.required, Validators.minLength(2)]],
      image: ['', [Validators.required, Validators.max(5000000), this.imageDimensionValidator(400, 400)]],
    }, { validator: this.matchingPasswords('password', 'confirmPassword') });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup) => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ mismatchedPasswords: true });
      } else {
        confirmPassword.setErrors(null);
      }
    }
  }
  imageDimensionValidator(width: number, height: number): ValidatorFn {
    return (control: FormControl): { [key: string]: any } => {
        if (control.value) {
            let image = new Image();
            image.src = control.value;
            image.onload = () => {
                if (image.width !== width || image.height !== height) {
                    return {
                        dimension: `Image dimension should be ${width}x${height}`
                    };
                }
            };
        }
        return null;
    };
}

 onFileChange(event) {
   this.file = event.target.files[0];
  }
  


  get f() {
    return this.form.controls;
  }
  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      console.log(this.f.confirmPassword);
      return;
    }

    const image = this.form.get('image').value;
    const payload :Company  = {
      email: this.f.email.value,
      password: this.f.password.value,
      name: this.f.name.value,
      phoneNumber: this.f.phoneNumber.value,
      address: this.f.address.value,
      description: "description",
    }


    console.log(this.form.value);
    this.accountService.register(payload, this.file)
      .subscribe(
        (data) => {
          console.log("data", data);
        },
        (error) => {
          this.isError = true;
          console.log("error", error);
          setTimeout(() => {
            this.isError = false;
          }, 5000);
        });
    
  }

}
