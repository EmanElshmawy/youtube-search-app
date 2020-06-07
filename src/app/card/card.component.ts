import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import {
  CdkDragDrop,
  moveItemInArray,
  CdkDragEnd,
} from '@angular/cdk/drag-drop';
import { CardService } from './services/card.service';
import Swal from 'sweetalert2';
declare let swal: any;
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Store, Select } from '@ngxs/store';
// import {SaveChannelListDB, UpdateChannelListDB} from '../shared/actions';
// import {SaveItemsState, SaveItemsStateModel} from '../shared/card-state';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() channelListItems = [];
  // @Output() searchUpdated: EventEmitter<any> = new EventEmitter<any>();

  youtubeForm;
  channelsData = [];
  finalsort = [];
  notes: FormArray;
  disabled: boolean;
  listed;

  // @Select(UpdateChannelListDB) channelListItems$: Observable<any>;

  constructor(
    private CardService: CardService,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private dbService: NgxIndexedDBService,
    private store: Store
  ) {
    this.youtubeForm = this.formBuilder.group({
      notes: this.formBuilder.array([]),
    });
    // dbService.currentStore = 'savedVideos';
  }

  getEmbededUrl(item) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.youtube.com/embed/' + item + '?ecver=2'
    );
  }
  createNote(): FormGroup {
    return this.formBuilder.group({
      note: '',
    });
  }
  addItem(): void {
    this.notes = this.youtubeForm.get('notes') as FormArray;
    this.notes.push(this.createNote());
  }

  ngOnInit(): void {
    this.getlastChannels();
  }

  getlastChannels() {
    if (this.channelListItems) {
      this.dbService.getAll('savedVideos').then(
        (channel) => {
          // channel.forEach((x) => {
            this.addItem();
          // });
          this.channelListItems = channel;
          this.channelListItems = this.channelListItems[0].channelList
          console.log( this.channelListItems )

        },
        (error) => {
          console.log(error);
        }
      );
    }

    // this.CardService.getCurrentChannels().subscribe(
    //   (data) => {
    //     this.channelListItems = data;
    //     // this.searchUpdated.emit(this.channelListItems);

    //     this.channelListItems.forEach((channel) => {
    //       this.addItem();
    //     });
    //   },
    //   (error) => {}
    // );
  }
  drop(event: CdkDragDrop<{ title: string; poster: string }[]>) {
    moveItemInArray(
      this.channelListItems,
      event.previousIndex,
      event.currentIndex
    );
    // this.store.dispatch(new UpdateChannelListDB(this.channelListItems));
    this.updateData(this.channelListItems);
  }

  saveBtn(event: CdkDragEnd) {
    // this.store.dispatch(new UpdateChannelListDB(this.channelListItems));

    // const that = this;
    // this.CardService.setDraggedChannels(this.channelListItems).subscribe(
    //   (data) => {
    //   //   setTimeout(() => {
    //   //     that.disabled = true;
    //   //   }, 2000);
    //   //   this.disabled = false;
    //   },
    //   (error) => {
    //   }
    // );
    this.updateData(this.channelListItems);
  }

  onSubmit() {
    // this.store.dispatch(new UpdateChannelListDB(this.channelListItems));

    // this.CardService.saveChannelList(this.channelListItems).subscribe(
    //   (data) => {
    //
    //   },
    //   (error) => {}
    // );
    this.updateData(this.channelListItems);
  }

  updateData(channelListItems) {
    this.dbService
      .update('savedVideos', {
        channelList: channelListItems,
      })
      .then(
        () => {
          Swal.fire({
            icon: 'success',
            title: 'Your comments has been saved',
            showConfirmButton: false,
            timer: 1550,
          });
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'please try again',
            showConfirmButton: false,
            timer: 1550,
          });
        }
      );
  }
}
