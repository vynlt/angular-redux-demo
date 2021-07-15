import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreateNewComponent } from './form-create-new.component';

describe('FormCreateNewComponent', () => {
  let component: FormCreateNewComponent;
  let fixture: ComponentFixture<FormCreateNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCreateNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCreateNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
