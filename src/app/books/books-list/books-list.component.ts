import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from 'src/app/interfaces';
import { BooksService } from '../books.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-books-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
})
export class BooksListComponent {
  books!: Book[];
  isLoading!: boolean;
  isDeleting!: boolean;

  constructor(private booksService: BooksService) {}

  async ngOnInit() {
    this.isLoading = true;

    try {
      this.books = await this.booksService.findAll();
    } catch (error: any) {
      alert(error.message);
    }

    this.isLoading = false;
  }

  async deleteBook(props: { id: number }) {
    this.isDeleting = true;

    try {
      const response = await this.booksService.delete(props);
      console.log(response);
      this.books = this.books.filter((book) => book.id !== props.id);
    } catch (error: any) {
      alert(error.message);
    }

    this.isDeleting = false;
  }
}
