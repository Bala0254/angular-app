import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../user.model';
import { passwordValidator } from '../../validators/password.validator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-edit-user',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-edit-user.html',
  styleUrl: './add-edit-user.scss'
})
export class AddEditUser {
@Input() user: User | null = null;
  @Output() formSubmit = new EventEmitter<User>();

  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, passwordValidator()]],
      role: ['', Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes?.['user'] && this.user) {
      this.userForm.patchValue({
        name: this.user.name,
        email: this.user.email,
        role: this.user.role,
        password: '' // Password is optional on edit or needs reset
      });

      // Password optional if editing
      this.userForm.get('password')?.clearValidators();
      this.userForm.get('password')?.updateValueAndValidity();
    }
  }

  onSubmit() {
    if (this.userForm.invalid) return;

    const formValue = this.userForm.value;

    const submitUser: User = {
      id: this.user?.id || 0,
      name: formValue.name,
      email: formValue.email,
      role: formValue.role,
      password: formValue.password
    };

    this.formSubmit.emit(submitUser);
  }
}
