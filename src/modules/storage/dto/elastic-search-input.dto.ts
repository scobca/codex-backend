import { BaseElasticComponentInterface } from '../../../interfaces/base-elastic-component.interface';

export class ElasticSearchInputDto implements BaseElasticComponentInterface {
  index: string;
  id: string;
  title: string;
  content: string;

  constructor(
    index: string = '',
    id: string = '-1',
    title: string = '',
    content: string = '',
  ) {
    this.index = index;
    this.id = id;
    this.title = title;
    this.content = content;
  }
}
