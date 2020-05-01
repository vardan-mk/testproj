import { Moment } from 'moment';

export interface ITemplate {
  id?: number;
  templateTitle?: string;
  templateContent?: string;
  paid?: boolean;
  creationDate?: Moment;
  updateDate?: Moment;
}

export class Template implements ITemplate {
  constructor(
    public id?: number,
    public templateTitle?: string,
    public templateContent?: string,
    public paid?: boolean,
    public creationDate?: Moment,
    public updateDate?: Moment
  ) {
    this.paid = this.paid || false;
  }
}
