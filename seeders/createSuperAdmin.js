import dotenv from 'dotenv';
import models from '../models';

dotenv.config();
const { User } = models;

const {
  SUPER_ADMIN_EMAIL,
  SUPER_ADMIN_PASSWORD,
  SUPER_ADMIN_NAME,
  SUPER_ADMIN_USERNAME,
  SUPER_ADMIN_ROLE
} = process.env;

/**
 * @description This is a class for registering a super user by default
 * @class CreateSuperAdmin
 */
export default class CreateSuperAdmin {
  /**
   * @description This is a method that registers the super admin
   * @static
   * @returns {object} - object representing response image
   * @memberof CreateSuperAdmin
   */
  static async registerSuperAdmin() {
    try {
      await User.findOrCreate({
        where: { $or: [{ username: SUPER_ADMIN_USERNAME }, { email: SUPER_ADMIN_EMAIL }] },
        defaults: {
          email: SUPER_ADMIN_EMAIL,
          password: SUPER_ADMIN_PASSWORD,
          name: SUPER_ADMIN_NAME,
          username: SUPER_ADMIN_USERNAME,
          role: SUPER_ADMIN_ROLE,
          verified: true
        }
      });
    } catch (error) {
      throw new Error('Could not register super admin.');
    }
  }
}
