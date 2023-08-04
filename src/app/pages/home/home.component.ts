import { Component, inject } from '@angular/core';
import { DataUser } from 'src/app/interfaces/data-user.interface';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  userService = inject(UserService)
  arrUsers:DataUser[] | any
  infoUsers:User[] | any

  async ngOnInit():Promise<void>{
    try{
      this.arrUsers= await this.userService.getAll()
      this.infoUsers=this.arrUsers.results
    }catch (error){
      console.log(error)
    }
  }
}
