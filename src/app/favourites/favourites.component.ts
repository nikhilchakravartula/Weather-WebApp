import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Address } from '../models/address.model';
import { FavoriteType } from '../models/favorites.model';
import { StorageService } from '../services/storage.service';


@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {


  favorites:Address[]|null|undefined;
  @Output() onFavoriteClick:EventEmitter<any>;

  constructor(private storageService:StorageService) {
    this.onFavoriteClick = new EventEmitter();
  }
  ngOnInit(): void {
    this.favorites = this.storageService.get();
  }

  onClickFavorite(event:Event,index:number)
  {
    event.preventDefault();
    if(this.favorites)
      this.onFavoriteClick.emit(this.favorites[index]);
    else this.onFavoriteClick.emit({'location':''});
  }
  onDeleteFavorite(event:Event,index:number)
  {
    event.preventDefault();
    if(this.favorites)
    {
        this.storageService.remove(this.favorites[index].city,this.favorites[index].state);
        this.favorites = this.storageService.get();
    }
  }
}
