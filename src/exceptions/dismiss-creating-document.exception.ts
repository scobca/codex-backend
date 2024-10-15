import { HttpException } from '@nestjs/common';
import { HttpCodesEnum } from '../../http-codes.enum';

export class DismissCreatingDocumentException<T> extends HttpException {
  constructor(content: string, model: T) {
    super(
      `Creating new document was dismissed: ${content}: ${model}`,
      HttpCodesEnum.NOT_FOUND,
    );
  }
}
