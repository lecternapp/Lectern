import React from 'react'
import AddLecture from './_components/AddLecture'
import GenerateFlashcards from './_components/GenerateFlashcards'
function page() {
  return (
    <div>
        <AddLecture/>
        <GenerateFlashcards/>
    </div>
  )
}

export default page