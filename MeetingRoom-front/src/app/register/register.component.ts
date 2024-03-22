import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/User';
import { AuthService } from '../services/auth.service'; 
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { } 

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  register() {
    if (this.registerForm.valid) {
      const user: User = this.registerForm.value;
      console.log(user);
      this.authService.register(user.name, user.email, user.password, user.role).subscribe( 
        res => console.log(res), 
        err => console.error(err)
      );
    }
  }
}