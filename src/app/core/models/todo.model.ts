export class MTodo {
  id: string;
  name: string;
  finished: boolean;
  favourite: boolean;

  constructor(init?: Partial<MTodo>) {
    Object.assign(this, init);
  }
}
