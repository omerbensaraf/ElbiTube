import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate, RouterLink } from '@angular/router';
// import { LoginComponent } from './login/login.component';
import { UploadVideoComponent } from './upload-video/upload-video.component';
import { HomeComponent } from './home/home.component';
import {SearchResultsComponent} from './search-results/search-results.component';
import { LoginHeaderComponent } from './login-header/login-header.component';
import { WatchComponent } from './components/watch/watch.component';
import {VideosResolver} from './VideoResolver';
import {AuthGuardService} from './services/auth-guard.service';
import { CategoryComponent } from './components/category/category.component';

const routes: Routes = [
  {
    path: '',
    component: LoginHeaderComponent
  },
  {
    path: "upload",
    component: UploadVideoComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'searchResutls/:term',
    component: SearchResultsComponent,
    canActivate: [AuthGuardService],
    runGuardsAndResolvers: 'always'
  },
  {
    path:'watch/:_id',
    component: WatchComponent,
    canActivate: [AuthGuardService],
    resolve: {
      videos: VideosResolver
    }
  },  
  {
    path:'categories/:name',
    component: CategoryComponent
  },
  {
    path:'categories',
    component: CategoryComponent
  },
  { 
    path: '**', 
    redirectTo: '' 
  }  
];



@NgModule({
  imports: [
    RouterModule.forRoot(routes,
      {onSameUrlNavigation: 'reload'})
  ],
  exports: [RouterModule],
  providers: [
    VideosResolver
  ]
})
export class AppRoutingModule { }