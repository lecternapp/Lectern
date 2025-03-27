// app/api/summaries/[lectureId]/route.js

export async function GET(_, { params }) {
    const { lectureId } = params;
  
    const mockSummaries = {
      '1': `### Main Topics
  - Pygame display rendering
  - Event loop basics
  
  ### Key Points
  - \`pygame.display.flip()\` updates the screen
  - Looping is critical for input and frame updates
  
  ### Concepts
  - Game loop structure
  - Real-time input handling`,
      
      '2': `### Main Topics
  - OOP Principles in Python
  - UI layout with Tailwind
  
  ### Key Points
  - Encapsulation bundles logic and data
  - \`items-center\` aligns items cross-axis
  
  ### Concepts
  - Classes & Objects
  - Flexbox vs Grid`,
    };
  
    return Response.json({ summary: mockSummaries[lectureId] || 'No summary available.' });
  }
  