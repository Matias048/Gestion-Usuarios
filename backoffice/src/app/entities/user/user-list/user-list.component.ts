import { CommonModule } from '@angular/common';
import { User } from '../model/user.model';
import { UserService } from './../service/user.service';
import { Component, inject } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faPenToSquare,
  faTrash,
  faFilter,
} from '@fortawesome/free-solid-svg-icons';
import { Userpaginated } from '../model/userpaginated';
import { NgbPagination, NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FaIconComponent, NgbPagination, RouterModule, NgbToast],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent {
  private readonly userService: UserService = inject(UserService);
  private readonly router: Router = inject(Router);
  users: User[] = [];
  pageInfo!: Userpaginated;
  protected readonly faPenToSquare = faPenToSquare;
  protected readonly faTrash = faTrash;
  protected readonly faFilter = faFilter;
  userId!: number;

  toast = {
    body: '',
    color: 'bg-success',
  };

  toastShow = false;

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

  getuserIdtoDelete(userId: number) {
    this.userId = userId;
  }

  confirmCancel() {
    if(this.userId){
      this.userService.deleteUser(this.userId).subscribe(
        {
          next: data =>{
            this.router.navigate(['/user']);
            this.showToast('Usuario borrado exitosamente', 'bg-success');
          },
          error: err=>{
            this.showToast(err.message, 'bg-danger');
          },
          complete: ()=>{
            this.loadUsers();
          }
        }
      )
    }
            
  }

  private showToast(message: string, color: string) {
    this.toast.body = message;
    this.toast.color = color;
    this.toastShow = true;
    setTimeout(() => {
      this.toastShow = false;
    }, 2000);
  }
}
