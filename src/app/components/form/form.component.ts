import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  userForm:FormGroup
  constructor(){
    this.userForm = new FormGroup({
      userName: new FormControl("",[]),
      userSurname: new FormControl("",[]),
      userEmail: new FormControl("",[]),
      userImg: new FormControl("",[]),
    })
  }

getDataForm():void{
  console.log(this.userForm.value)
}
}
