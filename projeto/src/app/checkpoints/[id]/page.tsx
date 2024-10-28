'use client';
import Link from "next/link";
import Image from "next/image";
import { TipoProjeto } from "@/types";
import { useState, useEffect } from "react";
import Galeria from "@/components/Galeria/Galeria";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';


interface Params {
  id: string;
}

const CheckpointID = ({ params }: { params: Params }) => {
  const [projeto, setProjeto] = useState<TipoProjeto | null>(null);

  useEffect(() => {
    const consumoApi = async () => {
      if (params.id) {
        try {
          const response = await fetch(`http://localhost:3000/api/base-projetos/${params.id}`);
          if (!response.ok) {
            throw new Error('Erro ao buscar o projeto');
          }
          const dados = await response.json();
          setProjeto(dados);
        } catch (error) {
          console.error(error);
        }
      } else {
        console.error("ID do projeto está indefinido");
      }
    };

    consumoApi();
  }, [params.id]);

  if (!projeto) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <section className="h-screen sec-cp-1 ">
        <iframe src="https://lottie.host/embed/cc87944b-f2c7-486c-b14c-e7ac11e7828f/PwGjd8UG31.json" />
        <div className="mx-8 lg:mx-16 w-[50%] -mt-24 rounded-xl bg-white dark:bg-zinc-900 p-5 md:p-14 shadow-md  translate-y-[-150px]">
          <div className="w-full grid grid-cols-2">
            <div className="">
              <h1 className="text-4xl pb-5 text-black dark:text-white">{projeto.nome}</h1>
              <p className="font-normal text-gray-500  dark:text-white">{projeto.descricao}</p>
            </div>
            <div className="flex justify-end">
              <Image src={projeto.imagem.toString()} alt={projeto.nome} width={500} height={300} className="rounded-md" />
            </div>
          </div>
        </div>
      </section>

      <section className="sec-cp-3 mb-5">
        <div className="flex flex-col py-10 px-10 shadow-md rounded-xl bg-white dark:bg-zinc-900 space-y-3 w-[70%] translate-y-[-50px] ">
          <div>
            <ul className="flex flex-wrap">
              <li className="flex items-center space-x-2 pr-40 pb-10">
                <h2 className="text-xl text-gray-500 font-semibold">Tipo da Avaliação:</h2>
                <h3 className="text-xl dark:text-white font-semibold">{projeto.tipo}</h3>
              </li>
              <li className="flex items-center space-x-2 pr-40 pb-10">
                <h2 className="text-xl text-gray-500 font-semibold">Materia:</h2>
                <h3 className="text-xl dark:text-white font-semibold">{projeto.materia}</h3>
              </li>
              <li className="flex items-center space-x-2 pr-40 pb-10">
                <h2 className="text-xl text-gray-500 font-semibold">Nota:</h2>
                <h3 className="text-xl text-custom font-semibold">{projeto.nota}</h3>
              </li>
              <li className="flex items-center space-x-2 pr-40 pb-10"> 
                <h2 className="text-xl text-gray-500 font-semibold">Integrantes:</h2>
                <h3 className="text-xl dark:text-white font-semibold">{projeto.integrantes}</h3>
              </li>
              <li className="flex items-center space-x-2 pr-40 pb-10"> 
                <h2 className="text-xl text-gray-500 font-semibold">Link:</h2>
                <a 
                  href={projeto.link} 
                  className="text-xl dark:text-white font-semibold cursor-pointer underline hover:text-custom" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {projeto.link}
                </a>
              </li>
            </ul>
          
            <Galeria galeria={projeto.galeria.map(url => new URL(url))} nome={projeto.nome} />

            <h2 className="text-2xl dark:text-white font-semibold" >Código:</h2>
            <SyntaxHighlighter language={projeto.linguagem} style={materialDark}>{projeto.codigo}</SyntaxHighlighter>
          </div>
        </div>
      </section>
    </>
  );
};

export default CheckpointID;

