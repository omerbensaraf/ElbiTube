import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {SearchResultsComponent} from './search-results/search-results.component';
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
    path: 'searchResutls/:term',
    component: SearchResultsComponent,
    runGuardsAndResolvers: 'always'
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
      {onSameUrlNavigation: 'reload'})
  ],
  exports: [RouterModule],
  providers: [
    VideosResolver
  ]
})
export class AppRoutingModule { }