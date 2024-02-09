import React, { useState, useEffect } from 'react'
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

const FutureblockDisplay = ({ selectedEntryId, selectedId, onClose }) => {
  const [futureblock, setFuturebblock] = useState({})
  const customSnackbarRef = React.useRef(null)

  useEffect(() => {
    fetchFutureblock()
  }, [])

  async function fetchFutureblock() {
    try {
      const { data, error } = await supabase
        .from('Futurecontent_duplicate')
        .select('*')
        .eq('ID', selectedEntryId)
        .single()

      if (error) {
        throw error
      }

      if (data) {
        setFuturebblock(data)
      } else {
        setFuturebblock({})
      }
    } catch (error) {
      console.error('Error fetching Future block:', error.message)
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFuturebblock((prevFutureblock) => ({
      ...prevFutureblock,
      [name]: value,
    }))
  }

  const dataToSubmit = {
    ...futureblock,
    id: selectedId,
    ID: selectedEntryId,
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      let { data, error } = {}
      // Check if implementation block ID exists
      const existingEntry = await supabase
        .from('Futurecontent_duplicate')
        .select('*')
        .eq('ID', futureblock.ID)
        .single()

      if (!existingEntry.data) {
        // Insert a new entry if it doesn't exist
        ;({ data, error } = await supabase
          .from('Futurecontent_duplicate')
          .insert([dataToSubmit]))
      } else {
        // Update existing entry
        ;({ data, error } = await supabase
          .from('Futurecontent_duplicate')
          .update(futureblock)
          .eq('ID', futureblock.ID))
      }

      if (error) {
        throw error
      }

      fetchFutureblock()
      customSnackbarRef.current.showSnackbar(
        'Successfully saved Future form.',
        'success',
      )
    } catch (error) {
      customSnackbarRef.current.showSnackbar(`Error: ${error.message}`, 'error')
      console.error('Error saving Future form:', error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Container>
        <Section>
          <Title>Future State Gap Statement with bullets</Title>
          <TextArea
            placeholder=''
            name='FS1'
            required={false}
            onChange={handleChange}
            defaultValue={futureblock.FS1}
          />
          <Title>Future State Chart/Graphic</Title>
          <div />
          <Title>Secondary Content</Title>
          <TextArea
            placeholder=''
            name='FS2'
            required={false}
            onChange={handleChange}
            defaultValue={futureblock.FS2}
          />
        </Section>
        <Section>
          <Title>
            What are the expected targets from Future business goals &
            objectives?
          </Title>
          <TextArea
            placeholder=''
            name='FQ1'
            required={false}
            onChange={handleChange}
            defaultValue={futureblock.FQ1}
          />
          <Title>What is the gap between Future and future state?</Title>
          <TextArea
            placeholder=''
            name='FQ2'
            required={false}
            onChange={handleChange}
            defaultValue={futureblock.FQ2}
          />
          <Title>
            Can the real or perceived constraints in this situation be
            challenged?
          </Title>
          <TextArea
            placeholder=''
            name='FQ3'
            required={false}
            onChange={handleChange}
            defaultValue={futureblock.FQ3}
          />
          <Title>What are the conditions of satisfaction for success?</Title>
          <TextArea
            placeholder=''
            name='FQ4'
            required={false}
            onChange={handleChange}
            defaultValue={futureblock.FQ4}
          />
          <Title>How much of the gap is controllable?</Title>
          <TextArea
            placeholder=''
            name='FQ5'
            required={false}
            onChange={handleChange}
            defaultValue={futureblock.FQ5}
          />
          <Title>
            What is our tolerance for failure or an undesired outcome?
          </Title>
          <TextArea
            placeholder=''
            name='FQ6'
            required={false}
            onChange={handleChange}
            defaultValue={futureblock.FQ6}
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

export default FutureblockDisplay
