import * as dotenv from 'dotenv';

dotenv.config();

export const env = {
  baseUrl: process.env.BASE_URL || 'https://www.greencity.cx.ua/#/greenCity',
  headless: process.env.HEADLESS === 'true',
  retries: Number(process.env.RETRIES || 0),
  timeout: Number(process.env.TIMEOUT || 30000),
  userEmail: process.env.USER_EMAIL || '',
  userPassword: process.env.USER_PASSWORD || '',
};