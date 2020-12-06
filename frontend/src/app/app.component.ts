import { Component } from '@angular/core';
import { AuthService } from './core/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  visible
  constructor(private service: AuthService) { }
  ngOnInit(): void {
    this.service.getUser().subscribe(res => {
      this.visible = res ? true : false;
    });
  }
}
