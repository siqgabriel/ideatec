import { Account, Client, Databases } from 'appwrite';

export const client = new Client();
client
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT_URL as string)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string);

export const account = new Account(client);
export const databases = new Databases(client);