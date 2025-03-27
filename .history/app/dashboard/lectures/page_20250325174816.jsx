'use client';
import Link from 'next/link';

const mockLectures = [
  { id: '1', title: 'Topic 1', description: 'Describe this topic', color: 'bg-indigo-500' },
  { id: '2', title: 'Topic 2', description: 'Describe this topic', color: 'bg-blue-500' },
  { id: '3', title: 'Topic 3', description: 'Describe this topic', color: 'bg-green-500' },
  { id: '4', title: 'Topic 4', description: 'Describe this topic', color: 'bg-pink-500' },
  { id: '5', title: 'Topic 5', description: 'Describe this topic', color: 'bg-blue-500' },
  { id: '6', title: 'Topic 6', description: 'Describe this topic', color: 'bg-indigo-500' },
];

export default function LecturesPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Lectures</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {mockLectures.map((lecture) => (
          <Link key={lecture.id} href={`/lectures/${lecture.id}/summary`}>
            <div className="bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer">
              <div className={`h-32 w-full rounded-t-xl ${lecture.color} relative`}>
                <span className="absolute top-2 right-2 text-white font-bold">{lecture.id}</span>
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold">{lecture.title}</h2>
                <p className="text-sm text-gray-500">{lecture.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
