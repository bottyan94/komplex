import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-profile-dropdown',
  templateUrl: './profile-dropdown.component.html',
  styleUrls: ['./profile-dropdown.component.scss']
})
export class ProfileDropdownComponent implements OnInit {
  isOpened = false;
  user;
  constructor(private service: AuthService, private router: Router) { }

  ngOnInit() {
    this.service.getUser().subscribe(res => this.user = res)
  }
  logout() {
    this.service.logout()
  }
}
