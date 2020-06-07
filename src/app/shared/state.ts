import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { tap, retry } from 'rxjs/operators';
import {GetYoutubeVideos} from './actions';
import { SearchInputService } from '../search-input/services/search-input.service';
export interface VideosStateModel {
  channelList: any;
}

@State<VideosStateModel>({
  name: 'youtubeVideos',
  defaults: {
    channelList: ''
  }
})
@Injectable()
export class VideosState {
  constructor(private searchInputService: SearchInputService) {}

  @Action(GetYoutubeVideos)
  
  channelList(ctx: StateContext<VideosStateModel>, action: GetYoutubeVideos) {
    return this.searchInputService.getYoutubeChannels(action.channelId).pipe(
      retry(1),
      tap(channelListResult => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          channelList: [...state.channelList, channelListResult]
        });
      })
    );
  }
  
}