import { client } from '@/lib/appwrite_client';
import { Databases, ID, Query } from "appwrite";
import { NextResponse } from "next/server";

const database = new Databases(client);
const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string;
const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_USER as string;

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Busca o usuário pelo email usando Query
    const response = await database.listDocuments(databaseId, collectionId, [
      Query.equal("email", params.id)
    ]);

    // Verifica se encontrou algum documento
    if (response.total === 0) {
      return NextResponse.json({ msg: "Usuário não encontrado!" }, { status: 404 });
    }

    const user = response.documents[0]; // Pega o primeiro usuário encontrado
    return NextResponse.json(user);
  } catch (error) {
    console.error("Erro ao buscar o projeto.", error);
    return NextResponse.json({ msg: "Erro ao buscar o projeto!" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!params.id) {
    return NextResponse.json({ msg: "ID do documento não fornecido!" }, { status: 400 });
  }

  try {
    console.log(`ID do documento para atualização: ${params.id}`);
    const { usuario, email, senha, imagem, nome } = await request.json();
    console.log("Dados recebidos para atualização:", { usuario, email, senha, imagem, nome }); // Log dos dados recebidos
    const response = await database.updateDocument(databaseId, collectionId, params.id, {
        usuario,
        email,
        senha,
        imagem,
        nome
    });
    return NextResponse.json({ msg: "Projeto atualizado com sucesso.", response });
  } catch (error) {
    console.error("Erro ao atualizar o projeto:", error);
    return NextResponse.json({ msg: "Erro ao atualizar o projeto!", error: (error as Error).message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    console.log(`ID do documento para exclusão: ${params.id}`);
    await database.deleteDocument(databaseId, collectionId, params.id);
    return NextResponse.json({ msg: "Projeto excluído com sucesso." });
  } catch (error) {
    console.error("Erro ao excluir o projeto.", error);
    return NextResponse.json({ msg: "Erro ao excluir o projeto!" }, { status: 500 });
  }
}