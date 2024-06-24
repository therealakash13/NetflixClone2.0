declare var google: any;
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SignOutService {
  constructor(private router: Router) {}

  signOut() {
    google.accounts.id.disableAutoSelect();
    sessionStorage.removeItem('LoggedInUser');
    this.router.navigate(['/']);
  }
}
