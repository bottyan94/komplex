import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { AlertService } from 'src/app/core/service/alert.service';
import { ItemsService } from 'src/app/core/service/items.service';
import { UsersService } from 'src/app/core/service/user.service';

@Component({
  selector: 'app-item-add-input',
  templateUrl: './item-add-input.component.html',
  styleUrls: ['./item-add-input.component.scss']
})
export class ItemAddInputComponent implements OnInit {
  @ViewChild('instance', { static: true }) instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  constructor(private itemsService: ItemsService, private userService: UsersService, private alertService: AlertService) { }
  list

  ngOnInit() {
    this.getList();
  }
  async getList() {
    const array = await this.itemsService.getItemsFromDB()
    this.list = [...new Set(array.map(col => col.name ? col.name.toString() : ''))];
  }

  search = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.list
        : this.list.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }
  async addItemToList(item: string) {
    if (item) {
      const res = await this.userService.addItemFromInput(item)
      if (res['success']) {
        this.getList();
        this.alertService.success('Sikeresen hozzá lett adva')
      }
      else {
        this.alertService.error('Ez az elem már hozzá van adva  alistához, vagy valami hiba törtétn!')
      }
    }
  }
} 
