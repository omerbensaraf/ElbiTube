import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { LoginComponent } from './login/login.component';
import { UploadVideoComponent } from './upload-video/upload-video.component';
import { HomeComponent } from './home/home.component';
import { LoginHeaderComponent } from './login-header/login-header.component';
const routes: Routes = [
  {
    path: '',
    component: LoginHeaderComponent
  },
  {
    path: "uploadVideo",
    component: UploadVideoComponent
  },
  {
    path: 'home',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }