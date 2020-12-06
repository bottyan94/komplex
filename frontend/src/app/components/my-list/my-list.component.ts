import { Component, OnInit } from '@angular/core';
import { List } from 'src/app/core/models/models';
import { AlertService } from 'src/app/core/service/alert.service';
import { UsersService } from 'src/app/core/service/user.service';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.scss']
})
export class MyListComponent implements OnInit {
  list: List[]
  constructor(private service: UsersService, private alertService: AlertService) { }

  ngOnInit() {
    this.service.getMyList().subscribe(res => {
      this.list = res
    });
  }
  async clickEvent(item: List) {
    const response = await this.service.removeItem(item);
    response['success'] ? this.alertService.success('Sikeres') : this.alertService.error('Sikertelen');
  }
}
