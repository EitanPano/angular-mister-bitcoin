import { Move } from "./move.model";

export class User {
  
  constructor(
    public name: string,
    public coins: number,
    public moves: Move[],
    public _id?: string,
    ) {}
}



