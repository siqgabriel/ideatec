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
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION as string,
            [Query.orderAsc("$createdAt")]);
        return NextResponse.json(response.documents);
    } catch (error) {
        console.error("Falha na listagem de projetos.", error);
        return NextResponse.json({error:"Falha na listagem!" + error},{status:500});
    }
}

export async function POST(request:Request) {
    try {
        const { imagem, nome, tipo, nota, descricao, codigo, galeria, integrantes, materia, linguagem, link } = await request.json();

        const projeto = {
            nome,
            tipo,
            nota,
            descricao,
            codigo,
            integrantes,
            materia,
            imagem,
            galeria,
            linguagem,
            link 
        } as TipoProjeto;

        const response = await database.createDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION as string, ID.unique(), projeto);
        return NextResponse.json(response,{status:201});
        
    } catch (error) {
        console.error("Falha na criação de um novo produto.", error);
        return NextResponse.json({msg:"Falha na criação!"},{status:500});
    }
}