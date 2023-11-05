import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-books-new',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './books-new.component.html',
  styleUrls: ['./books-new.component.scss'],
})
export class BooksNewComponent {
  booksForm = this.fb.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
    publicationDate: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private booksService: BooksService) {}

  public invalidField(formControlName: string) {
    const field = this.booksForm.get(formControlName);
    return field && field.invalid && (field.dirty || field.touched);
  }

  async onSubmit() {
    console.log(this.booksForm.value);
    if (!this.booksForm.valid) return this.booksForm.markAllAsTouched();

    try {
      const response = await this.booksService.create(this.booksForm.value);
      console.log(response);
    } catch (error: any) {
      alert(error.message);
    }
  }
}
