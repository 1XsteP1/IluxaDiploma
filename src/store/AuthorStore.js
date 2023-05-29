import { makeAutoObservable } from 'mobx';

export default class AuthorStore {
  constructor() {
    this._authors = {};
    makeAutoObservable(this);
  }

  setAuthors(authors) {
    this._authors = authors;
  }

  get authors() {
    return this._authors;
  }
}
