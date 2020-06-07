import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CardService } from '../card/services/card.service';
import { SearchInputService } from './services/search-input.service';
import { Store, Select } from '@ngxs/store';
import { GetYoutubeVideos } from '../shared/actions';
import { Observable } from 'rxjs';
import { VideosState, VideosStateModel } from '../shared/state';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent implements OnInit {
  channelsList: any = [];
  channelsData = {};
  @ViewChild('searchId', { static: true }) searchForm: NgForm;

  @Output() searchResult: EventEmitter<any> = new EventEmitter<any>();

  @Select(VideosState) channelList$: Observable<any>;
  // constructor(private SearchInputService: SearchInputService , private CardService:CardService) {}
  constructor(private store: Store) {}
  ngOnInit(): void {}

  getchannels(form: NgForm) {
   console.log('clicked')
    this.store.dispatch(new GetYoutubeVideos(form.value.channelId));
    console.log(this.channelList$);
    this.channelList$.subscribe(
      (data: any) => {
          this.channelsList = data;
          this.channelsData = this.channelsList.channelList[0];
          console.log(data.channelList[0]);
          console.log(this.channelsData);
          if(this.channelsData){
            this.searchResult.emit(this.channelsData); 
          }
                
      },
      (error) => {
      }
    );
  }
}
