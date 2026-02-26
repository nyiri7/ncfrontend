import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {backend} from '../app.config';
import { UserModel } from '../models/user';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  path:string = backend + 'api/user';

  constructor(private http: HttpClient) { }

  get_Users() {
    return this.http.get<UserModel[]>(this.path+"s");
  }
  create_User(inp:UserModel) {
    return this.http.post<UserModel>(this.path, inp);
  }
  update_User(inp:UserModel) {
    return this.http.put<UserModel>(this.path, inp);
  }
}
