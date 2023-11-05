import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BooksService } from '../books.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Book } from 'src/app/interfaces';

@Component({
  selector: 'app-books-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './books-details.component.html',
  styleUrls: ['./books-details.component.scss'],
})
export class BooksDetailsComponent {
  booksForm = this.fb.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
    publicationDate: ['', Validators.required],
  });

  isLoading!: boolean;
  isSaving!: boolean;
  bookId!: number;

  constructor(
    private fb: FormBuilder,
    private booksService: BooksService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit() {
    this.route.paramMap.subscribe(async (params) => {
      this.bookId = Number(params.get('id'));

      this.isLoading = true;

      if (this.bookId) {
        try {
          const book = await this.booksService.findOne({ id: this.bookId });
          console.log(book);
          this.booksForm.patchValue(book);
        } catch (error: any) {
          alert(error.message);
        }
      }

      this.isLoading = false;
    });
  }

  public invalidField(formControlName: string) {
    const field = this.booksForm.get(formControlName);
    return field && field.invalid && (field.dirty || field.touched);
  }

  async onSubmit() {
    console.log(this.booksForm.value);
    if (!this.booksForm.valid) return this.booksForm.markAllAsTouched();

    this.isSaving = true;

    try {
      let response!: Book;

      if (this.bookId) {
        response = await this.booksService.update({
          ...this.booksForm.value,
          id: this.bookId,
        });
      } else {
        response = await this.booksService.create(this.booksForm.value);
      }
      console.log(response);

      this.router.navigate(['/books']);

    } catch (error: any) {
      alert(error.message);
    }

    this.isSaving = false;
  }
}
