import { Location } from "./location.model";
export class Address
{
  location:Location;
  city:string;
  state:string;
  country:string;
  street:string;
  constructor()
  {
   this.location = new Location();
  }
}
