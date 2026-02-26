import { Component,signal } from '@angular/core';
import { UserService } from '../services/user-service';
import { UserModel } from '../models/user';
import {backend} from '../app.config';
import { User } from "../user/user";

@Component({
  selector: 'app-users',
  imports: [User],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users {

  constructor(private userService: UserService) {}
  users:UserModel[] = [];
  fetched = signal(false);
  m =backend+'/mate';
  newUser:UserModel = {
    name:"",
    image:"",
    id:"",
    current_party_id:"",
    money:""
  };
  selectedUser:UserModel | null = null;
  openDetials = signal(false);

  ngOnInit() {
    this.userService.get_Users().subscribe({
      next: (Inpusers) => {
        this.users = Inpusers;
        this.fetched.set(true);
      },
      error: (error) => {
        console.error('Error fetching users:', error);
        this.fetched.set(true);
      }
    });
  }

  selectUser(user:UserModel) {
    this.selectedUser = user;
    this.openDetials.set(!this.openDetials());
  }
}
