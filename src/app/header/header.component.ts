import { Component, OnInit } from '@angular/core';
import { HeaderService } from './header.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user$ = this.auth.user$;

  constructor(public header: HeaderService, private auth: AuthService) { 
  }

  ngOnInit(): void {
  }

  logout() {
    this.auth.logout();
  }

}
