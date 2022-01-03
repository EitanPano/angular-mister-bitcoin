import { makeId } from "../services/utils.service";


export class Contact {
  
  constructor(
    public name: string = '',
    public phone: string = '',
    public email: string = '',
    public _id?: string,
    ) {}

  setId?() {   
    this._id = makeId(12);
  }
}



