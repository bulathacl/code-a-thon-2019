import { Injectable } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(private localStorage: LocalStorage) { }

  getItem(key: string) {
    return this.localStorage.getItem<any>(key);
  }

  setItem(key: string, item: any) {
    return this.localStorage.setItem(key, item)
  }
}
