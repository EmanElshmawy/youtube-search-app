import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environment';
import { Observable } from 'rxjs';
import { NgxIndexedDBService, NgxIndexedDBModule } from 'ngx-indexed-db';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  baseUrl = environment.baseURl;

  constructor(private http: HttpClient , private dbService: NgxIndexedDBService) {}

  setDraggedChannels(channelListItems): Observable<any> {
    this.dbService
    .update('savedVideos', {
      'channelList':  channelListItems
    })
    .then(
      () => {
        alert('done');
        console.log('done');
      },
      (error) => {
        console.log(error);
        console.log('done');
        alert('not donee');

      }
    );
    return new Observable(channelListItems);
  }

  getCurrentChannels(): Observable<any> {
    return this.http.get(this.baseUrl + 'channels');
  }
  saveChannelList(channelListItems): Observable<any> {
    // Save DB
    this.dbService
    .add('savedVideos', {
      'channelList':  channelListItems
    })
    .then(
      () => {
        alert('done');
        console.log('done');
      },
      (error) => {
        console.log(error);
        console.log('done');
        alert('not donee');

      }
    );
    localStorage.setItem('channelList', JSON.stringify(channelListItems));

    return channelListItems;
    // return this.http.post(this.baseUrl + 'channels',channelList);
  }
}
