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
          <Title>Team Selection Guidance:</Title>
          <Title>Using the RAPID model, who has the roles on the PSDM team? Are all team members competent with requisite experience, tract record and authority for their assigned roles?</Title>


          <Title>Team Lead:</Title>
          <Title>Who is the problem-solver? The Lead initiates A3 PSDM record, does most of the analysis & evaluation work, most of the content entry, at discretion of Recommender.</Title>
          <TextArea
            name='ProblemSolvers'
            onChange={handleChange}
            value={titleblock.ProblemSolvers || ''}
          />
          <Title>Input:</Title>
          <Title>Who provides input to the problem-solution? These people provide technical business expertise, experience and information to shape the problem & solution with input at the discretion of the Inputters.</Title>
          <TextArea
            name='Input'
            onChange={handleChange}
            value={titleblock.Input || ''}
          />
          <Title>Recommend:</Title>
          <Title>Who makes the recommendation? The Recommender provides technical authority to ensure the problem solution set follows good practice and recommend solution, steps status from Recommender.</Title>
          <TextArea
            name='Recommend'
            onChange={handleChange}
            value={titleblock.Recommend || ''}
          />
          <Title>Decision:</Title>
          <Title>Who makes the decision? The Decision-Maker commits the Assurance to action with requisite business authority and resources </Title>
          <TextArea
            name='DecisionMakers'
            onChange={handleChange}
            value={titleblock.DecisionMakers || ''}
          />
          <Title>Agree:</Title>
          <Title>Who implements the action plan? Primary responsibility to execute the action plan and reports execution progress to team. Likely has project plans and dedicated team outside of PSDM canvas.</Title>
          <TextArea
            name='Agree'
            onChange={handleChange}
            value={titleblock.Agree || ''}
          />

          <Title>Implement:</Title>
          <Title>Who  implements the action plan? Primary responsibility to execute the action plan and reports execution progress to team. Likely has project plans and  dedicated team outside of PSDM canvas</Title>
          <TextArea
            name='Implement'
            onChange={handleChange}
            value={titleblock.Implement || ''}
          />

          <Title>Assurance:</Title>
          <Title>Who provides assurance? Provides audit and assurance the PSDM follows good practice, evaluates performance metrics and value delivery, facilitates lessons learned.</Title>
          <TextArea
            name='Assurance'
            required={false}
            onChange={handleChange}
            defaultValue={titleblock.Assurance}
          />
         
        </Section>
        <Section>
        <Title>Status:</Title>
        <Title>Select the current PSDM process stage, In progress states: Initiation, Problem, Solution, Decision, Implementation, Value Delivery, Learnings. On Hold Status include: Pause, Pivot. Complete Status includes</Title>
          <TextArea
            name='Status'
            required={false}
            onChange={handleChange}
            defaultValue={titleblock.Status}
          />
          <Title>Type:</Title>
          <Title>Select the best fit decision type</Title>
          <TextArea
            name='Type'
            required={false}
            onChange={handleChange}
            defaultValue={titleblock.Type}
          />
          <Title>Impact:</Title>
          <Title>Select impact. Impact choices include: Negligible, Minor, Marginal, Major, Critical, Catastrophic</Title>
          <TextArea
            name='Impact'
            required={false}
            onChange={handleChange}
            defaultValue={titleblock.Impact}
          />
          <Title>Complexity:</Title>
          <Title>Select complexity on scale 1-7. Rank the complexity (low/medium/high) across the following dimensions: Technical, Organizational, Social, Time Complexities( Specific guidance available)</Title>
          <TextArea
            name='Complexity'
            required={false}
            onChange={handleChange}
            defaultValue={titleblock.Complexity}
          />
          <Title>Value Drivers:</Title>
          <Title>Select primary value driver(s) from table</Title>
          <TextArea
            name='ValueDrivers'
            required={false}
            onChange={handleChange}
            defaultValue={titleblock.ValueDrivers}
          />
          <Title>Organization:</Title>
          <Title>Select lowest applicable department from the organizational hierarchy with accountability and resources to effectively manage</Title>
          <TextArea
            name='Organization'
            required={false}
            onChange={handleChange}
            defaultValue={titleblock.Organization}
          />
          <Title>Assets:</Title>
          <Title>Select the applicable assets at the lowest levels of the organization’s asset hierarchy affected</Title>
          <TextArea
            name='Assets'
            required={false}
            onChange={handleChange}
            defaultValue={titleblock.Assets}
          />
          <Title>Practice:</Title>
          <Title>Select most applicable practice. Practices may include: Operations, Maintenance, Reliability Engineering, Asset Strategy, Asset Planning, Asset Information, Shutdown/ Turnaround Outages, Supply Chain, Risk Management. </Title>
          <TextArea
            name='Practice'
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
              Note2: Assurance, Assets, Practice, Value are database tables
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
