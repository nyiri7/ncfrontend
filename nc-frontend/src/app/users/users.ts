import { Component } from '@angular/core';
import { UserService } from '../services/user-service';
import { User } from '../models/user';
import {backend} from '../app.config';

@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users {

  constructor(private userService: UserService) {}
  users:User[] = [];
  fetched:boolean = false;
  m =backend+'/mate';

  ngOnInit() {
    this.userService.get_Users().subscribe({
      next: (Inpusers) => {
        console.log('itt');
        this.users = Inpusers;
        this.fetched = true;
      },
      error: (error) => {
        console.error('Error fetching users:', error);
        this.fetched = true;
      }
    });
      
  }
}
