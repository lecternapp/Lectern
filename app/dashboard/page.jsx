import React from 'react'
import AddLecture from './_components/AddLecture'
import GenerateFlashcards from './_components/GenerateFlashcards'
import GenerateQuiz from './_components/GenerateQuiz'
import GenerateSummary from './_components/GenerateSummary'

function page() {
  return (
    <div>
        <AddLecture/>
        <GenerateFlashcards/>
        <GenerateQuiz/>
        <GenerateSummary/>
    </div>
  )
}

export default page