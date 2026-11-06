import Link from 'next/link';

const SAMPLE_INITIATIVES = [
  { id: '101', title: 'Campus Solar Canopy', category: 'Energy', votes: 14, description: 'Lorem ipsum', author: 'Dr. X' },
  { id: '102', title: 'Zero-Waste Cafeteria Loop', category: 'Waste', votes: 29, description: 'Lorem ipsum', author: 'Master Splinter' },
  { id: '103', title: 'Urban Rainwater Harvester', category: 'Water', votes: 8, description: 'Lorem ipsum', author: 'Dr. Banner' }
];


// Next.js pasa el id de la URL a traves de params
const InitiativeDetail = async ({
     params, searchParams
     }: { 
    params: Promise <{ id: string }>
    searchParams: Promise<{ votos?: string }>
    }) => {
    // Busca la iniciativa que coincida con el id de la URL
    const resolvedParams = await params;
    const resolvedSearchParams = await searchParams;

    const initiative = SAMPLE_INITIATIVES.find(item => item.id === resolvedParams.id)

    if (!initiative) {
    return <div className="p-10 text-center text-2xl">Iniciativa no encontrada</div>;
    }

    const votosParaMostrar = resolvedSearchParams.votos ? resolvedSearchParams.votos : initiative.votes;

    return (
            <div className="min-h-screen p-8 bg-gray-50 flex flex-col items-center">
                <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-sm border">
                    <Link href="/" className="text-blue-600 hover:underline mb-6 inline-block font-semibold">
                        &larr; Volver a todas las iniciativas
                    </Link>

                    <h1 className="text-4xl font-bold mb-4">{initiative.title}</h1>
                    
                    <div className="flex gap-4 text-sm text-gray-600 mb-6">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                        Categoría: {initiative.category}
                    </span>
                    <span className="px-3 py-1 border rounded-full">Autor: {initiative.author}</span>
                    <span className="px-3 py-1 border rounded-full bg-green-50">Votos: {votosParaMostrar}</span>
                </div>

                <div className="prose">
                    <h3 className="text-xl font-semibold mb-2">Descripción del proyecto</h3>
                    <p className="text-gray-700 leading-relaxed">{initiative.description}</p>
                </div>
            </div>
        </div>
    );
}

export default InitiativeDetail;

