import React, { useState, useEffect, useRef } from 'react'
import { supabase } from '../components/supabase.js'
import CustomSnackbar from '../components/CustomSnackbar.js'
import {
  Container,
  Section,
  Title,
  TextArea,
  StyledButton,
  TitleblockButtons,
} from './TitleBlockPage.js'

const LessonsblockDisplay = ({ selectedEntryId, selectedId, onClose }) => {
  const customSnackbarRef = useRef(null)
  const [lessonsblock, setLessonsblock] = useState({})

  useEffect(() => {
    fetchLessonsblock()
  }, [])

  async function fetchLessonsblock() {
    try {
      const { data, error } = await supabase
        .from('Lessonscontent_duplicate')
        .select('*')
        .eq('ID', selectedEntryId)
        .single()

      if (error) {
        throw error
      }

      if (data) {
        setLessonsblock(data)
      } else {
        setLessonsblock({})
      }
    } catch (error) {
      console.error('Error fetching Lessons block:', error.message)
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setLessonsblock((prevLessonsblock) => ({
      ...prevLessonsblock,
      [name]: value,
    }))
  }

  const dataToSubmit = {
    ...lessonsblock,
    id: selectedId,
    ID: selectedEntryId,
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      let { data, error } = {}
      const existingEntry = await supabase
        .from('Lessonscontent_duplicate')
        .select('*')
        .eq('ID', lessonsblock.ID)
        .single()

      if (!existingEntry.data) {
        // Insert a new entry if it doesn't exist
        ;({ data, error } = await supabase
          .from('Lessonscontent_duplicate')
          .insert([dataToSubmit]))
      } else {
        // Update existing entry
        ;({ data, error } = await supabase
          .from('Lessonscontent_duplicate')
          .update(lessonsblock)
          .eq('ID', lessonsblock.ID))
      }

      if (error) {
        throw error
      }

      fetchLessonsblock()
      customSnackbarRef.current.showSnackbar(
        'Successfully saved Lessons form.',
        'success',
      )
    } catch (error) {
      customSnackbarRef.current.showSnackbar(`Error: ${error.message}`, 'error')
      console.error('Error saving Lessons form:', error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Container onSubmit={handleSubmit}>
        <Section>
          <Title>Shared Learnings Text Bullets</Title>
          <TextArea
            placeholder=''
            name='LLS1'
            onChange={handleChange}
            value={lessonsblock.LLS1}
          />
          <Title>Secondary Lessons Learned</Title>
          <TextArea
            placeholder=''
            name='LLS2'
            onChange={handleChange}
            value={lessonsblock.LLS2}
          />
        </Section>
        <Section>
          <Title>Overall Decision/Result</Title>
          <TextArea
            placeholder=''
            name='LLQ1'
            onChange={handleChange}
            value={lessonsblock.LLQ1}
          />
          <Title>Additional sustainment activities required?</Title>
          <TextArea
            placeholder=''
            name='LLQ2'
            onChange={handleChange}
            value={lessonsblock.LLQ2}
          />
          <Title>Audit</Title>
          <TextArea
            placeholder=''
            name='LLQ3'
            onChange={handleChange}
            value={lessonsblock.LLQ3}
          />
          <Title>Lessons learned? Lessons shared?</Title>
          <TextArea
            placeholder=''
            name='LLQ4'
            onChange={handleChange}
            value={lessonsblock.LLQ4}
          />
          <Title>
            Future opportunities for continuous improvement? Innovation?
          </Title>
          <TextArea
            placeholder=''
            name='LLQ5'
            onChange={handleChange}
            value={lessonsblock.LLQ5}
          />
          <Title>Provide a Decision Quality Sliders graphic</Title>
          <TextArea
            placeholder=''
            name='LLQ6'
            onChange={handleChange}
            value={lessonsblock.LLQ6}
          />
        </Section>
      </Container>
      <TitleblockButtons>
        <StyledButton type='submit'>Save</StyledButton>
        <StyledButton onClick={onClose}>Close</StyledButton>
      </TitleblockButtons>
      <CustomSnackbar ref={customSnackbarRef} />
    </form>
  )
}

export default LessonsblockDisplay
