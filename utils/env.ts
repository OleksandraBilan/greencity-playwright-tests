import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '..','.env') });

const BASE_UI_URL = process.env.BASE_UI_URL || 'http://playwright.dev/';
const HEADLESS = process.env.HEADLESS === 'true';

export { BASE_UI_URL, HEADLESS };