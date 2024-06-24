import { Repository } from 'typeorm';
import { FeedbackEntity } from '../entities/feedback.entity';
import { AppDataSource } from '../config/ormConfig';
import { createFeedbackDto } from '../commons/dtos/createFeedback.dto';
import { FeedbackPageOptions } from '../commons/dtos/feedbackPageOption.dto';
import { PageDto } from '../commons/dtos/page.dto';
import { PageMetaDto } from '../commons/dtos/pageMeta.dto';
import { UserEntity } from '../entities/user.entity';
import { ProductService } from './product.service';
import { Error } from '../constants';
import { ProductEntity } from '../entities/product.entity';
import { updateFeedbackDto } from '../commons/dtos/updateFeedback.dto';

export class FeedbackService {
  private readonly feedbackRepository: Repository<FeedbackEntity>;
  private readonly productService: ProductService;
  constructor() {
    this.feedbackRepository = AppDataSource.getRepository(FeedbackEntity);
    this.productService = new ProductService();
  }

  public async findOneById(id: number | string)
  : Promise<FeedbackEntity | null> {
    const feedbackId = typeof id === 'number' ? id : parseInt(id);
    return this.feedbackRepository.findOne({where: {id: feedbackId}});
  }

  public async findOneByUserAndProduct(userId: number, productId: number)
  : Promise<FeedbackEntity | null> {
    const query = this.feedbackRepository.createQueryBuilder('feedback')
    .leftJoin('feedback.user', 'user')
    .leftJoin('feedback.product', 'product')
    .where('product.id = :productId', {productId: productId})
    .andWhere('user.id = :userId', {userId: userId});
    return query.getOne();
  }

  public async createFeedback(createOption: createFeedbackDto, user: UserEntity)
  :Promise<FeedbackEntity> {
    const { productId , ...createData} = createOption;
    const product = await this.productService
    .getProductDetail(productId);
    if(product === null) {
      throw Error.PRODUCT_NOT_FOUND;
    }
    const existingFeedback = 
    await this.findOneByUserAndProduct(user.id, productId);
    if(existingFeedback) {
      this.feedbackRepository.merge(existingFeedback, createData);
      return existingFeedback;
    }
    const newFeedback = this.feedbackRepository.create({
      ...createOption,
      user,
      product,
    });
    const savedFeedback = await this.feedbackRepository.save(newFeedback);
    this.updateProductAverageStar(product);
    return savedFeedback;
  }

  public async updateFeedback(updateOption: updateFeedbackDto)
  : Promise<FeedbackEntity> {
    const { feedbackId, ...updatedData } = updateOption;
    const feedback = await this.feedbackRepository.findOne({
      where: {id: feedbackId },
      relations: ['product'],  
    });
    if(feedback===null){
      throw Error.FEEDBACK_NOT_FOUND;
    }
    this.feedbackRepository.merge(feedback, updatedData);
    const updatedFeedback = await this.feedbackRepository.save(feedback);
    this.updateProductAverageStar(feedback.product);
    return updatedFeedback;
  }

  public async getFeedbackPage(pageOptionsDto: FeedbackPageOptions)
  : Promise<PageDto<FeedbackEntity>> {
    const {
      sortField,
      order,
      take,
      skip,
      star,
      productId,
      haveImage,
      haveContent,
    } = pageOptionsDto;
    const query = this.feedbackRepository.createQueryBuilder('feedback')
    .leftJoinAndSelect('feedback.user', 'user')
    .leftJoinAndSelect('feedback.product', 'product');
    // Handle filter
    if(productId !== undefined){
      query.andWhere('product.id = :productId', {productId: productId});
    }
    if(star !== undefined){
      query.andWhere('feedback.star >= :star', {star: star});
    }
    if(haveImage) {
      query.andWhere('feedback.image IS NOT NULL');
    }
    if(haveContent) {
      query.andWhere('feedback.content IS NOT NULL');
    }
    // Handle sort
    query.orderBy('feedback.' + sortField, order)
    .addOrderBy('feedback.id', 'DESC');

    // Handle paging
    query.skip(skip).take(take);

    // Retrieve entities
    const itemCount = await query.getCount();
    const entities = await query.getMany();

    const pageMeta = new PageMetaDto({pageOptionsDto, itemCount});
    return new PageDto(entities, pageMeta);
  }

  private async updateProductAverageStar(product: ProductEntity)
  : Promise<void> {
    const { averageStar } = await this.feedbackRepository
      .createQueryBuilder('feedback')
      .leftJoin('feedback.product', 'product')
      .select('AVG(feedback.star)', 'averageStar') // Specify the table for the star column
      .where('product.id = :productId', { productId: product.id })
      .getRawOne();

    product.averageRating = parseFloat(averageStar) || 0;

    await this.productService.saveProduct(product);
  }
}
