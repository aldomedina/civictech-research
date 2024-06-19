'use client'
import BottomCTA from '@/components/BottomCTA'

const AddNote = () => {
  const handleAddNewNote = () => console.log('handleAddNewNote')
  return (
    <>
      <BottomCTA text='ADD NEW NOTE' onClick={handleAddNewNote} />
    </>
  )
}

export default AddNote
