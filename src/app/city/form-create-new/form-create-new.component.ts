import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { add, decrement, reset } from '../city.actions';

@Component({
  selector: 'app-form-create-new',
  templateUrl: './form-create-new.component.html',
  styleUrls: ['./form-create-new.component.less']
})
export class FormCreateNewComponent implements OnInit {
  @Input() isVisible: boolean;
  @Output() visibleChange = new EventEmitter<any>();

  validateForm!: FormGroup;
  constructor(private fb: FormBuilder, private store: Store<any>) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      city: [null],
      code: [null],
    });
  }

  submitForm(): void {
    this.store.dispatch(add(this.validateForm.value));
  }

  handleOk(): void {
    this.submitForm();
    this.visibleChange.emit(false);
  }

  handleCancel(): void {
    this.visibleChange.emit(false);
  }

}
