import { BaseElasticComponentInterface } from '../../../config/base-elastic-component.interface';

export class DeleteElasticDocDto implements BaseElasticComponentInterface {
  index: string;
  id: string;
}
