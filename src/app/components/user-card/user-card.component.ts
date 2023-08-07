import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {
@Input() oneUser:User | any
router = inject(Router)
userService = inject(UserService)

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
