// app/api/flashcards/[lectureId]/route.js

export async function GET(request, { params }) {
    const { lectureId } = params;
  
    const flashcardsByLecture = {
      '1': [
        { term: 'pygame.display.flip()', definition: 'Updates the screen to show the latest drawn frame' },
        { term: 'Event Loop', definition: 'A continuous loop that listens for and processes events' },
      ],
      '2': [
        { term: 'Encapsulation', definition: 'Combining data and functions into a single class structure' },
        { term: 'items-center', definition: 'Tailwind class to center items on the cross axis' },
      ],
      '3': [
        { term: 'useEffect', definition: 'Hook for side effects in React like fetching data' },
        { term: 'HOC (Higher-Order Component)', definition: 'Function that takes a component and returns a new one' },
      ],
    };
  
    const flashcards = flashcardsByLecture[lectureId] || [];
  
    return Response.json({ flashcards });
  }
  