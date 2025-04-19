
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

// Mock configuration for client-side usage
// In a production app, this would be handled by an API
export const dbConfig = {
  name: "MyDatabase",
  host: "localhost",
  port: 5432,
  username: "dbuser",
  password: "dbpassword",
  database: "mydatabase"
};

// Client-side mock of database connection for development
// In a production app, database operations would be performed via API endpoints
export const createConnection = async () => {
  console.log('Client attempting to connect to database - this should be handled by an API in production');
  return {
    query: async (sql: string, params: any[] = []) => {
      console.log('Query executed:', sql, params);
      return [[], []]; // Mock empty result
    },
    end: () => console.log('Connection closed')
  };
};
