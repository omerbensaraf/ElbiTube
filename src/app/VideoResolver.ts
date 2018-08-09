import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MediaService } from './services/media.service';
import { IMedia } from './models/imadia.model';

@Injectable()
export class VideosResolver implements Resolve<Observable<Array<IMedia>>> {

  constructor(private mediaService: MediaService){}

  public resolve(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<Array<IMedia>> {
    return this.mediaService.httpGetMedia();
  }
}