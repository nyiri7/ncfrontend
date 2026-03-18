import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { backend } from '../app.config';
import { PartyModel } from '../models/party';

@Injectable({
  providedIn: 'root',
})
export class PartyService {
    path:string = backend + 'api/';

  constructor(private http: HttpClient) { }

    get_Party() {
      return this.http.get<PartyModel>(this.path+"party");
    }

    post_party(inp:PartyModel) {
      return this.http.post<PartyModel>(this.path+"party", inp);
    }
}
