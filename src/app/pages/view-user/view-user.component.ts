import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataUser } from 'src/app/interfaces/data-user.interface';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent {
  @Input() oneUser:User|any
  userService = inject(UserService)
  activeRoute = inject(ActivatedRoute)
  router = inject(Router)
  async ngOnInit():Promise<void>{
    this.activeRoute.params.subscribe(async (params:any) =>{
      let id = params.iduser
      try{
        this.oneUser = await this.userService.getById(id)
      }catch (error){
        console.log(error)
      }
    })
  }
  async deleteUser(id:string):Promise<void>{
    const res = confirm("Seguro de que quieres borrar el post?");
    if (res) {
      let response = await this.userService.delete(id)
      if(response){
        alert('producto borrado exitosamente')
        this.router.navigate(['/home'])
      }
    } else {
        alert('No se pudo borrar el usuario.');
        this.router.navigate(['/home'])
    }
  }

}
