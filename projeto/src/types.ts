import { Url } from "next/dist/shared/lib/router/router";

export type TipoUsuario = {
  $id: number;
  user: string;
  email: string;
  senha: string;
  imagem: string;
  nome: string;
}


export type TipoProjeto = {
  $id: number;
  nome: string;
  tipo: string;
  nota: number;
  descricao: string;
  codigo: string;
  integrantes: string[];
  materia: string;
  imagem: string;
  galeria: string[]; 
  linguagem: string;
  link: string;
}
  