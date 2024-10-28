import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import { TipoProjeto } from "@/types";
import { client } from '@/lib/appwrite_client';
import { Databases, ID, Query } from "appwrite";

const database = new Databases(client);

export async function GET() {
    try {
        const response = await database.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_USER as string,
            [Query.orderAsc("$createdAt")]);
        return NextResponse.json(response.documents);
    } catch (error) {
        console.error("Falha na listagem de produtos.", error);
        return NextResponse.json({error:"Falha na listagem!" + error},{status:500});
    }
}

export async function POST(request:Request) {
    try {
        const { user, email, senha, imagem, nome } = await request.json();

        const produto = {
            user,
            email,
            senha,
            imagem,
            nome
        } as unknown as TipoProjeto;

        const response = await database.createDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_USER as string, ID.unique(), produto);
        return NextResponse.json(response,{status:201});
        
    } catch (error) {
        console.error("Falha na criação de um novo produto.", error);
        return NextResponse.json({msg:"Falha na criação!"},{status:500});
    }
}