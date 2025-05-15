import { CommonModule } from '@angular/common';
import { User } from '../model/user.model';
import { UserService } from './../service/user.service';
import { Component, inject, OnInit } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faPenToSquare,
  faTrash,
  faFilter,
} from '@fortawesome/free-solid-svg-icons';
import { Userpaginated } from '../model/userpaginated';
import { NgbPagination, NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { Router, RouterModule } from '@angular/router';
import { Role } from '../../role/model/role';
import { RoleService } from '../../role/service/role.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    FaIconComponent,
    NgbPagination,
    RouterModule,
    NgbToast,
    ReactiveFormsModule
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit {
  private readonly userService: UserService = inject(UserService);
  private readonly roleService: RoleService = inject(RoleService);
  private readonly formBuilder:FormBuilder = inject(FormBuilder);
  private readonly router: Router = inject(Router);

  protected readonly faPenToSquare = faPenToSquare;
  protected readonly faTrash = faTrash;
  protected readonly faFilter = faFilter;

  users: User[] = [];
  pageInfo!: Userpaginated;
  userId!: number;
  isFilterOpen = false;
  roles: Role[] = [];


  formFilters: FormGroup = this.formBuilder.group(
    {
      name:[''],
      surname: [''],
      roleName: ['']
    }
  )

  toast = {
    body: '',
    color: 'bg-success',
  };

  toastShow = false;

  page: number = 1;
  size: number = 5;

  ngOnInit() {
    this.loadRoles();
    this.loadUsers();
  }

  loadUsers() {
    const filters: string | undefined = this.buildFilters();
    this.userService.getUsers(this.page, this.size, filters).subscribe({
      next: (data) => {
        this.users = data.content;
        this.pageInfo = data;
      },
      complete: ()=>{
        if(this.users.length === 0){
          this.showToast('No se han encontrado usuarios','bg-warning')
        }
      }
    });
  }
  loadRoles() {
    this.roleService.getRoles().subscribe({
      next: (data) => {
        this.roles = data
      }
    });
  }

  getuserIdtoDelete(userId: number) {
    this.userId = userId;
  }

  confirmDelete() {
    if (this.userId) {
      this.userService.deleteUser(this.userId).subscribe({
        next: (data) => {
          this.router.navigate(['/user']);
          this.showToast('Usuario borrado exitosamente', 'bg-success');
        },
        error: (err) => {
          this.showToast(err.message, 'bg-danger');
        },
        complete: () => {
          this.loadUsers();
        },
      });
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

  openFilters() {
    this.isFilterOpen = !this.isFilterOpen;
  }

  searchUser(){
    this.loadUsers();
  }

  deleteFilters(){
    this.formFilters.reset();
    this.loadUsers();
  }

  private buildFilters(){
    const filters: string[] = [];
    const {name,surname,roleName} = this.formFilters.getRawValue();

    if(name?.trim()){
      filters.push(`name:STARTS_WITH:${name.trim()}`);
    }

    if(surname?.trim()){
      filters.push(`surname:STARTS_WITH:${surname.trim()}`);
    }

    if(roleName?.trim()){
      filters.push(`role.name:EQUAL:${roleName.trim()}`);
    }
    if (filters.length > 0) {
      return filters.join(',');
    } else {
      return undefined;
    }
  }
}
