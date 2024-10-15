import { HttpException } from '@nestjs/common';
import { HttpCodesEnum } from '../../http-codes.enum';

export class DocNotExistException<T> extends HttpException {
  constructor(content: string, model: T) {
    super(
      `Content not available or not exist (${content}: ${model}).`,
      HttpCodesEnum.NOT_FOUND,
    );
  }
}
