import { Injectable } from '@angular/core';
import { Address } from '../models/address.model';
import { FavoriteType } from '../models/favorites.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  favorites:FavoriteType;
  // changeEmitter:Subject<Address[]>;
  constructor() {
    let oldFavorites = localStorage.getItem('favorites');
    if(oldFavorites)
    {
      let oldFavoritesObj = JSON.parse(oldFavorites);
      this.favorites = oldFavoritesObj;
    }
    else this.favorites = {"values":[]};
  }

  add(value:Address):void
  {
    let valueCopy:Address = new Address();
    Object.assign(valueCopy,value);

    if(!this.favorites.values)
    {
      this.favorites.values = [];
      this.favorites.values.push(valueCopy);
    }
    else
    {
      this.favorites.values.push(valueCopy);
    }
    localStorage.setItem('favorites',JSON.stringify(this.favorites));
    // this.changeEmitter.next(true);

  }

  get():Address[]|null|undefined
  {
    if(this.favorites.values)
       return this.favorites.values.length!==0?this.favorites.values:null;
    return null;
  }

  remove(city:string,state:string)
  {
    let index:number = -1;
    if(this.favorites.values)
    {
      for (let i=0;i<this.favorites.values.length;i++)
      {
        if(this.favorites.values[i].city === city && this.favorites.values[i].state === state)
        {
            index = i;
            break;
        }
      }
      this.favorites.values.splice(index,1);
      localStorage.setItem('favorites',JSON.stringify(this.favorites));
      // this.changeEmitter.next(true);
    }
  }

  isFavorite(city:string,state:string):boolean
  {
    if(!this.favorites || !this.favorites.values)
    {
      return false;
    }
    for(let fav of this.favorites.values)
    {
      if(fav.city === city && fav.state === state)
      {
        return true;
      }
    }
    return false;
  }
  empty()
  {
    return localStorage.getItem('favorites')===null
  }
}
