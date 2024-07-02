import { AdminEntity } from '../entities/admin.entity';
import { Error } from '../constants';
import { AppDataSource } from '../config/ormConfig';
import { AdminService } from '../services/admin.service';
import { LoginDto } from '../commons/dtos/login.dto';

jest.mock('jsonwebtoken');

describe('AuthService', () => {
  let adminService: AdminService;

  beforeAll(async () => {
    await AppDataSource.initialize();
    adminService = new AdminService();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  describe('adminLogin', () => {
    it('should return invalid credential error if admin is not found or password does not match', async () => {
      const loginDto: LoginDto = { userName: 'invalidData', password: '' };

      const result = await adminService.adminLogin(loginDto);
      expect(result).toBe(Error.INVALID_CREDENTIAL);
    });

    it('should return admin if credentials are valid', async () => {
      const loginDto: LoginDto = { userName: 'admin', password: '12345678' };

      const result = await adminService.adminLogin(loginDto);
      expect(result).toBeInstanceOf(AdminEntity);
      if (result instanceof AdminEntity) {
        expect(result.userName).toBe('admin');
      }
    });
  });

  describe('findById', () => {
    it('should return null if admin is not found', async () => {
      const result = await adminService.findById(2);
      expect(result).toBeNull();
    });

    it('should return admin if id is valid', async () => {
      const result = await adminService.findById(1);
      expect(result).toBeInstanceOf(AdminEntity);
      if (result instanceof AdminEntity) {
        expect(result.id).toBe(1);
      }
    });
  });

  describe('findById', () => {
    it('should return the correct admin dashboard common data', async () => {
      const result = await adminService.getAdminDashboardCommonData();

      // Compare with the expected values from the existing database
      // (based on seed data)
      const expectedData = {
        totalOrder: 0,
        totalProduct: 82,
        totalUser: 0,
        totalStore: 6,
        totalCategory: 6,
        totalRevenue: 0,
      };

      expect(result.totalOrder).toBe(expectedData.totalOrder);
      expect(result.totalProduct).toBe(expectedData.totalProduct);
      expect(result.totalUser).toBe(expectedData.totalUser);
      expect(result.totalStore).toBe(expectedData.totalStore);
      expect(result.totalCategory).toBe(expectedData.totalCategory);
      expect(result.totalRevenue).toBe(expectedData.totalRevenue);
    });
  });
});
