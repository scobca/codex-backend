import { Inject, Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { NotExistException } from '../../../exceptions/not-exist.exception';
import { CreateNewElasticDto } from '../dto/create-new-elastic.dto';
import { DismissCreatingDocumentException } from '../../../exceptions/dismiss-creating-document.exception';
import { UpdateElasticDocDto } from '../dto/update-elastic-doc.dto';
import { DeleteElasticDocDto } from '../dto/delete-elastic-doc.dto';

@Injectable()
export class ElasticsProvider {
  constructor(
    @Inject(ElasticsearchService) private readonly ess: ElasticsearchService,
  ) {}

  // Return all documents if field "index" parameter equals void string and sort documents for index if field "index" not void
  async getAllDocuments(index: string) {
    try {
      const res = await this.ess.search({
        index,
        body: {
          query: { match_all: {} },
        },
      });

      return res.hits.hits;
    } catch (err) {
      if (err.meta.statusCode == 404) {
        throw new NotExistException('Topic with name', index);
      } else {
        throw err;
      }
    }
  }

  // Universal model for searching documents
  async getOne<T>(classDTO: T, index: string, query: string) {
    const excessVar: string[] = ['id', 'index'];
    const fields: string[] = Object.keys(classDTO).filter(
      (el: string) => !excessVar.includes(el),
    );

    const docs = await this.ess.search({
      index: index,
      body: {
        query: {
          multi_match: {
            query: query,
            fields: fields,
          },
        },
      },
    });

    return docs.hits.hits;
  }

  async create(data: CreateNewElasticDto) {
    try {
      return await this.ess.index({
        index: data.index,
        id: data.id,
        body: {
          title: data.title,
          content: data.content,
        },
      });
    } catch (err) {
      throw new DismissCreatingDocumentException('Error', err);
    }
  }

  async update(data: UpdateElasticDocDto) {
    try {
      return await this.ess.update({
        index: data.index,
        id: data.id,
        body: {
          doc: data.body,
        },
      });
    } catch (err) {
      throw err;
    }
  }

  async delete(data: DeleteElasticDocDto) {
    try {
      return await this.ess.delete({
        index: data.index,
        id: data.id,
      });
    } catch (err) {
      throw err;
    }
  }
}
