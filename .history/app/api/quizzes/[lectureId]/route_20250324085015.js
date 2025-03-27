// app/api/quizzes/[lectureId]/route.js
export async function GET(request, { params }) {
    const { lectureId } = params;
  
    const mockData = {
      questions: [
        {
          id: 1,
          type: 'definition',
          prompt: 'React.useEffect',
          choices: [
            'A hook to manage form state',
            'A function that runs before every render',
            'A hook for side effects like fetching data',
            'A method for handling key presses',
          ],
          answer: 'A hook for side effects like fetching data',
        },
        {
          id: 2,
          type: 'term',
          prompt: 'Encapsulation',
          choices: [
            'Combining data and behavior into a single unit',
            'Hiding styles inside a shadow DOM',
            'Creating functions within loops',
            'A JavaScript scoping technique',
          ],
          answer: 'Combining data and behavior into a single unit',
        },
        {
          id: 3,
          type: 'definition',
          prompt: 'Tailwind CSS utility class "flex-col"',
          choices: [
            'Applies column layout to a flex container',
            'Centers text horizontally',
            'Applies vertical padding only',
            'Converts elements into a grid',
          ],
          answer: 'Applies column layout to a flex container',
        },
      ],
    };
  
    return Response.json(mockData);
  }
  