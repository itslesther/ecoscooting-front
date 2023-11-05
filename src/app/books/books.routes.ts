import { Route } from "@angular/router";
import { BooksListComponent } from "./books-list/books-list.component";
import { BooksComponent } from "./books.component";

export default [{
  path: '',
  //THIS WILL LOAD FIRST SO NO NEED TO LAZY LOAD
  component: BooksComponent,
  children: [
    {
      path: '',
      title: 'Books',
      //THIS WILL LOAD FIRST SO NO NEED TO LAZY LOAD
      component: BooksListComponent,
    },
    {
      path: 'new',
      title: 'New Book',
      loadComponent: () => import('./books-details/books-details.component').then(mod => mod.BooksDetailsComponent)
      // component: BooksDetailsComponent
    },
    {
      path: 'edit/:id',
      title: 'Edit Book',
      loadComponent: () => import('./books-details/books-details.component').then(mod => mod.BooksDetailsComponent)
      // component: BooksDetailsComponent
    }
  ]
}] as Route[];