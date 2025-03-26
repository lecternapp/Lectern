// app/api/quizzes/[lectureId]/route.js

export async function GET(request, { params }) {
    const { lectureId } = params;
  
    // ✅ Dynamic quiz questions based on lecture ID
    const questionsByLecture = {
      '1': [
        {
          id: 1,
          type: 'definition',
          prompt: 'pygame.display.flip()',
          choices: [
            'pause the game for a set duration',
            'update screen to show latest drawn images',
            'clear the screen of all images',
            'initialize the graphics engine',
          ],
          answer: 'update screen to show latest drawn images',
        },
        {
          id: 2,
          type: 'term',
          prompt: 'Event Loop',
          choices: [
            'A cycle that runs every frame in games',
            'The UI event dispatcher in Python',
            'A method to draw shapes to canvas',
            'Library to handle audio input',
          ],
          answer: 'A cycle that runs every frame in games',
        },
      ],
      '2': [
        {
          id: 1,
          type: 'term',
          prompt: 'Encapsulation',
          choices: [
            'Combining data and behavior into a single unit',
            'CSS layout technique',
            'The event loop controller',
            'Static typing rule in Python',
          ],
          answer: 'Combining data and behavior into a single unit',
        },
        {
          id: 2,
          type: 'definition',
          prompt: 'Tailwind utility `items-center`',
          choices: [
            'Aligns items to the left',
            'Distributes items evenly in a row',
            'Centers items along the cross axis',
            'Wraps elements inside a flex container',
          ],
          answer: 'Centers items along the cross axis',
        },
      ],
      '3': [
        {
          id: 1,
          type: 'definition',
          prompt: 'React’s `useEffect()`',
          choices: [
            'Triggers rerender every second',
            'Performs side effects like fetching data',
            'Declares a local variable',
            'Runs only once on mount',
          ],
          answer: 'Performs side effects like fetching data',
        },
        {
          id: 2,
          type: 'term',
          prompt: 'Higher-Order Component',
          choices: [
            'A component with many hooks',
            'Component that returns JSX from another app',
            'Function that takes a component and returns a new one',
            'A wrapper for external styles',
          ],
          answer: 'Function that takes a component and returns a new one',
        },
      ],
    };
  
    const questions = questionsByLecture[lectureId] || [];
  
    return Response.json({ questions });
  }
  