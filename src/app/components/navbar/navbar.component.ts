import {
  ChangeDetectorRef,
  Component,
  HostListener,
  NgZone,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { SignOutService } from '../../services/sign-out.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FetchDataService } from '../../services/fetch-data.service';
import { Ng2SearchPipe, Ng2SearchPipeModule } from 'ng2-search-filter';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit, OnChanges {
  userName: string = '';
  userProfilePhoto: string = '';
  userEmail: string = '';
  searchTerm: string = '';
  searchResults: any = [];
  isDropdownVisible: boolean = false;
  // loggedIn: boolean = false;

  constructor(
    private logOut: SignOutService,
    private fetch: FetchDataService,
    private router: Router
  ) {}
  ngOnChanges(changes: SimpleChanges): void {}

  fetchUserData() {
    if (sessionStorage.getItem('LoggedInUser')) {
      // this.toggle = true;
      // this.toggler();
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

  onSearchChange() {
    if (this.searchTerm.trim()) {
      this.isDropdownVisible = true;
      this.fetch
        .search(this.searchTerm)
        .pipe(debounceTime(1000))
        .subscribe((data: any) => {
          this.searchResults = data.results;
          // console.log(this.searchResults);
        });
    } else {
      this.isDropdownVisible = false;
      console.log('No search term provided.');
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const targetElement = event.target as HTMLElement;
    const clickedInside = targetElement.closest('.search-container');
    if (!clickedInside) {
      this.isDropdownVisible = false;
    }
  }

  selectResult(item: any) {
    console.log(item.id, item.media_type);
    this.router.navigate(['/watch', item.media_type, item.id]);
  }

  signOut() {
    this.logOut.signOut();
  }

  // toggler() {
  //   this.ngZone.run(() => {
  //     if (sessionStorage.getItem('LoggedInUser')) {
  //       this.loggedIn = true;
  //       this.cdr.detectChanges();
  //     }
  //   });
  // }

  ngOnInit(): void {
    this.fetchUserData();
    // console.log('User Email:', this.userEmail);
    // console.log('UserName:', this.userName);
    // console.log('User Profile Photo:', this.userProfilePhoto);
  }
}
