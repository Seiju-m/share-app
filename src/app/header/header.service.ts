import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  public title: string;

  constructor() { 
    this.title = localStorage.getItem('title') || '買うものリスト';
  }

  setTitle(text: string) {
    this.title = text || '買うものリスト';
  }

  getMessege() {
    return this.title;
  }
}
