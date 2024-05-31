import type { DataSource } from 'typeorm';
import type { Seeder } from 'typeorm-extension';
import { ProductEntity } from '../entities/product.entity';
import { CategoryEntity } from '../entities/category.entity';

export default class ProductSeeder implements Seeder {
  async run(dataSource: DataSource) {
    const productRepository = dataSource.getRepository(ProductEntity);
    const categoryRepository = dataSource.getRepository(CategoryEntity);
    const categories = await categoryRepository.find();
    const products = [
      {
        name: 'Combo Gà Rán 1',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/D-CBO-CHICKEN-1.jpg?v=41P1nL',
        basePrice: 59000,
        currentPrice: 59000,
        description:
          '1 Miếng Gà + 1 Khoai Tây Chiên / 1 Khoai Tây Nghiền & Bắp Cải Trộn + 1 Pepsi (lớn)',
        averageRating: 4.5,
        categories: [categories[0]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: 'Combo Gà Rán 2',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/D-CBO-CHICKEN-1.jpg?v=41P1nL',
        basePrice: 89000,
        currentPrice: 89000,
        description:
          '2 Miếng Gà + 1 Khoai Tây Chiên / 1 Khoai Tây Nghiền & Bắp Cải Trộn + 1 Pepsi (lớn)',
        averageRating: 5,
        categories: [categories[0]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: 'Combo Gà Quay',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/D-CBO-Big-Juicy.jpg?v=41P1nL',
        basePrice: 117000,
        currentPrice: 117000,
        description: '1 Đùi Gà Quay Flava + 1 Salad Hạt + 1 Lipton (lớn)',
        averageRating: 4,
        categories: [categories[0]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: 'Combo Phi-lê Gà Quay',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/D-CBO-Flava-Fillet.jpg?v=41P1nL',
        basePrice: 84000,
        currentPrice: 84000,
        description: '1 Đùi Gà Quay Flava + 1 Salad Hạt + 1 Lipton (lớn)',
        averageRating: 4,
        categories: [categories[0]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: 'Combo Burger Tôm',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/D-CBO-B-Shrimp.jpg?v=41P1nL',
        basePrice: 67000,
        currentPrice: 67000,
        description: '1 Burger Tôm + 1 Khoai Tây Chiên (vừa) + 1 Pepsi (lớn)',
        averageRating: 4,
        categories: [categories[0]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: 'Combo Burger Zinger',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/D-CBO-B-Zinger.jpg?v=41P1nL',
        basePrice: 77000,
        currentPrice: 77000,
        description:
          '1 Burger Zinger + 1 Khoai Tây Chiên (vừa) + 1 Pepsi (lớn)',
        averageRating: 4,
        categories: [categories[0]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: 'Combo Burger Phi-lê Gà Quay',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/D-CBO-B-Flava.jpg?v=41P1nL',
        basePrice: 77000,
        currentPrice: 77000,
        description: '1 Burger Flava + 1 Khoai Tây Chiên (vừa) + 1 Pepsi (lớn)',
        averageRating: 4,
        categories: [categories[0]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: 'Combo Burger Phi-lê Gà Quay',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/D-CBO-B-Flava.jpg?v=41P1nL',
        basePrice: 77000,
        currentPrice: 77000,
        description: '1 Burger Flava + 1 Khoai Tây Chiên (vừa) + 1 Pepsi (lớn)',
        averageRating: 4,
        categories: [categories[0]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: 'Combo Mì Ý Gà Viên',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/D-CBO-PastaPop2.jpg?v=41P1nL',
        basePrice: 47000,
        currentPrice: 47000,
        description: '1 Mì Ý Popcorn + 1 Pepsi (lớn)',
        averageRating: 4,
        categories: [categories[0]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: 'Combo Mì Ý Gà Zinger',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/D-CBO-Pasta-Zinger.jpg?v=41P1nL',
        basePrice: 67000,
        currentPrice: 67000,
        description: '1 Mì Ý Zinger + 1 Pepsi (lớn)',
        averageRating: 5,
        categories: [categories[0]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: 'Combo Mì Ý Gà Rán',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/CBO-Pasta.jpg?v=41P1nL',
        basePrice: 77000,
        currentPrice: 77000,
        description: '1 Mì Ý Gà Rán + 1 Pepsi (lớn)',
        averageRating: 5,
        categories: [categories[0]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: 'Box Meal Pasta Popcorn',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/D-CBO-PastaPop.jpg?v=41P1nL',
        basePrice: 77000,
        currentPrice: 77000,
        description: '1 Mì Ý Popcorn + 1 Miếng Gà + 1 Pepsi (lớn)',
        averageRating: 5,
        categories: [categories[0]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: 'Box Meal Pasta Zinger',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/D-CBO-Pasta-Zinger-Chicken.jpg?v=41P1nL',
        basePrice: 77000,
        currentPrice: 77000,
        description: '1 Mì Ý Zinger + 1 Miếng Gà + 1 Pepsi (lớn)',
        averageRating: 5,
        categories: [categories[0]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: 'Box Meal Pasta COB',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/Pasta-Nuggets.jpg?v=41P1nL',
        basePrice: 97000,
        currentPrice: 97000,
        description: '1 Mì Ý Gà Rán + 3 Gà Miếng Nuggets + 1 Pepsi (lớn)',
        averageRating: 5,
        categories: [categories[0]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: 'Combo Cơm Gà Rán',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/D-CBO-Rice-COB.jpg?v=41P1nL',
        basePrice: 71000,
        currentPrice: 71000,
        description: '1 Cơm Gà Rán + 1 Súp Rong Biển + 1 Pepsi (lớn)',
        averageRating: 5,
        categories: [categories[0]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: 'Combo Cơm Gà Teriyaki',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/D-CBO-Rice-COB.jpg?v=41P1nL',
        basePrice: 69000,
        currentPrice: 69000,
        description: '1 Cơm Teriyaki + 1 Súp Rong Biển + 1 Pepsi (lớn)',
        averageRating: 5,
        categories: [categories[0]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: 'Combo Cơm Phi-lê Gà Quay',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/D-CBO-Rice-Flava.jpg?v=41P1nL',
        basePrice: 71000,
        currentPrice: 71000,
        description: '1 Cơm Gà Flava + 1 Súp Rong Biển + 1 Pepsi (lớn)',
        averageRating: 4,
        categories: [categories[0]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: 'Combo nhóm 1',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/D-CBO-Bucket-1.jpg?v=41P1nL',
        basePrice: 127000,
        currentPrice: 127000,
        description: '2 Miếng Gà + 1 Burger Zinger + 2 Pepsi (lớn)',
        averageRating: 4,
        categories: [categories[1]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: 'Combo nhóm 2',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/D-CBO-Bucket-2.jpg?v=41P1nL',
        basePrice: 160000,
        currentPrice: 160000,
        description:
          '3 Miếng Gà + 1 Mì Ý Popcorn + 1 Khoai Tây Chiên (vừa) + 2 Pepsi (lớn)',
        averageRating: 4,
        categories: [categories[1]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: 'Combo nhóm 3',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/D-CBO-Bucket-3.jpg?v=41P1nL',
        basePrice: 167000,
        currentPrice: 167000,
        description: '4 Miếng Gà + 1 Khoai Tây Múi Cau (vừa) + 2 Pepsi (lớn)',
        averageRating: 4,
        categories: [categories[1]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: 'Combo nhóm 4',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/D-CBO-Bucket-4.jpg?v=41P1nL',
        basePrice: 205000,
        currentPrice: 205000,
        description: '5 Miếng Gà + 1 Khoai Tây Chiên (vừa) + 3 Pepsi (lớn)',
        averageRating: 5,
        categories: [categories[1]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: 'Combo nhóm 5',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/D-CBO-Bucket-5.jpg?v=41P1nL',
        basePrice: 275000,
        currentPrice: 275000,
        description:
          '6 Miếng Gà + 1 Mì Ý Popcorn + 1 Khoai Tây Múi Cau (vừa) + 4 Pepsi (lớn)',
        averageRating: 5,
        categories: [categories[1]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: '1 Miếng Gà Rán',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/1-Fried-Chicken.jpg?v=41P1nL',
        basePrice: 35000,
        currentPrice: 35000,
        description: '1 Miếng Gà Giòn Cay/Gà Truyền Thống/Gà Giòn Không Cay',
        averageRating: 5,
        categories: [categories[2]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: '2 Miếng Gà Rán',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/2-Fried-Chicken.jpg?v=41P1nL',
        basePrice: 70000,
        currentPrice: 70000,
        description: '2 Miếng Gà Giòn Cay/Gà Truyền Thống/Gà Giòn Không Cay',
        averageRating: 5,
        categories: [categories[2]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: '3 Miếng Gà Rán',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/3-Fried-Chicken.jpg?v=41P1nL',
        basePrice: 104000,
        currentPrice: 104000,
        description: '3 Miếng Gà Giòn Cay/Gà Truyền Thống/Gà Giòn Không Cay',
        averageRating: 5,
        categories: [categories[2]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: '6 Miếng Gà Rán',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/6-Fried-Chicken-new.jpg?v=41P1nL',
        basePrice: 204000,
        currentPrice: 204000,
        description: '6 Miếng Gà Giòn Cay/Gà Truyền Thống/Gà Giòn Không Cay',
        averageRating: 4.5,
        categories: [categories[2]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: '1 Miếng Đùi Gà Quay',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/BJ.jpg?v=41P1nL',
        basePrice: 75000,
        currentPrice: 75000,
        description: '1 Miếng Đùi Gà Quay Giấy Bạc/Đùi Gà Quay Tiêu',
        averageRating: 4.5,
        categories: [categories[2]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: '1 Miếng Phi-lê Gà Quay',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/MOD-PHI-LE-GA-QUAY.jpg?v=41P1nL',
        basePrice: 39000,
        currentPrice: 39000,
        description: '1 Miếng Phi-lê Gà Quay Flava/Phi-lê Gà Quay Tiêu',
        averageRating: 4.5,
        categories: [categories[2]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: '3 Cánh Gà Hot Wings',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/3-HW.jpg?v=41P1nL',
        basePrice: 54000,
        currentPrice: 54000,
        description: '1 Miếng Phi-lê Gà Quay Flava/Phi-lê Gà Quay Tiêu',
        averageRating: 4.5,
        categories: [categories[2]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: '5 Cánh Gà Hot Wings',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/5-HW.jpg?v=41P1nL',
        basePrice: 85000,
        currentPrice: 85000,
        description: '5 Cánh Gà Hot Wings',
        averageRating: 4.5,
        categories: [categories[2]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: 'Gà Viên (Vừa)',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/POP-R.jpg?v=41P1nL',
        basePrice: 38000,
        currentPrice: 38000,
        description: 'Gà Viên (Vừa)',
        averageRating: 4.5,
        categories: [categories[2]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: 'Gà Viên (Vừa)',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/POP-L.jpg?v=41P1nL',
        basePrice: 64000,
        currentPrice: 64000,
        description: 'Gà Viên (Lớn)',
        averageRating: 4.5,
        categories: [categories[2]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: '3 Gà Miếng Nuggets',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/3_Nuggests.jpg?v=41P1nL',
        basePrice: 27000,
        currentPrice: 27000,
        description: '3 Gà Miếng Nuggets',
        averageRating: 3,
        categories: [categories[2]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: '5 Gà Miếng Nuggets',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/5_Nuggests.jpg?v=41P1nL',
        basePrice: 40000,
        currentPrice: 40000,
        description: '5 Gà Miếng Nuggets',
        averageRating: 4,
        categories: [categories[2]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: '10 Gà Miếng Nuggets',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/10_Nuggests.jpg?v=41P1nL',
        basePrice: 75000,
        currentPrice: 75000,
        description: '10 Gà Miếng Nuggets',
        averageRating: 4.5,
        categories: [categories[2]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: 'Burger Zinger',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/Burger-Zinger.jpg?v=41P1nL',
        basePrice: 54000,
        currentPrice: 54000,
        description: '1 Burger Zinger',
        averageRating: 4.5,
        categories: [categories[3]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: 'Burger Tôm',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/Burger-Shrimp.jpg?v=41P1nL',
        basePrice: 45000,
        currentPrice: 45000,
        description: 'Burger Tôm',
        averageRating: 5,
        categories: [categories[3]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: 'Burger Gà Quay Flava',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/Burger-Flava.jpg?v=41P1nL',
        basePrice: 54000,
        currentPrice: 54000,
        description: 'Burger Gà Quay Flava',
        averageRating: 5,
        categories: [categories[3]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: 'Cơm Gà Xiên Que',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/Rice-Skewer.jpg?v=41P1nL',
        basePrice: 45000,
        currentPrice: 45000,
        description: 'Cơm Gà Xiên Que',
        averageRating: 3.5,
        categories: [categories[3]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: 'Cơm Gà Teriyaki',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/Rice-Teriyaki.jpg?v=41P1nL',
        basePrice: 45000,
        currentPrice: 45000,
        description: 'Com Gà Teriyaki',
        averageRating: 4.5,
        categories: [categories[3]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: 'Cơm Gà Rán',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/Rice-F.Chicken.jpg?v=41P1nL',
        basePrice: 48000,
        currentPrice: 48000,
        description: 'Cơm Gà Rán',
        averageRating: 4.5,
        categories: [categories[3]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: 'Cơm Phi-lê Gà Quay',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/Rice-Flava.jpg?v=41P1nL',
        basePrice: 47000,
        currentPrice: 47000,
        description: 'Cơm Phi-lê Gà Quay',
        averageRating: 4.5,
        categories: [categories[3]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: 'Cơm',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/Rice.jpg?v=41P1nL',
        basePrice: 12000,
        currentPrice: 12000,
        description: 'Cơm',
        averageRating: 4,
        categories: [categories[3]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: 'Mì Ý Gà Viên',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/MI-Y-GA-VIEN.jpg?v=41P1nL',
        basePrice: 40000,
        currentPrice: 40000,
        description: '1 Mì Ý Gà Viên',
        averageRating: 5,
        categories: [categories[3]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: 'Mì Ý Gà Zinger',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/MI-Y-GA-ZINGER.jpg?v=41P1nL',
        basePrice: 58000,
        currentPrice: 58000,
        description: '1 Mì Ý Gà Zinger',
        averageRating: 4.5,
        categories: [categories[3]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: '1 Mì Ý Phi-Lê Gà Quay',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/MI-Y-PHILE-GA-QUAY.jpg?v=41P1nL',
        basePrice: 61000,
        currentPrice: 61000,
        description: '1 Mì Ý Phi-Lê Gà Quay',
        averageRating: 4.5,
        categories: [categories[3]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: 'Mì Ý Gà Rán',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/MI-Y-GA-RAN.jpg?v=41P1nL',
        basePrice: 64000,
        currentPrice: 64000,
        description: '1 Mì Ý Gà Rán',
        averageRating: 4.5,
        categories: [categories[3]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: 'Salad Hạt',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/SALAD-HAT.jpg?v=41P1nL',
        basePrice: 38000,
        currentPrice: 38000,
        description: '1 Salad Hạt',
        averageRating: 4,
        categories: [categories[4]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: 'Salad Pop',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/SALAD-HAT.jpg?v=41P1nL',
        basePrice: 45000,
        currentPrice: 45000,
        description: '1 Salad Hạt Gà Viên Popcorn',
        averageRating: 5,
        categories: [categories[4]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: '3 Cá Thanh',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/3-Fishsticks.jpg?v=41P1nL',
        basePrice: 40000,
        currentPrice: 40000,
        description: '3 Cá Thanh',
        averageRating: 2.9,
        categories: [categories[4]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: '2 Xiên Que',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/2-Skewers.jpg?v=41P1nL',
        basePrice: 40000,
        currentPrice: 40000,
        description: '2 Xiên Que',
        averageRating: 4.1,
        categories: [categories[4]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: '4 Phô Mai Viên',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/4-Chewy-Cheese.jpg?v=41P1nL',
        basePrice: 36000,
        currentPrice: 36000,
        description: '4 Phô Mai Viên',
        averageRating: 4,
        categories: [categories[4]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: '6 Phô Mai Viên',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/6-Chewy-Cheese.jpg?v=41P1nL',
        basePrice: 49000,
        currentPrice: 49000,
        description: '6 Phô Mai Viên',
        averageRating: 4.5,
        categories: [categories[4]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: 'Khoai Tây Chiên (Vừa)',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/FF-R.jpg?v=41P1nL',
        basePrice: 19000,
        currentPrice: 19000,
        description: '01 Khoai Tây Chiên (Vừa)',
        averageRating: 4.5,
        categories: [categories[4]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: 'Khoai Tây Chiên (Lớn)',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/FF-L.jpg?v=41P1nL',
        basePrice: 28000,
        currentPrice: 28000,
        description: '01 Khoai Tây Chiên (Lớn)',
        averageRating: 4.5,
        categories: [categories[4]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: 'Khoai Tây Múi Cau (Vừa)',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/FF-J.jpg?v=41P1nL',
        basePrice: 23000,
        currentPrice: 23000,
        description: '01 Khoai Tây Múi Cau (vừa)',
        averageRating: 4,
        categories: [categories[4]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: 'Khoai Tây Múi Cau (Lớn)',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/khoai-mui-cau-L.jpg?v=41P1nL',
        basePrice: 43000,
        currentPrice: 43000,
        description: '01 Khoai Tây Múi Cau (lớn)',
        averageRating: 4,
        categories: [categories[4]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: 'Khoai Tây Nghiền (Vừa)',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/MP-(R)-new.jpg?v=41P1nL',
        basePrice: 12000,
        currentPrice: 12000,
        description: 'Khoai Tây Nghiền (Vừa)',
        averageRating: 4,
        categories: [categories[4]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: 'Khoai Tây Nghiền (Lớn)',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/MP-(L)-new.jpg?v=41P1nL',
        basePrice: 22000,
        currentPrice: 22000,
        description: 'Khoai Tây Nghiền (Lớn)',
        averageRating: 4.5,
        categories: [categories[4]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: 'Khoai Tây Nghiền (Đại)',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/MP-(J)-new.jpg?v=41P1nL',
        basePrice: 31000,
        currentPrice: 31000,
        description: 'Khoai Tây Nghiền (Đại)',
        averageRating: 4.5,
        categories: [categories[4]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: 'Bắp Cải Trộn (Vừa)',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/CL-(R)-new.jpg?v=41P1nL',
        basePrice: 12000,
        currentPrice: 12000,
        description: 'Bắp Cải Trộn (Vừa)',
        averageRating: 4.5,
        categories: [categories[4]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: 'Bắp Cải Trộn (Lớn)',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/CL-(L)-new.jpg?v=41P1nL',
        basePrice: 22000,
        currentPrice: 22000,
        description: 'Bắp Cải Trộn (Lớn)',
        averageRating: 4.5,
        categories: [categories[4]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: 'Bắp Cải Trộn (Đại)',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/CL-(J)-new.jpg?v=41P1nL',
        basePrice: 31000,
        currentPrice: 31000,
        description: 'Bắp Cải Trộn (Đại)',
        averageRating: 4.5,
        categories: [categories[4]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: 'Súp Rong Biển',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/Soup-Rong-Bien.jpg?v=41P1nL',
        basePrice: 19000,
        currentPrice: 19000,
        description: 'Súp Rong Biển',
        averageRating: 4.5,
        categories: [categories[4]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: '1 Bánh Trứng',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/1-eggtart.jpg?v=41P1nL',
        basePrice: 18000,
        currentPrice: 18000,
        description: '1 Bánh Trứng',
        averageRating: 5,
        categories: [categories[5]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: '4 Bánh Trứng',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/4-eggtart.jpg?v=41P1nL',
        basePrice: 58000,
        currentPrice: 58000,
        description: '4 Bánh Trứng',
        averageRating: 5,
        categories: [categories[5]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: '2 Viên Khoai Môn Kim Sa',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/2-taro.jpg?v=41P1nL',
        basePrice: 26000,
        currentPrice: 26000,
        description: '2 Viên Khoai Môn Kim Sa',
        averageRating: 4.5,
        categories: [categories[5]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: '3 Viên Khoai Môn Kim Sa',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/3-taro.jpg?v=41P1nL',
        basePrice: 34000,
        currentPrice: 34000,
        description: '3 Viên Khoai Môn Kim Sa',
        averageRating: 4.5,
        categories: [categories[5]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: '5 Viên Khoai Môn Kim Sa',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/5-taro.jpg?v=41P1nL',
        basePrice: 54000,
        currentPrice: 54000,
        description: '5 Viên Khoai Môn Kim Sa',
        averageRating: 4.5,
        categories: [categories[5]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: '2 Thanh Bí Phô Mai',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/2-Pumcheese.jpg?v=41P1nL',
        basePrice: 29000,
        currentPrice: 29000,
        description: '2 Thanh Bí Phô Mai',
        averageRating: 4.5,
        categories: [categories[5]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: '3 Thanh Bí Phô Mai',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/3-Pumcheese.jpg?v=41P1nL',
        basePrice: 42000,
        currentPrice: 42000,
        description: '3 Thanh Bí Phô Mai',
        averageRating: 4.5,
        categories: [categories[5]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: '5 Thanh Bí Phô Mai',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/5-Pumcheese.jpg?v=41P1nL',
        basePrice: 65000,
        currentPrice: 65000,
        description: '5 Thanh Bí Phô Mai',
        averageRating: 4.5,
        categories: [categories[5]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: 'Pepsi Lon',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/PEPSI_CAN.jpg?v=41P1nL',
        basePrice: 19000,
        currentPrice: 19000,
        description: 'Pepsi Lon',
        averageRating: 5,
        categories: [categories[5]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: '7Up Lon',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/7UP_CAN.jpg?v=4BJOe4',
        basePrice: 19000,
        currentPrice: 19000,
        description: '7Up Lon',
        averageRating: 5,
        categories: [categories[5]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: 'Aquafina 500ml',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/AQUAFINA.jpg?v=41P1nL',
        basePrice: 15000,
        currentPrice: 15000,
        description: 'Aquafina 500ml',
        averageRating: 5,
        categories: [categories[5]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: 'Trà Đào',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/Peach-Tea.jpg?v=41P1nL',
        basePrice: 24000,
        currentPrice: 24000,
        description: 'Trà Đào',
        averageRating: 5,
        categories: [categories[5]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: 'Sô-cô-la Sữa Đá',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/ChoCo_Ice.jpg?v=41P1nL',
        basePrice: 20000,
        currentPrice: 20000,
        description: '01 Sô-cô-la Sữa Đá',
        averageRating: 5,
        categories: [categories[5]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: 'Sô-cô-la Sữa Nóng',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/ChoCo_Hot.jpg?v=41P1nL',
        basePrice: 20000,
        currentPrice: 20000,
        description: '01 Sô-cô-la Sữa Nóng',
        averageRating: 5,
        categories: [categories[5]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: 'Sô-cô-la Sữa Nóng',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/ChoCo_Hot.jpg?v=41P1nL',
        basePrice: 20000,
        currentPrice: 20000,
        description: '01 Sô-cô-la Sữa Nóng',
        averageRating: 5,
        categories: [categories[5]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: 'Trà Chanh Lipton (Lớn)',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/Lipton.jpg?v=41P1nL',
        basePrice: 17000,
        currentPrice: 17000,
        description: 'Trà Chanh Lipton (Lớn)',
        averageRating: 5,
        categories: [categories[5]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: 'Trà Chanh Lipton (Vừa)',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/Lipton.jpg?v=41P1nL',
        basePrice: 12000,
        currentPrice: 12000,
        description: 'Trà Chanh Lipton (Vừa)',
        averageRating: 5,
        categories: [categories[5]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
      {
        name: 'Pepsi Không Calo Lon',
        image:
          'https://static.kfcvietnam.com.vn/images/items/lg/pepsi-zero.jpg?v=41P1nL',
        basePrice: 19000,
        currentPrice: 19000,
        description: 'Pepsi Không Calo Lon',
        averageRating: 5,
        categories: [categories[5]],
        cartProducts: [],
        feedbacks: [],
        orderProducts: [],
      },
    ];
    for (const product of products) {
      const savedProduct = await productRepository.save(product);
      console.log(`Inserted product with id: ${savedProduct.id}`);
    }
  }
}
