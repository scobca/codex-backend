import { BaseElasticComponentInterface } from '../../../interfaces/base-elastic-component.interface';

export class CreateNewElasticDto implements BaseElasticComponentInterface {
  index: string;
  id: string;
  title: string;
  content: string;
}
