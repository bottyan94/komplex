
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { List } from '../models/models';

@Injectable({ providedIn: 'root' })
export class ItemsService {
  private allList$ = new BehaviorSubject<List[]>(null);

  constructor(private httpClient: HttpClient) {
    this.getItemsByFrequentlyFromDB();
  }

  async getItemsFromDB() {
    const list = await this.httpClient.get(environment.apiUrl + 'all-list').toPromise();;
    return list['items'];
  }
  getItemsByFrequently(): Observable<List[]> {
    return this.allList$.asObservable()
  }

  public async getItemsByFrequentlyFromDB() {
    const list = await this.httpClient.get(environment.apiUrl + 'freq-list').toPromise();;
    this.allList$.next(list['items']);
  }
}
