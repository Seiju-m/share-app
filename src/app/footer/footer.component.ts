import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HeaderService } from '../header/header.service'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private router: Router, private header: HeaderService) { }

  ngOnInit(): void {
  }

  clickItem( title) {
    this.header.setTitle(title);
    localStorage.setItem('title', title);
    // this.router.navigateByUrl(url);
  }

}
