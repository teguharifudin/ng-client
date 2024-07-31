import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm!: FormGroup;

  isSignedin = false;

  constructor(
    private service: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.isSignedin = this.service.isUserSignedin();
		if(this.isSignedin) {
			this.router.navigate(['dashboard']);
		}

    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  login() {
    // console.log(this.loginForm.value);
    this.service.login(this.loginForm.value).subscribe((response) => {
      // console.log(response);
      this.router.navigate(['dashboard']);
    })
  }
}