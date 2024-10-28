import { client } from '@/lib/appwrite_client';
import { Databases, ID, Query } from "appwrite";
import { NextResponse } from "next/server";

const database = new Databases(client);
const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string;
const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION as string;

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const response = await database.getDocument(databaseId, collectionId, params.id);
    return NextResponse.json(response);
  } catch (error) {
    console.error("Erro ao buscar o projeto.", error);
    return NextResponse.json({ msg: "Erro ao buscar o projeto!" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const {
      nome,
      tipo,
      nota,
      descricao,
      materia,
      imagem,
      linguagem,
      link,
      codigo,
      integrantes,
      galeria
    } = await request.json();

    // Validações para garantir que os campos obrigatórios estão presentes
    if (!nome || !tipo || typeof nota !== 'number' || !descricao || !materia || !imagem || !linguagem || !link) {
      return NextResponse.json({ msg: "Campos obrigatórios ausentes!" }, { status: 400 });
    }

    const response = await database.updateDocument(databaseId, collectionId, params.id, {
      nome,
      tipo,
      nota,
      descricao,
      materia,
      imagem,
      linguagem,
      link,
      // Inclui apenas os campos opcionais que foram preenchidos
      ...(codigo && { codigo }),
      ...(integrantes && { integrantes }),
      ...(galeria && { galeria })
    });
    
    return NextResponse.json({ msg: "Projeto atualizado com sucesso.", response });
  } catch (error) {
    console.error("Erro ao atualizar o projeto.", error);
    return NextResponse.json({ msg: "Erro ao atualizar o projeto!" }, { status: 500 });
  }
}



export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await database.deleteDocument(databaseId, collectionId, params.id);
    return NextResponse.json({ msg: "Projeto excluído com sucesso." });
  } catch (error) {
    console.error("Erro ao excluir o projeto.", error);
    return NextResponse.json({ msg: "Erro ao excluir o projeto!" }, { status: 500 });
  }
}