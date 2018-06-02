import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import {VgAPI} from 'videogular2/core';
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
import { MediaApiService } from './services/media-api.services';
import { ImageComponent } from './components/image/image.component';
import { LikeComponent } from './components/like/like.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MenuComponent,
    FooterComponent,
    LoginHeaderComponent,
    PlayerComponent,
    ImageComponent,
    LikeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule
  ],
  providers: [VgAPI,MediaApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
