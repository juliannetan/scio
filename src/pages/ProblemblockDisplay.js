import React, { useState, useEffect, useRef } from 'react'
import { supabase } from '../components/supabase.js'
import {
  Container,
  Section,
  Title,
  TextArea,
  StyledButton,
  TitleblockButtons,
} from './TitleBlockPage.js'
import CustomSnackbar from '../components/CustomSnackbar.js'

const ProblemblockDisplay = ({ selectedEntryId, onClose }) => {
  const customSnackbarRef = useRef(null)
  const [problemblocks, setProblemblocks] = useState([])
  const [problemblock, setProblemblock] = useState({})

  useEffect(() => {
    fetchProblemblock()
  }, [])

  useEffect(() => {
    // Populate the data of the first problemblock entry on first load
    if (problemblocks.length > 0) {
      setProblemblock(problemblocks[0])
    }
  }, [problemblocks])

  async function fetchProblemblock() {
    try {
      const { data, error } = await supabase
        .from('Problemcontent_duplicate')
        .select('*')
        .eq('ID', selectedEntryId)
        .single()

      if (error) {
        throw error
      }

      if (data) {
        setProblemblocks([data])
        setProblemblock(data)
      } else {
        setProblemblocks([])
      }
    } catch (error) {
      console.error('Error fetching problemblock:', error.message)
    }
  }

  function handleChange(event) {
    setProblemblock((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      let { data, error } = {}
      if (problemblocks.some((block) => block.ID === problemblock.ID)) {
        // Update existing data if problemblock already exists
        ({ data, error } = await supabase
          .from('Problemcontent_duplicate')
          .update(problemblock)
          .eq('ID', problemblock.ID))
      } else {
        customSnackbarRef.current.showSnackbar('Entry does not exist', 'error')
      }
      if (error) {
        throw error
      }
      fetchProblemblock()
      customSnackbarRef.current.showSnackbar(
        'Successfully saved the problem statement.',
        'success',
      )
    } catch (error) {
      customSnackbarRef.current.showSnackbar(`Error: ${error.message}`, 'error')
      console.error('Error saving problem statement:', error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Container>
        <Section>
          <Title>Problem Statement</Title>
          <TextArea
            placeholder=''
            name='PS1'
            required={false}
            onChange={handleChange}
            value={problemblock.PS1 || ''}
          />
          <Title>Secondary Content</Title>
          <TextArea
            placeholder=''
            name='PS2'
            required={false}
            onChange={handleChange}
            value={problemblock.PS2 || ''}
          />
        </Section>
        <Section>
          <Title>
            What is the Problem Brief, our initial understanding of the problem
            (a priority)
          </Title>
          <TextArea
            placeholder=''
            name='PQ1'
            required={false}
            onChange={handleChange}
            value={problemblock.PQ1 || ''}
          />
          <Title>Why this is a problem worth solving?</Title>
          <TextArea
            placeholder=''
            name='PQ2'
            required={false}
            onChange={handleChange}
            value={problemblock.PQ2 || ''}
          />
          <Title>
            What is the threat or opportunity to the organization's goals,
            objectives, strategies or plans?
          </Title>
          <TextArea
            placeholder=''
            name='PQ3'
            required={false}
            onChange={handleChange}
            value={problemblock.PQ3 || ''}
          />
          <Title>
            Who or what internal/external stakeholders are affected?
          </Title>
          <TextArea
            placeholder=''
            name='PQ4'
            required={false}
            onChange={handleChange}
            value={problemblock.PQ4 || ''}
          />
          <Title>
            What alternate frames apply as lens through which we see the problem
            (apply different perspectives using diverse frameworks)
          </Title>
          <TextArea
            placeholder=''
            name='PQ5'
            required={false}
            onChange={handleChange}
            value={problemblock.PQ5 || ''}
          />
          <Title>
            Clarify the problem statement in context of suitable frame(s)
          </Title>
          <TextArea
            placeholder=''
            name='PQ6'
            required={false}
            onChange={handleChange}
            value={problemblock.PQ6 || ''}
          />
        </Section>
        <TitleblockButtons>
          <StyledButton type='submit'>Save</StyledButton>
          <StyledButton onClick={onClose}>Close</StyledButton>
        </TitleblockButtons>
      </Container>
      <CustomSnackbar ref={customSnackbarRef} />
    </form>
  )
}

export default ProblemblockDisplay
