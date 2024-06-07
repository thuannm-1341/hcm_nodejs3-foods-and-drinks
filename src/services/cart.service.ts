import { Repository } from 'typeorm';
import { AppDataSource } from '../config/ormConfig';
import { CartProductEntity } from '../entities/cartProduct.entity';
import { UserEntity } from '../entities/user.entity';
import { ProductService } from './product.service';
import { CART_MAX_QUANTITY, Error } from '../constants';

export class CartService {
  private readonly cartRepository: Repository<CartProductEntity>;
  private readonly productService: ProductService;
  constructor() {
    this.cartRepository = AppDataSource.getRepository(CartProductEntity);
    this.productService = new ProductService();
  }

  public async addToCart(
    user: UserEntity, 
    productId: number, 
  ): Promise< string | CartProductEntity> {
    const product = await this.productService.getProductDetail(productId);
    if(product===null){
      return Error.PRODUCT_NOT_FOUND;
    }
    const existingCartProduct = await this.cartRepository
    .createQueryBuilder('cartProduct')
    .leftJoinAndSelect('cartProduct.user', 'user')
    .leftJoinAndSelect('cartProduct.product', 'product')
    .where('user.id = :userId', {userId: user.id})
    .where('product.id = :productId', {productId: productId}).getOne();
    if(!existingCartProduct){
      const newCartProduct = this.cartRepository
      .create({quantity: 1, user, product});
      return this.cartRepository.save(newCartProduct);
    } else {
      existingCartProduct.quantity += 1;
      return this.cartRepository.save(existingCartProduct);
    }
  }

  public async getCartProducts(
    user: UserEntity, 
  ): Promise<CartProductEntity[]> {
    return this.cartRepository
    .createQueryBuilder('cartProduct')
    .leftJoinAndSelect('cartProduct.user', 'user')
    .leftJoinAndSelect('cartProduct.product', 'product')
    .where('user.id = :userId', {userId: user.id}).getMany();
  }

  public orderValue(items: CartProductEntity[], shippingFee: number): number {
    let totalValue = 0;
    items.forEach((item)=>{
      totalValue += item.quantity * item.product.currentPrice;
    });
    return totalValue + shippingFee;
  }

  public async updateCartProduct(
    cartProductId: number, 
    quantity: number,
  ): Promise< string | boolean> {
    const existingCartProduct = 
    await this.cartRepository.findOne({where: {id: cartProductId}});
    if (!existingCartProduct) {
      return false;
    }else{
      if (quantity <= 0) {
        await this.cartRepository.delete({id: cartProductId});
        return true;
      } else if (quantity <= CART_MAX_QUANTITY) {
        await this.cartRepository.update(
          {id: cartProductId}, 
          {quantity: quantity},
        );
        return true;
      } else {
        return Error.EXCEEDED_MAXIMUM_CART_QUANTITY;
      }
    }
  }
}
