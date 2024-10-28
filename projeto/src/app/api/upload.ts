import { client } from '@/lib/appwrite_client';
import { Storage, ID } from 'appwrite';
import { NextResponse } from 'next/server';

const storage = new Storage(client);
const bucketId = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_ID as string;

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ msg: 'Nenhum arquivo enviado.' }, { status: 400 });
    }

    const response = await storage.createFile(bucketId, ID.unique(), new File([file], 'uploaded_file'));
    return NextResponse.json({ fileName: response.$id });
  } catch (error) {
    console.error('Erro no upload da imagem:', error);
    return NextResponse.json({ msg: 'Erro no upload da imagem!', error: (error as Error).message }, { status: 500 });
  }
}