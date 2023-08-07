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
  page:number=1
  pages:number=2
  buttons:number[]=[]
  isdisabled:string=`false`
  async ngOnInit():Promise<void>{
    try{
      this.arrUsers= await this.userService.getAll(this.page)
      this.infoUsers=this.arrUsers.results
    }catch (error){
      console.log(error)
    }
    for (let i=0;i<this.pages;i++){
      this.buttons[i]=i+1
    }
  }
  async nextPage(page:any){
    this.page=Number(page.target.value)
    try{
      this.arrUsers= await this.userService.getAll(this.page)
      this.infoUsers=this.arrUsers.results
    }catch (error){
      console.log(error)
    }
  }
}
