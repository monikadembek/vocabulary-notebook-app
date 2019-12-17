import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(public auth: AuthService) { }

  user;

  ngOnInit() {
    this.user = this.auth.user$.subscribe(data => this.user = data);
  }

}
