import { BaseElasticComponentInterface } from '../../../config/base-elastic-component.interface';
import { UpdateBodyDto } from './update-body.dto';

export class UpdateElasticDocDto implements BaseElasticComponentInterface {
  id: string;
  index: string;
  body: Partial<UpdateBodyDto>;
}
