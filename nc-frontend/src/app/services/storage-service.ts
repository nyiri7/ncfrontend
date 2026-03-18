import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {backend} from '../app.config';
@Injectable({
  providedIn: 'root',
})
export class StorageService {

  path:string = backend + 'code';

  constructor(private http: HttpClient) { }

  setItem(key: string, adminCode: string, expireHours: number = 1): void {
    const headers = new HttpHeaders().set('X-Admin-Code', adminCode);
    this.http.get(this.path, { headers }).subscribe({
      next: () => {
        console.log('Admin code is valid. Storing in localStorage.');
        const expires = Date.now() + expireHours * 60 * 60 * 1000;
        const item = { value: adminCode, expires };
        localStorage.setItem(key, JSON.stringify(item));
      },
      error: (err) => {
        console.error('Invalid admin code', err);
      }
    });
  };

  getItem(key: string): string | null {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;
    const item = JSON.parse(itemStr);
    if (Date.now() > item.expires) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
