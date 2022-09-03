import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HeaderService } from '../header/header.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private header: HeaderService) { }

  ngOnInit(): void {
    this.header.setTitle('買うものリスト');
  }

  clickCard(url, title) {
    this.header.setTitle(title);
    localStorage.setItem('title', title);
    this.router.navigateByUrl(url);
  }

}
