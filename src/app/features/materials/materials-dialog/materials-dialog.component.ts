import { Component, inject, model, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialItem } from '../../../models/material-item';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MaterialsStore } from '../materials.store';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-materials-dialog',
  templateUrl: './materials-dialog.component.html',
  styleUrls: ['./materials-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ColorPickerModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
})
export class MaterialsDialogComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<MaterialsDialogComponent>);
  readonly data = inject<MaterialItem>(MAT_DIALOG_DATA);
  readonly store = inject(MaterialsStore);
  fb = inject(FormBuilder);
  form!: FormGroup;
  submitted = false;
  newItem: MaterialItem = {} as MaterialItem;

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      color: ['#000000', Validators.required],
      tagDescription: ['', [Validators.required]],
    });
  }

  get f() {
    return this.form.controls;
  }

  onSave() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    const date = new Date();
    this.newItem.createdDate = date;
    this.newItem.lastUpdate = date;
    this.newItem.createdBy = 'Mark Shmechzur';
    this.newItem = { ...this.newItem, ...this.form.value };
    this.store.addItem(this.newItem);
    this.dialogRef.close();
  }

  resetForm(): void {
    this.submitted = false;
    this.form.reset({
      name: '',
      color: '#000000',
      tagDescription: '',
    });

    Object.keys(this.form.controls).forEach((key) => {
      const control = this.form.get(key);
      control?.markAsPristine();
      control?.markAsUntouched();
    });
  }

  onColorChange(color: string): void {
    this.form.patchValue({
      color: color,
    });
    this.form.get('color')?.markAsDirty();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClose() {
    this.dialogRef.close();
    this.resetForm();
  }
}
