'use client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { TipoProjeto } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default function Globals() {
    const [projetos, setProjetos] = useState<TipoProjeto[]>([]);
    const [Globalsrojetos, setGlobalsrojetos] = useState<TipoProjeto[]>([]);
    const [materiaSelecionada, setMateriaSelecionada] = useState<string>("");

    const consumoApi = async () => {
        const response = await fetch("https://ideatec.vercel.app/api/base-projetos");
        const dados = await response.json();
        setProjetos(dados);
        const Globalsrojects = dados.filter((projeto: TipoProjeto) => projeto.tipo === "Global Solution");
        setGlobalsrojetos(Globalsrojects);
    };

    useEffect(() => {
        consumoApi();
    }, []);

    const ProjetoDescricao = ({ descricao }: { descricao: string }) => {
        const [isExpanded, setIsExpanded] = useState(false);
        const maxLength = 40;

        return (
            <p className="text-gray-500 dark:text-white">
                {isExpanded ? descricao : `${descricao.substring(0, maxLength)}...`}
            </p>
        );
    };

    const gridClass = `grid grid-cols-${Math.min(Globalsrojetos.length, 4)} gap-4`;

    const materias = [...new Set(Globalsrojetos.map(projeto => projeto.materia))];

    const projetosFiltrados = materiaSelecionada
        ? Globalsrojetos.filter(projeto => projeto.materia === materiaSelecionada)
        : Globalsrojetos;

    return (
        <><section className="h-screen sec-cp-1">
            <iframe src="https://lottie.host/embed/cc87944b-f2c7-486c-b14c-e7ac11e7828f/PwGjd8UG31.json" className="w-[100%]" />
            <div className="mx-8 lg:mx-16 w-[70%] -mt-24 rounded-xl bg-white dark:bg-zinc-900 p-5 md:p-14 shadow-md  translate-y-[-150px]">
                <div>
                    <h1 className="text-4xl pb-5 dark:text-white">
                        Global Solution
                        <FontAwesomeIcon icon={faGlobe} className="text-4xl pl-10" />
                    </h1>
                    <p className="font-normal text-gray-500 pr-52 dark:text-white">
                        Check Point é um aplicativo de gerenciamento de projetos que permite a você e sua equipe
                        organizarem e acompanharem o progresso de seus projetos de forma eficiente e colaborativa.
                    </p>
                </div>
            </div>
        </section>

        <section className="h-[600px] sec-cp-2 mb-24">
            <div className="px-52">
                <select
                    value={materiaSelecionada}
                    onChange={(e) => setMateriaSelecionada(e.target.value)}
                    className="mb-4 p-2 border rounded bg-white dark:bg-zinc-900 dark:text-white"
                >
                    <option value="">Todas as matérias</option>
                    {materias.map(materia => (
                        <option key={materia} value={materia}>{materia}</option>
                    ))}
                </select>
                <div className={gridClass}>
                    {projetosFiltrados.map(projeto => (
                        <div key={projeto.$id} className="py-10 px-10 shadow-md rounded-xl bg-white dark:bg-zinc-900 flex flex-col space-y-3">
                            <Image src={projeto.imagem.toString()} alt={projeto.nome} width={500} height={300} className="rounded-md" />
                            <h2 className="text-xl dark:text-white">{projeto.nome}</h2>
                            <ProjetoDescricao descricao={projeto.descricao} />
                            <p className="text-custom text-lg font-semibold">Nota: {projeto.nota}</p>
                            <p className="text-gray-500">{projeto.materia}</p>
                            <Link href={`/globals/${projeto.$id}`} className="border-2 px-8 py-2 rounded-full bg-custom hover:bg-customBg border-custom text-center text-white">Ver Projeto</Link>
                        </div>
                    ))}
                </div>
            </div>
        </section></>
    );
}