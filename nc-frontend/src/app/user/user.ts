import { Component, input,signal } from '@angular/core';
import { UserService } from '../services/user-service';
import { UserModel } from '../models/user';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  imports: [FormsModule,CommonModule],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
    constructor(private userService: UserService) {}
    user = input<UserModel>();
    fetchedUser: UserModel= {
    name:"",
    image:"",
    id:"",
    current_party_id:"",
    money:""
  };
    fetched = signal(false);

    ngOnInit() {
      this.fetchedUser = this.user() ?? {
        name:"",
        image:"",
        id:"",
        current_party_id:"",
        money:""
      };
      console.log(this.fetchedUser);
    }

    createUser(){
      this.userService.create_User(this.fetchedUser!).subscribe({
        next: (response: UserModel) => {
          this.fetchedUser=response;
          this.fetched.set(true);
        },
        error:(error) => {
          this.fetched.set(true);
        }
      });
    }

    updateUser(){
      this.userService.update_User(this.fetchedUser!).subscribe({
        next: (response: UserModel) => {
          this.fetchedUser=response;
          this.fetched.set(true);
        },
        error:(error) => {
          this.fetched.set(true);
        }
      })
    };

}
