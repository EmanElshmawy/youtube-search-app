export class GetYoutubeVideos {
    static readonly type = '[Search-input] GetyoutubeVideos';
    constructor(public channelId: string) {}
  }

  // export class SaveChannelListDB {
  //   static readonly type = '[App] SaveChannelListDB';
  //   constructor(public channelListItems:any) {}
  // }

  // export class UpdateChannelListDB {
  //   static readonly type = '[Card] UpdateChannelListDB';
  //   constructor(public channelListItems:any) {}
  // }