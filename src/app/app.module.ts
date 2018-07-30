import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
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
import { HttpClientModule } from '@angular/common/http';
import { UsersService } from './services/users.service';
import { VideoPropertiesComponent } from './components/video-properties/video-properties.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginHeaderComponent,
    HomeComponent,
    MenuComponent,
    FooterComponent,
    PlayerComponent,
    LikeComponent,
    VideoPropertiesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [    
    MediaService,
    UsersService,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


