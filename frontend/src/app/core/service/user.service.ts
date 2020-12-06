import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { List } from '../models/models';
import { ItemsService } from './items.service';


@Injectable({ providedIn: 'root' })
export class UsersService {
  private userList$ = new BehaviorSubject<List[]>(null);
  constructor(private itemService: ItemsService, private httpClient: HttpClient) {
    this.getItemsFromDB();
  }

  async getItemsFromDB() {
    const header = new HttpHeaders({
      'userID': localStorage.getItem('userID')
    })
    const list = await this.httpClient.get(environment.apiUrl + 'my-list', { headers: header }).toPromise();
    this.userList$.next(list['items']);
  }
  getMyList(): Observable<List[]> {
    return this.userList$.asObservable()
  }
  async addItem(item: List) {
    const response = await this.httpClient.post(environment.apiUrl + 'add-item', { item: item, userID: +localStorage.getItem('userID') }).toPromise();
    this.getItemsFromDB();
    this.itemService.getItemsByFrequentlyFromDB();
    return response
  }
  async addItemFromInput(itemName: string) {
    const response = await this.httpClient.post(environment.apiUrl + 'add-itemname', { itemName: itemName, userID: +localStorage.getItem('userID') }).toPromise();
    this.getItemsFromDB();
    this.itemService.getItemsByFrequentlyFromDB();
    return response
  }
  async removeItem(item: List) {
    const response = await this.httpClient.post(environment.apiUrl + 'remove-item', { item: item, userID: +localStorage.getItem('userID') }).toPromise();
    this.getItemsFromDB();
    this.itemService.getItemsByFrequentlyFromDB();
    return response
  }
}
