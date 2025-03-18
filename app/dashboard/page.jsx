import React from 'react'
import AddLecture from './_components/AddLecture'
import GenerateFlashcards from './_components/GenerateFlashcards'
import GenerateQuiz from './_components/GenerateQuiz'
function page() {
  return (
    <div>
        <AddLecture/>
        <GenerateFlashcards/>
        <GenerateQuiz/>
    </div>
  )
}

export default page