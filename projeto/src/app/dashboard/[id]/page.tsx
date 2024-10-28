'use client';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '@/context/authContext';
import { useRouter } from 'next/navigation';
import { TipoProjeto, TipoUsuario } from '@/types';
import Image from 'next/image';
import PopupUsuario from '@/components/Popup/PopupUsuario';
import PopupProjeto from '@/components/Popup/PopupProjeto';
import PopupCriarProjeto from '@/components/Popup/CreateProjetoPopup';
import Link from 'next/link';
import Grafico from '@/components/Grafico/Grafico';
import Spinner from '@/components/Spinner/Spinner';

export default function Dashboard({ params }: { params: { id: string } }) {
    const { isAuthenticated, logout } = useAuth();
    const router = useRouter();
    const [showUserPopup, setShowUserPopup] = useState(false);
    const [showProjectPopup, setShowProjectPopup] = useState(false); 
    const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null); 
    const [showCreateProjectPopup, setShowCreateProjectPopup] = useState(false);  
    const [projetos, setProjetos] = useState<TipoProjeto[]>([]);
    const [usuario, setUsuario] = useState<TipoUsuario | null>(null);
    const [authChecked, setAuthChecked] = useState(false);
    const [materiaSelecionada, setMateriaSelecionada] = useState<string>("");

    const toggleUserPopup = () => {
        setShowUserPopup(!showUserPopup);
      };
    
    const toggleProjectPopup = (projectId: number | null = null) => {
    setSelectedProjectId(projectId);
    setShowProjectPopup(!showProjectPopup);
    };

    const toggleCreateProjectPopup = () => {
        setShowCreateProjectPopup(!showCreateProjectPopup);
      };

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('authToken');
            if (!token) {
                router.push('/login');
            } else {
                setAuthChecked(true);
            }
        };

        checkAuth();
    }, [router]);

    useEffect(() => {
        if (!authChecked) return;

        const consumoApiProjeto = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/base-projetos');
                if (!response.ok) {
                    throw new Error('Erro ao buscar os projetos');
                }
                const dados = await response.json();
                setProjetos(dados);
            } catch (error) {
                console.error(error);
            }
        };

        const consumoApiUsuario = async () => {
            if (params.id) {
                try {
                    const response = await fetch(`http://localhost:3000/api/base-usuarios/${params.id}`);
                    if (!response.ok) {
                        throw new Error('Erro ao buscar o usuário');
                    }
                    const dados = await response.json();
                    setUsuario(dados);
                } catch (error) {
                    console.error(error);
                }
            } else {
                console.error("ID do usuário está indefinido");
            }
        };

        consumoApiProjeto();
        consumoApiUsuario();
    }, [params.id, authChecked]);

    const verificaProjetoPorIntegrante = (projeto: TipoProjeto, nome: string) => {
        return projeto.integrantes.includes(nome);
    };

    const projetosFiltrados = projetos.filter(projeto => 
        verificaProjetoPorIntegrante(projeto, usuario?.nome || '')
    );

    if (!authChecked || !usuario) {
        return <Spinner />;
    }

    const ProjetoDescricao = ({ descricao }: { descricao: string }) => {
        const [isExpanded, setIsExpanded] = useState(false);
        const maxLength = 40;

        return (
            <p className="text-gray-500 dark:text-white">
                {isExpanded ? descricao : `${descricao.substring(0, maxLength)}...`}
            </p>
        );
    };

    const gridClass = `grid grid-cols-${Math.min(projetosFiltrados.length, 4)} gap-4`;

    const materias = [...new Set(projetosFiltrados.map(projeto => projeto.materia))];

    const projetosFiltradosMateria = materiaSelecionada
        ? projetosFiltrados.filter(projeto => projeto.materia === materiaSelecionada)
        : projetosFiltrados;

    const calcularMediaNotas = (projetos: TipoProjeto[]) => {
        if (projetos.length === 0) return 0;
        const somaNotas = projetos.reduce((acc, projeto) => acc + projeto.nota, 0);
        return (somaNotas / projetos.length).toFixed(2);
    };

    const mediaNotas = calcularMediaNotas(projetosFiltrados);

    return (
        <section className='min-h-screen w-full p-5 flex items-center'>
            <div className="h-full w-full bg-white dark:bg-zinc-900 p-16 flex flex-col justify-center">
                <div className="flex items-center mb-6 p-5 shadow-md rounded-full w-[30%] bg-gray-50 dark:bg-zinc-800">
                    <div className="flex items-center pr-6">
                        <img
                            src={usuario.imagem}
                            alt="User"
                            className="w-36 h-36 rounded-full mr-4"
                        />
                        <div>
                            <h2 className="text-xl font-bold dark:text-white">{usuario.nome}</h2>
                            <p className="text-gray-600 dark:text-gray-200">Média das notas: {mediaNotas}</p>

                        </div>
                    </div>
                    <div className="flex items-center">
                        <button onClick={toggleUserPopup} className="text-gray-600 hover:text-gray-900 mr-4">
                            <FontAwesomeIcon icon={faCog} className='text-2xl' />
                        </button>
                        <button onClick={logout} className="text-gray-600 hover:text-gray-900">
                            <FontAwesomeIcon icon={faSignOutAlt} className='text-2xl' />
                        </button>
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-4 dark:text-white">Desempenho Anual</h3>
                    <div className="w-[30%] h-64 bg-gray-200 rounded-lg">
                        <Grafico projetos={projetosFiltradosMateria} usuarioId={usuario?.$id} />
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-4 dark:text-white">Meus Projetos</h3>
                    <select
                        value={materiaSelecionada}
                        onChange={(e) => setMateriaSelecionada(e.target.value)}
                        className="mb-4 p-2 mr-4 border rounded bg-white dark:bg-zinc-900 dark:text-white"
                    >
                        <option value="">Todas as matérias</option>
                        {materias.map(materia => (
                            <option key={materia} value={materia}>{materia}</option>
                        ))}
                    </select>
                    <button onClick={toggleCreateProjectPopup} className="border-2 px-8 py-2 rounded-full bg-custom hover:bg-customBg border-custom text-center text-white">Adicionar Projeto</button>
                    <div className={gridClass}>
                        {projetosFiltradosMateria.length > 0 ? (
                            projetosFiltradosMateria.map((projeto) => (
                                <div key={projeto.$id} className="py-10 px-10 shadow-md rounded-xl bg-white dark:bg-zinc-800 flex flex-col space-y-3">
                                    <Image src={projeto.imagem.toString()} alt={projeto.nome} width={500} height={300} className="rounded-md" />
                                    <h2 className="text-xl dark:text-white">{projeto.nome}</h2>
                                    <ProjetoDescricao descricao={projeto.descricao} />
                                    <p className="text-custom text-lg font-semibold">Nota: {projeto.nota}</p>
                                    <p className="text-gray-500">{projeto.materia}</p>
                                    <button onClick={() => toggleProjectPopup(projeto.$id)} className="border-2 px-8 py-2 rounded-full bg-custom hover:bg-customBg border-custom text-center text-white">Editar Projeto</button>
                                </div>
                            ))
                        ) : (   
                            <p>O usuário não está associado a nenhum projeto.</p>
                        )}   
                    </div>
                </div>
            </div>
            <PopupUsuario
                showPopup={showUserPopup}
                togglePopup={toggleUserPopup}
                onClose={toggleUserPopup}
                handleDeleteUser={() => {}}
                userId={usuario?.$id ?? null} 
            >
                <div>Popup Content</div>
            </PopupUsuario>
            <PopupProjeto
                showPopup={showProjectPopup}
                togglePopup={() => toggleProjectPopup(null)}
                projectId={selectedProjectId}
                onClose={() => toggleProjectPopup(null)}
                handleDeleteProject={() => console.log('Deletar projeto')}
            >
                <div>Popup Content</div>
            </PopupProjeto>
            <PopupCriarProjeto
                showPopup={showCreateProjectPopup}
                togglePopup={toggleCreateProjectPopup}
                onClose={toggleCreateProjectPopup}
            >
                <div>Popup Content</div>
            </PopupCriarProjeto>
        </section>
    );
}
