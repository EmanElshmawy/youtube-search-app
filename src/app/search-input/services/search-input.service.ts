import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environment';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchInputService {
  baseUrl = environment.baseURl;
  Api_Key = environment.Api_Key;
  constructor(private http: HttpClient) {}

  getYoutubeChannels(channelId): Observable<any> {

    const url = `https://www.googleapis.com/youtube/v3/search?order=date&part=snippet&channelId=${channelId}&maxResults=10&key=${this.Api_Key}`;
    return this.http.get(url);
  }

  // setDraggedChannels(storedList): Observable<any> {
  //   return this.http.post(this.baseUrl + 'channels', storedList);
  // }
}
