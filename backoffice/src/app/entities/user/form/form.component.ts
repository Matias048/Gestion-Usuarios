import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Role} from '../../role/model/role';
import { RoleService } from '../../role/service/role.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../service/user.service';
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../model/user.model';



@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgbToast, RouterModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit{
  @Input('id') id!:number;
  private readonly roleService: RoleService = inject(RoleService);
  private readonly userService: UserService = inject(UserService);
  private readonly formBuilder:FormBuilder = inject(FormBuilder);
  private readonly router: Router = inject(Router);
  dataLoaded=false;
  edit=false;
  roles: Role[] = [];
  user!: User;
  

  formUser: FormGroup = this.formBuilder.group(
    {
      id: [null],
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      surname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      roleId:['', Validators.required],
      roleName: [''],
      version:[0]
    }
  )

  toast={
    body: '',
    color: 'bg-success'
  }

  toastShow=false;

  ngOnInit(){
    this.loadRoles();
    if(this.id){
      this.loadUser();
      this.edit=true;
    }else{
      this.edit=false;
      this.dataLoaded=true;
    }
  }

  private loadUser(){
    this.userService.getUser(this.id).subscribe(
      {
        next: value => {
          this.formUser.setValue(value)
          this.dataLoaded = true;
        },
        error: err =>{
          console.error(err);
        }
      }
    )
  }


  private loadRoles() {
    this.roleService.getRoles().subscribe(
      {
        next: data => {
          this.roles=data
        }
      }
    )
  }

  protected submit(){
    if(this.formUser.invalid){
      this.formUser.markAllAsTouched();
      return
    }

    if(this.edit){
      const id = this.formUser.get('id')?.value
      if(id){
        this.userService.updateUser(this.id, this.formUser.getRawValue()).subscribe(
          {
            next: value => {
              this.showToast('Usuario Actualizado Correctamente', 'bg-success')
            },
            error: err=>{
              this.showToast('Ha ocurrido un error, Vuelve a intentarlo', 'bg-danger')
              setTimeout(
              ()=>{
                this.router.navigateByUrl('/user')
              }, 1500
            )
            },
            complete: ()=>{
              setTimeout(
              ()=>{
                this.router.navigateByUrl('/user')
              }, 1500
            )
            }
          }
        )
    }
    }else{
      this.userService.addUser(this.formUser.getRawValue()).subscribe(
        {
          next: value => {
            this.showToast('Usuario añadido correctamente', 'bg-success')
          },
          error: err =>{
            const error= err.error?.message
            this.showToast(error, 'bg-danger')
          },
          complete: ()=>{
            setTimeout(
              ()=>{
                this.router.navigateByUrl('/user')
              }, 1500
            )
          }
        }
      )
    }
    this.showToast('Formulario enviado', 'bg-success')
  }

  private showToast(message: string, color:string){
    this.toast.body = message;
    this.toast.color= color;
    this.toastShow=true
    setTimeout(()=>{this.toastShow = false}, 2000)
  }

  confirmCancel(){
    document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
    this.router.navigate(['/user']);
  }

}
