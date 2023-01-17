import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableAdminComponent } from './data-table-admin.component';

describe('DataTableAdminComponent', () => {
  let component: DataTableAdminComponent;
  let fixture: ComponentFixture<DataTableAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataTableAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataTableAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
