import { DBConfig } from 'ngx-indexed-db/ngx-indexed-db';

export const dbConfig: DBConfig = {
  
  name: 'youtubeDB',
  version: 1,
  objectStoresMeta: [
    {
      store: 'savedVideos',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'channelList', keypath: 'channelList', options: { unique: false } },
        // { name: 'channelKey', keypath: 'channelKey', options: { unique: false } },
      ],
    },
  ],
};
