'use client';
import InitiativeCard from "../components/InitiativeCard";

const SAMPLE_INITIATIVES = [
{ id: '101', title: 'Campus Solar Canopy', category: 'Energy', votes: 14, description: 'Lorem ipsum', author: 'Dr. X' },
{ id: '102', title: 'Zero-Waste Cafeteria Loop', category: 'Waste', votes: 29, description: 'Lorem ipsum', author: 'Master Splinter' },
{ id: '103', title: 'Urban Rainwater Harvester', category: 'Water', votes: 8, description: 'Lorem ipsum', author: 'Dr. Banner' }
];

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-6">
      <div className="w-full max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SAMPLE_INITIATIVES.map((item) => (
            <InitiativeCard key={item.id} initiative={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;