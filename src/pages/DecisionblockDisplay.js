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

const DecisionblockDisplay = ({ selectedEntryId, selectedId, onClose }) => {
  const customSnackbarRef = useRef(null)
  const [decisionblock, setDecisionblock] = useState({})

  useEffect(() => {
    fetchDecisionblock()
  }, [])

  async function fetchDecisionblock() {
    try {
      const { data, error } = await supabase
        .from('Decisioncontent_duplicate')
        .select('*')
        .eq('ID', selectedEntryId)
        .single()

      if (error) {
        throw error
      }

      if (data) {
        setDecisionblock(data)
      } else {
        setDecisionblock({})
      }
    } catch (error) {
      console.error('Error fetching decision block:', error.message)
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setDecisionblock((prevDecisionblock) => ({
      ...prevDecisionblock,
      [name]: value,
    }))
  }

  const dataToSubmit = {
    ...decisionblock,
    id: selectedId,
    ID: selectedEntryId,
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      let { data, error } = {}
      // Check if implementation block ID exists
      const existingEntry = await supabase
        .from('Decisioncontent_duplicate')
        .select('*')
        .eq('ID', decisionblock.ID)
        .single()

      if (!existingEntry.data) {
        // Insert a new entry if it doesn't exist
        ;({ data, error } = await supabase
          .from('Decisioncontent_duplicate')
          .insert([dataToSubmit]))
      } else {
        // Update existing entry
        ;({ data, error } = await supabase
          .from('Decisioncontent_duplicate')
          .update(decisionblock)
          .eq('ID', decisionblock.ID))
      }

      if (error) {
        throw error
      }

      fetchDecisionblock()
      customSnackbarRef.current.showSnackbar(
        'Successfully saved Decision form.',
        'success',
      )
    } catch (error) {
      customSnackbarRef.current.showSnackbar(`Error: ${error.message}`, 'error')
      console.error('Error saving Decision form:', error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Container>
        <Section>
          <Title>Decision Statement</Title>
          <TextArea
            placeholder=''
            name='DS1'
            required={false}
            onChange={handleChange}
            value={decisionblock.DS1 || ''}
          />
          <Title>Strategy & Values Alignment Table</Title>
          <TextArea placeholder='' />
          <Title>Effort vs Success Table (optional)</Title>
          <TextArea placeholder='' />
        </Section>
        <Section>
          <Title>Identify several compelling creative alternatives.</Title>
          <TextArea
            placeholder=''
            name='DQ1'
            required={false}
            onChange={handleChange}
            value={decisionblock.DQ1 || ''}
          />
          <Title>
            What model type is best suited for right level of evaluation rigor
            and complexity?
          </Title>
          <TextArea
            placeholder=''
            name='DQ2'
            required={false}
            onChange={handleChange}
            value={decisionblock.DQ2 || ''}
          />
          <Title>
            What inputs are influential variables? Technical, people, management
            system?
          </Title>
          <TextArea
            placeholder=''
            name='DQ3'
            required={false}
            onChange={handleChange}
            value={decisionblock.DQ3 || ''}
          />
          <Title>
            What are the best knowledge sources: intuition/experience,
            data/analytics evidence or a mix? How do we trust human judgment vs
            ML/AI?
          </Title>
          <TextArea
            placeholder=''
            name='DQ4'
            required={false}
            onChange={handleChange}
            value={decisionblock.DQ4 || ''}
          />
          <Title>
            What is our uncertainty? What is our value of Information? Is it
            worth seeking more knowledge to reduce our uncertainty?
          </Title>
          <TextArea
            placeholder=''
            name='DQ5'
            required={false}
            onChange={handleChange}
            value={decisionblock.DQ5 || ''}
          />
          <Title>Have we guarded against all relevant biases?</Title>
          <TextArea
            placeholder=''
            name='DQ6'
            required={false}
            onChange={handleChange}
            value={decisionblock.DQ6 || ''}
          />
          <Title>
            Do constraints come into play? If so, what value is left on table?
            Is that acceptable?
          </Title>
          <TextArea
            placeholder=''
            name='DQ7'
            required={false}
            onChange={handleChange}
            value={decisionblock.DQ7 || ''}
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

export default DecisionblockDisplay
