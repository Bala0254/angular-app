import { Component } from '@angular/core';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HoverBlueDirective } from '../../directives/hover-blue.directive';
import { AddEditUser } from '../add-edit-user/add-edit-user';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-user-list',
  standalone: true ,
  imports: [CommonModule, HoverBlueDirective, ReactiveFormsModule, AddEditUser, BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss'
})
export class UserList {
  users: User[] = [];
  filteredUsers: User[] = [];
  showForm = false;

  searchControl = new FormControl('');
  roles = ['All', 'Admin', 'User'];
  selectedRole: any = 'All';

  // Pagination
  currentPage = 1;
  pageSize = 5;
  totalPages = 1;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
      this.applyFilters();
    });

    this.searchControl.valueChanges.subscribe(() => {
      this.applyFilters();
    });
  }

    onUserCreated(user: any) {
    this.users.push(user);
    this.showForm = false;
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  applyFilters() {
    let filtered = this.users;

    const search = this.searchControl.value?.toLowerCase() || '';
    if (search) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search)
      );
    }

    if (this.selectedRole !== 'All') {
      filtered = filtered.filter(user => user.role === this.selectedRole);
    }

    this.filteredUsers = filtered;
    this.totalPages = Math.ceil(this.filteredUsers.length / this.pageSize);
    this.currentPage = 1;
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  get pagedUsers(): User[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredUsers.slice(start, start + this.pageSize);
  }

  onRoleChange(role: any) {
    this.selectedRole = role?.target?.value || "";
    this.applyFilters();
  }

  onDelete(id: number) {
    this.userService.deleteUser(id);
  }
}
