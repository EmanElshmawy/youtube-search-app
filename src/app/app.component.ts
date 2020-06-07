import { Component } from '@angular/core';
import { Store, Select } from '@ngxs/store';
// import { SaveChannelListDB } from './shared/actions';
// import { SaveItemsState, SaveItemsStateModel } from './shared/card-state';
import { NgxIndexedDBService } from 'ngx-indexed-db';

import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private store: Store ,private dbService: NgxIndexedDBService) {}

  recivedChannelList = [];
  // searchUpdated=[];

  ngOnInit() {

  }

  getSearchResult(result) {
    this.recivedChannelList = result.items;

    // Save DB
    this.dbService
    .update('savedVideos', {
      'channelList':  this.recivedChannelList
    })
    .then(
      () => {
        // alert('done');
        // console.log('done');
      },
      (error) => {
        console.log(error);
        console.log('done');
        alert('not donee');

      }
    );
    // this.store.dispatch(new SaveChannelListDB(this.recivedChannelList));

  }
}
