import { Component,signal } from '@angular/core';
import { UserService } from '../services/user-service';
import { UserModel, userMoney } from '../models/user';
import { PartyService } from '../services/party-service';
import { PartyModel } from '../models/party';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-party',
  imports: [FormsModule],
  templateUrl: './party.html',
  styleUrl: './party.css',
})
export class Party {
  constructor(private userService: UserService, private partyService: PartyService) {}
  users:userMoney[] = [];
  usersFree:UserModel[] = [];
  partyV:PartyModel | null = null;
  fetchedUser = signal(false);
  selectedUser :UserModel | null = null;
  ngOnInit() {
    this.partyService.get_Party().subscribe({
      next: (Inpusers) => {
        this.partyV = Inpusers;
        if(this.partyV.adminCode == null){
          this.partyService.post_party({
            id: "",
            adminCode: ""
          }).subscribe({
            next: (Inpusers) => {
              this.partyV = Inpusers;
              console.log(this.partyV);
              this.refreshUsers()
            },
            error: (error) => {
              console.error('Error fetching users:', error);
          }});
        }else{
          this.refreshUsers()
        }
        
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }


  refreshUsers(){
    this.fetchedUser.set(false);
    this.users = [];
    this.usersFree = [];
        this.userService.get_Users().subscribe({
      next: (Inpusers) => {
        for(let i = 0; i < Inpusers.length; i++){
          if(Inpusers[i].current_party_id != "" && Inpusers[i].current_party_id === this.partyV?.id){
            this.users.push({ user: Inpusers[i], money: 0 });
          }else if(Inpusers[i].current_party_id === ""){
            this.usersFree.push(Inpusers[i]);
          }
        }
        this.fetchedUser.set(true);
      },
      error: (error) => {
        console.error('Error fetching users:', error);
        this.fetchedUser.set(true);
      }
    });
  }

  selectUser(userId: string) {
    this.selectedUser = null;
    const user = this.usersFree.find(u => u.id === userId);
    if (user) {
      this.selectedUser = user;
    }
  }


  AddUser(){
    if(this.selectedUser != null && this.partyV != null){
      this.partyService.put_AddUserToParty(this.partyV, this.selectedUser).subscribe({
        next: (response) => {
          console.log('User added to party:', response);
          this.refreshUsers();
        },
        error: (error) => {
          console.error('Error adding user to party:', error);
          this.refreshUsers();
        }
      });
      console.log(this.selectedUser)
    }
  }
  removeUser(user:userMoney){
    if(this.partyV != null){
      user.user.money = user.money.toString();
      this.partyService.put_RemoveUserFromParty(this.partyV, user.user).subscribe({
        next: (response) => {
          console.log('User removed from party:', response);
          this.refreshUsers();
        },
        error: (error) => {
          console.error('Error removing user from party:', error);
          this.refreshUsers();
        }
      });
    }
  }

}


