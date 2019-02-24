import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { UploadVideoComponent } from './upload-video/upload-video.component';
import { FooterComponent } from './footer/footer.component';
import { LoginHeaderComponent } from './login-header/login-header.component';
import { PlayerComponent } from './components/player/player.component';
import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';
import {MediaService} from './services/media.service';
import { LikeComponent } from './components/like/like.component';
import { FormsModule } from '@angular/forms';
import { UsersService } from './services/users.service';
import { CommentService } from './services/comment.service';
import { VideoPropertiesComponent } from './components/video-properties/video-properties.component';
import { AutoCompleteSearchComponent } from './auto-complete-search/auto-complete-search.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { HttpClientModule } from '@angular/common/http';
import { WatchComponent } from './components/watch/watch.component';
import { VideoPropertiesMinComponent } from './components/video-properties/video-properties-min/video-properties-min.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { EditorComponent } from './components/editor/editor.component';
import { FromNowPipe } from './pipes/from-now.pipe';
import { CommentComponent } from './components/comment/comment.component';
import { CommonModule } from '@angular/common';
import { CommentsComponent } from './components/comments/comments.component';
import {AuthGuardService} from './services/auth-guard.service';
import { CategoryComponent } from './components/category/category.component';
import { NoHyphenPipe } from './common/noHyphen.pipe';
import {AvatarModule} from 'ngx-avatar';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginHeaderComponent,
    HomeComponent,
    MenuComponent,
    UploadVideoComponent,
    FooterComponent,
    PlayerComponent,
    LikeComponent,
    LoginHeaderComponent,
    VideoPropertiesComponent,
    AutoCompleteSearchComponent,
    SearchResultsComponent,
    WatchComponent,
    VideoPropertiesMinComponent,
    AppHeaderComponent,
    EditorComponent,
    FromNowPipe,
    CommentComponent,
    CommentsComponent,
    CategoryComponent,
    NoHyphenPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    AppRoutingModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    HttpClientModule,
    FormsModule,
    AvatarModule,
    SweetAlert2Module.forRoot({
          buttonsStyling: false,
          customClass: 'modal-content',
          confirmButtonClass: 'btn btn-primary',
          cancelButtonClass: 'btn'
    })
  ],
  providers: [    
    MediaService,
    UsersService,
    HttpClientModule,
    CommentService,
    AuthGuardService,
    HttpClientModule,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


