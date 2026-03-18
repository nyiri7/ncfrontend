import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StorageService } from './services/storage-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('nc-frontend');
  constructor(private storageService: StorageService) {}

  code:string = '';
  validCode:boolean = false;

  codeChange(){
    this.storageService.setItem('admin_code', this.code);
    this.validCode = true;
  }
  ngOnInit() {
    if(this.storageService.getItem('admin_code')) {
      this.validCode = true;
    }
  }

}


