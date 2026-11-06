'use client';
import { useState } from 'react'; // Para manejar datos que cambian
import Link from 'next/link';


const InitiativeCard = ({ initiative }: {
    // info que se recibe de las iniciativas
    initiative: {
    id: string,
    title: string,
    category: string,
    votes: number,
    description: string,
    author: string,
    }
}) => {
    const [votosActuales, setVotosActuales] = useState(initiative.votes); // Crear estado para los votos, crea variable, funcion, y luego el useState es el hook

    const manejarVoto = () => {
        setVotosActuales(votosActuales + 1);
    }


    // formato de las cartas
    return (
        // Envolvemos tarjeta en componente Link que apunta al id
        <Link 
            href={`/initiative/${initiative.id}?votos=${votosActuales}`}
            className="block border rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition-all cursor-pointer"
        >
            <h3 className="text-xl font-bold mb-2">{initiative.title}</h3>
            <p className="text-gray-600 mb-4">Votos: {votosActuales}</p>
            
            <button 
                onClick={(e) => {
                    e.preventDefault(); // 3. ¡CRÍTICO! Esto evita que el clic del botón dispare también el clic del enlace
                    manejarVoto();
                }} 
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full font-semibold transition-colors"
            >
                Votar
            </button>
        </Link>
    );
};

export default InitiativeCard;