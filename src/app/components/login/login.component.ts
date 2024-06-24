declare var google: any;
import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private zone: NgZone) {}
  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id:
        '604897977204-23cnqs5mvkdsii4j09bdi4l3cafqqo50.apps.googleusercontent.com',
      callback: (response: any) => {
        this.zone.run(() => {
          this.handleLogin(response);
        });
      },
    });

    google.accounts.id.renderButton(document.getElementById('google-btn'), {
      theme: 'filled_black',
      size: 'large',
      shape: 'pill',
      type: 'standard',
      text: 'signin_with',
      width: 400,
    });
  }

  private decodeResponse(response: string) {
    return JSON.parse(atob(response.split('.')[1]));
  }

  handleLogin(response: any) {
    if (response) {
      //decode the response
      const payload = this.decodeResponse(response.credential);

      //store the response
      sessionStorage.setItem('LoggedInUser', JSON.stringify(payload));

      //redirect to home page
      this.router.navigate(['/home']);
    }
  }
}
