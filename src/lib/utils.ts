
// General utilities only
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

export const dbConfig = {
  name: "MyDatabase",
  host: "localhost",
  port: 3306,
  username: "dbuser",
  password: "dbpassword",
  database: "mydatabase"
};

// Client-side mock of database connection
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
