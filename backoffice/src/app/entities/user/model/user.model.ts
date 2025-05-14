export class User{
  id: number | undefined;
  name: string;
  surname: string;
  email: string;
  roleId?: number;
  roleName?: string;
  version?: number;

   constructor(
    id: number | undefined,
    name: string,
    surname: string,
    email:string,
    roleId?: number,
    roleName?: string,
    version?: number
  ) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.email = email
    this.roleId = roleId;
    this.roleName = roleName;
    this.version = version;
  }  
}