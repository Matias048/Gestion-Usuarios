import { Component } from "@angular/core";
import { UserListComponent } from "./user-list/user-list.component";
import { FormComponent } from "./form/form.component";

export const USER_ROUTES = [
    {
        path:'',
        component: UserListComponent
    },
    {
        path:'add',
        component: FormComponent
    },
    {
        path:'edit/:id',
        component: FormComponent
    }
]