import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { LoginComponent } from './login/login.component';
import { UploadVideoComponent } from './upload-video/upload-video.component';
import { HomeComponent } from './home/home.component';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
   {
     path: "uploadVideo",
     component: UploadVideoComponent
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }