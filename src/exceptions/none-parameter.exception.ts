import { HttpException } from '@nestjs/common';
import { HttpCodesEnum } from '../../http-codes.enum';

export class NoneParameterException<T> extends HttpException {
  constructor(content: string, model: T) {
    super(
      `Variable can't be equal null: ${content}: ${model}`,
      HttpCodesEnum.UNSUPPORTED_PARAMETER,
    );
  }
}
