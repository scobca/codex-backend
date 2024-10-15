import { BaseElasticComponentInterface } from '../../../interfaces/base-elastic-component.interface';

export class DeleteElasticDocDto implements BaseElasticComponentInterface {
  index: string;
  id: string;
}
