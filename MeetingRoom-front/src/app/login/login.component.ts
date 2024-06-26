import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/User';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService,
    private router: Router) { } 

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.valid) {
      const user: User = this.loginForm.value;
      this.authService.login(user.email, user.password).subscribe( 
        res => {
          localStorage.setItem('token', res.token); 
          console.log(res);
          this.router.navigate(['/welcome']);
        },
        err => console.error(err)
      );
    }

  }
}