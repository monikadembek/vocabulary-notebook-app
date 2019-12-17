import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../users/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  
  user: User;
  
  constructor(public auth: AuthService ) { }

  ngOnInit() {
    this.auth.user$.subscribe(
      data => this.user = data
    )
  }



}
