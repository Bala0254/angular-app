import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { UserList } from './user/user-list/user-list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, 
    FormsModule, //For Ngmodel and form related usage
    UserList,
    CommonModule,  // For ngFor releacted directvie usage
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'simple-angular-app';
}
