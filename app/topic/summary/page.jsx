import React from 'react';

const dummySummary = [
  {
    topic: "Overview",
    content:
      "Geology is the scientific study of the Earth, including its materials, processes, and history. It helps us understand the formation of landscapes, natural resources, and geological hazards like earthquakes and volcanoes.",
  },
  {
    topic: "Topic 1: What is Geology?",
    content:
      "Geology examines Earth's physical structure, the processes that shape it, and its history over billions of years. Geologists study rocks, minerals, fossils, and natural events to understand Earth's past and predict future changes.",
  },
  {
    topic: "Topic 2: Why Study Geology?",
    content:
      "Geology helps us understand Earth's history, climate change, and its natural resources. It also aids in predicting geological hazards, such as earthquakes and volcanoes, that can have significant impacts on our lives.",
  },
  {
    topic: "Key Terms",
    content: `-Lithosphere: The rigid outer layer of the Earth, including the crust and upper mantle.\n
    -Erosion: The process of rocks and soil being worn away by wind, water, or ice.\n
    -Sedimentary Rock: A type of rock formed by the accumulation of mineral and organic particles over time.`,
  },
];

function Page() {
  return (
    <div className="max-w-3xl mx-auto items-start pt-8 bg-white rounded-lg">
      <div className="space-y-6">
        {dummySummary.map((section, index) => (
          <div key={index} className="p-4 border border-gray-300 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{section.topic}</h3>
            <p className="text-gray-700 whitespace-pre-line">{section.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Page;
