import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  isSignedin = false;

  signedinUser: string = '';

  me: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.isSignedin = this.authService.isUserSignedin();
		this.signedinUser = this.authService.getSignedinUser();

    if(!this.authService.isUserSignedin()) {
			this.router.navigate(['login']);
		}
    if(this.isSignedin) {
      this.authService.me().subscribe((data: any) => {
        this.me = JSON.parse(data).fullName;
      });
    }
  }

  signout() {
		this.authService.signout();
	}
}