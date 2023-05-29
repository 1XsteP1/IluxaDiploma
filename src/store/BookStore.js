import { makeAutoObservable } from 'mobx';

export default class BookStore {
  constructor() {
    this._books = {};
    makeAutoObservable(this);
  }

  setBooks(books) {
    this._books = books;
  }

  get books() {
    return this._books;
  }
}
