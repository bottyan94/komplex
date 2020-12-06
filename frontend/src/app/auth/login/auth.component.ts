import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/core/service/alert.service';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private service: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(320) // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
      ])
      ],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ])
      ]
    });
  }
  submit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      this.alertService.error('Hibás a form')
      return
    }
    this.service.login(this.loginForm.controls.username.value, this.loginForm.controls.password.value).then(res => {
      if (res) {
        this.router.navigateByUrl('/');
      }
    })
  }
}
