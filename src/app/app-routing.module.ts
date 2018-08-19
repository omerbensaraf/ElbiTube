import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import {SearchResultsComponent} from './search-results/search-results.component';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'searchResutls/:term',
    component: SearchResultsComponent,
    runGuardsAndResolvers: 'always'
  }
  // {
  //   path: 'login',
  //   component: LoginComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }