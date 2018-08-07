import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LoginHeaderComponent } from './login-header/login-header.component';
import { WatchComponent } from './components/watch/watch.component';
const routes: Routes = [
  {
    path: '',
    component: LoginHeaderComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path:'watch/:_id',
    component: WatchComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }