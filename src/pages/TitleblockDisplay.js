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
  TitleblockNote,
  TitleblockNotes,
} from './TitleBlockPage.js'

const TitleblockDisplay = ({ selectedEntryId, selectedId, onClose }) => {
  const [titleblock, setTitleblock] = useState({})
  const customSnackbarRef = useRef(null)

  useEffect(() => {
    fetchTitleblock()
  }, [])

  async function fetchTitleblock() {
    try {
      const { data, error } = await supabase
        .from('Titlecontent_duplicate')
        .select('*')
        .eq('ID', selectedEntryId)
        .single()

      if (error) {
        throw error
      }

      if (data) {
        setTitleblock(data)
      } else {
        setTitleblock({})
      }
    } catch (error) {
      console.error('Error fetching Title block:', error.message)
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setTitleblock((prevTitleblock) => ({
      ...prevTitleblock,
      [name]: value,
    }))
  }

  const dataToSubmit = {
    ...titleblock,
    id: selectedId,
    ID: selectedEntryId,
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      let { data, error } = {}
      // Check if title block ID exists
      const existingEntry = await supabase
        .from('Titlecontent_duplicate')
        .select('*')
        .eq('ID', titleblock.ID)
        .single()

      if (!existingEntry.data) {
        // Insert a new entry if it doesn't exist
        ;({ data, error } = await supabase
          .from('Titlecontent_duplicate')
          .insert([dataToSubmit]))
      } else {
        // Update existing entry
        ;({ data, error } = await supabase
          .from('Titlecontent_duplicate')
          .update(titleblock)
          .eq('ID', titleblock.ID))
      }

      if (error) {
        throw error
      }

      fetchTitleblock()
      customSnackbarRef.current.showSnackbar(
        'Successfully saved Title form.',
        'success',
      )
    } catch (error) {
      customSnackbarRef.current.showSnackbar(`Error: ${error.message}`, 'error')
      console.error('Error saving Title form:', error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Container>
        <Section>
          <Title>ID: Unique Identification Reference</Title>
          <TextArea
            name='ID'
            value={titleblock.ID || ''}
            readOnly
            style={{ backgroundColor: '#f2f2f2' }}
          />
          <Title>Title: PSDM Description</Title>
          <TextArea
            name='Description'
            onChange={handleChange}
            value={titleblock.Description || ''}
          />
          <Title>Problem-Solvers: Input, Recommend</Title>
          <TextArea
            name='ProblemSolvers'
            onChange={handleChange}
            value={titleblock.ProblemSolvers || ''}
          />
          <Title>Decision-Makers: Decide, Agree</Title>
          <TextArea
            name='DecisionMakers'
            onChange={handleChange}
            value={titleblock.DecisionMakers || ''}
          />
          <Title>Implementation: Action Plan Execution</Title>
          <TextArea
            name='Implementation'
            onChange={handleChange}
            value={titleblock.Implementation || ''}
          />
          <Title>Assurance: Monitor Action, Performance, Value</Title>
          <TextArea
            name='Assurance'
            onChange={handleChange}
            value={titleblock.Assurance || ''}
          />
          <Title>Delivery: Lessons Learned</Title>
          <TextArea
            name='Delivery'
            onChange={handleChange}
            value={titleblock.Delivery || ''}
          />
          <Title>Organization: Lowest org level accountability</Title>
          <TextArea
            name='Organization'
            required={false}
            onChange={handleChange}
            defaultValue={titleblock.Organization}
          />
          <Title>Assets: Lowest asset level applicability</Title>
          <TextArea
            name='Assets'
            required={false}
            onChange={handleChange}
            defaultValue={titleblock.Assets}
          />
          <Title>Practice: Asset management practice</Title>
          <TextArea
            name='Practice'
            required={false}
            onChange={handleChange}
            defaultValue={titleblock.Practice}
          />
          <Title>Value: Primary Value Driver and Impact category</Title>
          <TextArea
            name='Value'
            required={false}
            onChange={handleChange}
            defaultValue={titleblock.Value}
          />

          <Title>
            Status: Initiation, Problem, Solution, Decision, Implementation,
            Value Delivery, Lessons Learned, Complete, On Hold, Cancelled (not
            worth solving)
          </Title>
          <TextArea
            name='Status'
            required={false}
            onChange={handleChange}
            defaultValue={titleblock.Status}
          />
        </Section>
        <Section>
          <Title>What are the PSDM Identifiers?</Title>
          <TextArea
            name='TQ1'
            required={false}
            onChange={handleChange}
            defaultValue={titleblock.TQ1}
          />
          <Title>What is the PSDM Status?</Title>
          <TextArea
            name='TQ2'
            required={false}
            onChange={handleChange}
            defaultValue={titleblock.TQ2}
          />
          <Title>Who are the Problem-Solvers?</Title>
          <TextArea
            name='TQ3'
            required={false}
            onChange={handleChange}
            defaultValue={titleblock.TQ3}
          />
          <Title>Who are the Decision-Makers?</Title>
          <TextArea
            name='TQ4'
            required={false}
            onChange={handleChange}
            defaultValue={titleblock.TQ4}
          />
          <Title>Who does Implementation?</Title>
          <TextArea
            name='TQ5'
            required={false}
            onChange={handleChange}
            defaultValue={titleblock.TQ5}
          />
          <Title>Who monitors progress, performance and value delivery?</Title>
          <TextArea
            name='TQ6'
            required={false}
            onChange={handleChange}
            defaultValue={titleblock.TQ6}
          />
          <Title>Who leads lessons learned?</Title>
          <TextArea
            name='TQ7'
            required={false}
            onChange={handleChange}
            defaultValue={titleblock.TQ7}
          />
          <Title>
            Do all team members have the requisite competencies and authorities
            for their assigned role?
          </Title>
          <TextArea
            name='TQ8'
            required={false}
            onChange={handleChange}
            defaultValue={titleblock.TQ8}
          />
        </Section>
        <Section>
          <TitleblockNotes>
            <TitleblockNote>
              Note1: Use RAPID, RACI, RAD or other team frame
            </TitleblockNote>
            <TitleblockNote>
              Note2: Organization, Assets, Practice, Value are database tables
              that form EOMS ontology
            </TitleblockNote>
          </TitleblockNotes>
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

export default TitleblockDisplay
