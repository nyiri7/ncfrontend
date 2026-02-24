import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {backend} from '../app.config';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  path:string = backend + 'api/user';

  constructor(private http: HttpClient) { }

  get_Users() {
    return this.http.get<User[]>(this.path+"s");
  }
}
