import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { CategoryComponent } from './components/category/category.component';
import { TodoComponent } from './components/todo/todo.component';

const routes: Routes = [
  {path:'signup', component:SignupComponent},
  {path:'login', component:LoginComponent},
  {path:'category', component:CategoryComponent},
  {path:'ToDo', component: TodoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
