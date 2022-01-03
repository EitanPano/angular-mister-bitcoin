import { makeId } from "../services/utils.service";


export class User {
  
  constructor(
    public name: string,
    public coins: number,
    public _id?: string,
    ) {}

  setId?() {   
    this._id = makeId(12);
  }
}



