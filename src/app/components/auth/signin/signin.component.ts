import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  @ViewChild('f') form: NgForm;
  submitted: boolean;

  constructor(private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) {
      this.submitted = false;
    }

  ngOnInit() {
  }

  async onSignIn() {
    const email = this.form.value.email;
    const password = this.form.value.password;
    this.submitted = true;
    try {
      await this.authService.signinUser(email, password);
      const token = this.authService.getSavedToken();
      if (token === null) {
        this.router.navigate(['../'], {relativeTo: this.route});
      } else {
        this.router.navigate(['../recipes'], {relativeTo: this.route});
      }
    } catch (error) {
      console.log(error);
    }
  }

  getSavedToken() {
    return this.authService.getSavedToken();
  }
}
