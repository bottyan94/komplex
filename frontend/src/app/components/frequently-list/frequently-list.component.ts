import { Component, OnInit } from '@angular/core';
import { List } from 'src/app/core/models/models';
import { AlertService } from 'src/app/core/service/alert.service';
import { ItemsService } from 'src/app/core/service/items.service';
import { UsersService } from 'src/app/core/service/user.service';

@Component({
  selector: 'app-frequently-list',
  templateUrl: './frequently-list.component.html',
  styleUrls: ['./frequently-list.component.scss']
})
export class FrequentlyListComponent implements OnInit {
  list: List[];
  constructor(
    private service: ItemsService,
    private userService: UsersService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.service.getItemsByFrequently().subscribe(res => this.list = res);
  }
  async clickEvent(item: List) {
    const response = await this.userService.addItem(item);
    response['success'] ? this.alertService.success('Sikeres') : this.alertService.error('Sikertelen');
  }
}
