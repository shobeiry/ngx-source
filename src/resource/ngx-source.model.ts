import { SourceType } from './ngx-source-type.model';

export interface ISource {
  name: string;
  src: string;
  type?: SourceType;
  loaded?: boolean;
}

export class Source implements ISource {
  constructor(
    public name: string,
    public src: string,
    public type?: SourceType,
    public loaded?: boolean,
  ) {}
}
