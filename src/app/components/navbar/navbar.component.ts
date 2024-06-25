import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SignOutService } from '../../services/sign-out.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit, OnChanges {
  userName: string = '';
  userProfilePhoto: string = '';
  userEmail: string = '';
  // toggle: boolean = false;

  constructor(private logOut: SignOutService) {}
  ngOnChanges(changes: SimpleChanges): void {}

  fetchUserData() {
    if (sessionStorage.getItem('LoggedInUser')) {
      // this.toggle = true;
      this.userName = JSON.parse(sessionStorage.getItem('LoggedInUser')!).name;
      this.userProfilePhoto = JSON.parse(
        sessionStorage.getItem('LoggedInUser')!
      ).picture;
      this.userEmail = JSON.parse(
        sessionStorage.getItem('LoggedInUser')!
      ).email;
    } else {
      console.log('User Not Logged In!');
    }
  }

  signOut() {
    this.logOut.signOut();
  }

  ngOnInit(): void {
    this.fetchUserData();
    // console.log('User Email:', this.userEmail);
    // console.log('UserName:', this.userName);
    // console.log('User Profile Photo:', this.userProfilePhoto);
  }
}
