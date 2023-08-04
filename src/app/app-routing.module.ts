import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ViewUserComponent } from './pages/view-user/view-user.component';
import { FormComponent } from './components/form/form.component';
import { Page404Component } from './components/page404/page404.component';

const routes: Routes = [
  //pathMatch: pongo como ruta ppal a Home.
  {path:"",pathMatch:"full",redirectTo:'home'},
  {path:"home",component:HomeComponent},
  {path:"user/:iduser",component:ViewUserComponent},
  {path:"updateuser/:iduser",component:FormComponent},
  {path:"newuser",component:FormComponent},
  {path:"**",component:Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
