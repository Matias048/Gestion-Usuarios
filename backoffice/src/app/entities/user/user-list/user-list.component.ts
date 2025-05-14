import { CommonModule } from '@angular/common';
import { User } from '../model/user.model';
import { UserService } from './../service/user.service';
import { Component, inject } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faPenToSquare, faTrash, faFilter } from '@fortawesome/free-solid-svg-icons';
import { Userpaginated } from '../model/userpaginated';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FaIconComponent, NgbPagination, RouterModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent {
  private readonly userService: UserService = inject(UserService);
  users: User[] = [];
  pageInfo!: Userpaginated;
  protected readonly faPenToSquare = faPenToSquare;
  protected readonly faTrash = faTrash;
  protected readonly faFilter = faFilter;

  page: number = 1;
  size: number = 5;

  constructor() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers(this.page, this.size).subscribe({
      next: (data) => {
        this.users = data.content;
        this.pageInfo = data;
      },
    });
  }
}
