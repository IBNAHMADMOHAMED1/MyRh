import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { OfferService } from 'src/app/services/offer/offer.service';
import { EDUCAION_LEVEL, Localisation, CreateOffer } from 'src/app/interfaces/interfaces';
import { EDUCATION_LEVELS, LOCALISATIONS } from 'src/app/util/constante';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-form-offer',
  templateUrl: './form-offer.component.html',
  styleUrls: ['./form-offer.component.scss']
})
export class FormOfferComponent implements OnInit {
  // @Input() showForm = new EventEmitter<boolean>();

  offerForm: FormGroup;
  educations: EDUCAION_LEVEL[] = EDUCATION_LEVELS
  domains = ['IT', 'RH', 'Marketing', 'Finance', 'HR', 'Communication', 'Sales', 'Legal'];
  localisations: Localisation[] = LOCALISATIONS
  domainCtrl = new FormControl('')
  filteredDomains: Observable<string[]>;
  isErorr = false;
  isSuccess = false;

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.domains.filter(option => option.toLowerCase().includes(filterValue));
  }

  constructor(
    private formBuilder: FormBuilder,
    private offerService: OfferService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.offerForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['',[Validators.required, Validators.minLength(2)]],
      domain: ['', Validators.required],
      salary: [''],
      education_level: [''],
      localisation: ['']
    });
    // this.filteredDomains = this.domainCtrl.valueChanges.pipe(startWith(''),  map(value => this._filter(value || '')));
  }

  onSubmit() {
    if (this.offerForm.invalid) {
      return;
    }
    const payload : CreateOffer = {
      title: this.offerForm.value.title,
      description: this.offerForm.value.description,
      domain: this.offerForm.value.domain,
      salary: this.getSalary(this.offerForm.value.salary),
      education_level: this.offerForm.value.education_level,
      location: this.offerForm.value.localisation
    }
    console.log(payload);
    this.offerService.createOffer(payload).subscribe(
      (data) => {
        console.log(data);
        this.isErorr = !data.success;
        this.isSuccess = data.success;
      });
    
  }
  getSalary(value: number) {
    return value ? value + "dh" : "not specified"
  }

  onCancel() {
    // this.showForm.emit(false);
    
  }
}
