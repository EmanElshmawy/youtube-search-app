// import { Injectable } from '@angular/core';
// import { State, Action, StateContext } from '@ngxs/store';
// import { tap } from 'rxjs/operators';
// import {SaveChannelListDB, UpdateChannelListDB} from './actions';
// import {CardService} from '../card/services/card.service';
// export interface SaveItemsStateModel {
//     channelListItems: any;
// }

// @State<SaveItemsStateModel>({
//   name: 'youtubeVideos',
//   defaults: {
//     channelListItems: ''
//   }
// })
// @Injectable()
// export class SaveItemsState {
//   constructor(
//     private cardService:CardService) {}

//   @Action(SaveChannelListDB)

//   SaveChannelListDB(ctx: StateContext<SaveItemsStateModel>, action: SaveChannelListDB) {
//     return this.cardService.saveChannelList(action.channelListItems).pipe(
//         // retry(1),
//       tap(channelListItemsResult => {
//         const state = ctx.getState();
//         ctx.setState({
//           ...state,
//           channelListItems: [...state.channelListItems, channelListItemsResult]
//         });
//       })
//     );
//   }
  
//   @Action(UpdateChannelListDB)

//   updateChannelList(ctx: StateContext<SaveItemsStateModel>, action: UpdateChannelListDB) {
//     return this.cardService.setDraggedChannels(action.channelListItems).pipe(
//         // retry(1),
//       tap(channelListItemsResult => {
//         const state = ctx.getState();
//         ctx.setState({
//           ...state,
//           channelListItems: [...state.channelListItems, channelListItemsResult]
//         });
//       })
//     );
//   }
// }