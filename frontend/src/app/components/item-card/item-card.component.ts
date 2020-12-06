import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { List } from 'src/app/core/models/models';


@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {
  @Input() item;
  @Input() isMyList = false;
  @Output() clickEvent = new EventEmitter<List>();

  constructor() { }

  ngOnInit() {
  }
  clicked() {
    this.clickEvent.emit(this.item)
  }

}
