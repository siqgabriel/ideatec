import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { TipoProjeto } from '@/types';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface GraficoProps {
  projetos: TipoProjeto[];
  usuarioId: number;
}

const Grafico: React.FC<GraficoProps> = ({ projetos = [] }) => {
  const dadosPorMateria = projetos.reduce((acc, projeto) => {
    if (!acc[projeto.materia]) {
      acc[projeto.materia] = [];
    }
    acc[projeto.materia].push(projeto.nota);
    return acc;
  }, {} as { [materia: string]: number[] });

  const datasets = Object.keys(dadosPorMateria).map((materia, index) => ({
    label: materia,
    data: dadosPorMateria[materia],
    borderColor: `hsl(${index * 60}, 70%, 50%)`,
    fill: false,
  }));

  const data = {
    labels: projetos.map((projeto) => projeto.nome),
    datasets: datasets,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Desempenho Anual por Matéria',
      },
    },
  };

  return <div className="grafico-container"><Line data={data} options={options} /></div>;
};

export default Grafico;
