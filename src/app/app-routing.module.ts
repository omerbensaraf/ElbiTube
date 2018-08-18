import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LoginHeaderComponent } from './login-header/login-header.component';
import { WatchComponent } from './components/watch/watch.component';
import {VideosResolver} from './VideoResolver';
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
    component: WatchComponent,
    resolve: {
      videos: VideosResolver
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,
    { enableTracing: true })
  ],
  exports: [RouterModule],
  providers: [
    VideosResolver
  ]
})
export class AppRoutingModule { }