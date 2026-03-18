import { Component,signal } from '@angular/core';
import { UserService } from '../services/user-service';
import { UserModel } from '../models/user';
import { PartyService } from '../services/party-service';
import { PartyModel } from '../models/party';

@Component({
  selector: 'app-party',
  imports: [],
  templateUrl: './party.html',
  styleUrl: './party.css',
})
export class Party {
  constructor(private userService: UserService, private partyService: PartyService) {}
  users:UserModel[] = [];
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
            adminCode: "",
            start_time: "2023-01-01T00:00:00Z",
            end_time: "2023-01-01T00:00:00Z"
          }).subscribe({
            next: (Inpusers) => {
              this.partyV = Inpusers;
              console.log(this.partyV);
            },
            error: (error) => {
              console.error('Error fetching users:', error);
          }});
        }
        
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
    this.userService.get_Users().subscribe({
      next: (Inpusers) => {
        for(let i = 0; i < Inpusers.length; i++){
          if(Inpusers[i].current_party_id != "" && Inpusers[i].current_party_id == this.partyV?.id){
            this.users.push(Inpusers[i]);
          }else if(Inpusers[i].current_party_id == ""){
            this.usersFree.push(Inpusers[i]);
          }
        }

        this.users = Inpusers;
        this.fetchedUser.set(true);
      },
      error: (error) => {
        console.error('Error fetching users:', error);
        this.fetchedUser.set(true);
      }
    });
  }


  selectUser(userId: string) {
    const user = this.users.find(u => u.id === userId);
    if (user) {
      this.selectedUser = user;
      console.log('Selected user:', user);
    }
  }
}
