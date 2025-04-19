import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface DbConfig {
  name: string;
  host: string;
  username: string;
  password?: string;
  database: string;
}

let dbConfig: DbConfig;

try {
  const configPath = path.join(__dirname, '../../database.config.json');
  const configData = fs.readFileSync(configPath, 'utf8');
  dbConfig = JSON.parse(configData);
} catch (error) {
  console.error(error);
  throw new Error('Failed to read or parse database configuration file.');
}

export const createConnection = async () => {
  if (!dbConfig) {
    throw new Error('Database configuration is not loaded.');
  }
  try {
    const connection = await mysql.createConnection({ host: dbConfig.host, user: dbConfig.username, password: dbConfig.password, database: dbConfig.database });
    console.log('Database connected');
    return connection;
  } catch (error) { console.error(error); throw new Error('Failed to connect to the database.'); }
};

export { dbConfig };
