import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  btn_value:string = ""
  router = inject(Router)
  userService = inject(UserService)
  activeRoute = inject (ActivatedRoute)
  userForm:FormGroup
  constructor(){
    this.userForm = new FormGroup({
      userName: new FormControl('',[Validators.required]),
      userSurname: new FormControl('',[Validators.required]),
      userEmail: new FormControl('',[Validators.required, Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
      userImg: new FormControl('',[Validators.required, Validators.pattern(/^(ht|f)tp(s?)\:\/\/[a-zA-Z0-9\-\._]+(\.[a-zA-Z0-9\-\._]+){2,}(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?$/)])
    })
  }
  async getDataForm():Promise<void>{
    this.activeRoute.params.subscribe(async (params:any)=>{
      let id:string = params.iduser
      if(id){
        //estoy actualizando
        let response=await this.userService.update(this.userForm.value, id)
        if(response){
          alert('Usuario actualizado correctamente')
          this.router.navigate(['/home'])
        }else{
          alert('Error al actualizar el usuario')
        }
      }else{
        //estoy insertando
        let response = await this.userService.insert(this.userForm.value);
        if(response){
          alert('El usuario se ha insertado correctamente')
          this.router.navigate(['/home'])
        }else{
          alert('Hubo un error, inténtalo de nuevo')
        }
      }
    })
  }
  checkControl(formControlName:string,validator:string):boolean | undefined{
    //el ? significa que si no hay error, que no pasa nada.
    return this.userForm.get(formControlName)?.hasError(validator) && this.userForm.get(formControlName)?.touched
  }
  ngOnInit(){
    this.activeRoute.params.subscribe(async (params:any)=>{
      let id:string = params.iduser
      if(id){
        let response = await this.userService.getById(id)
        this.userForm = new FormGroup({
          userName: new FormControl(response.first_name,[Validators.required]),
          userSurname: new FormControl(response.last_name,[Validators.required]),
          userEmail: new FormControl(response.email,[Validators.required, Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,6}$/)]),
          userImg: new FormControl(response.image,[Validators.required, Validators.pattern(/^(http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)])
        })
        this.btn_value="Actualizar"
      }else{
        this.btn_value="Guardar"
      }
    })
  }
}
