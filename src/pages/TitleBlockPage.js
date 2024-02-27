import styled from 'styled-components'
import React, { useState, useEffect, useRef } from 'react'
import { supabase } from '../components/supabase.js'
import { Button } from '@mui/material'
import { grey } from '@mui/material/colors'
import { styled as muiStyled } from '@mui/system'
import CustomSnackbar from '../components/CustomSnackbar.js'

export const Container = styled.div`
  padding: 20px;
  padding-bottom: 70px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`

export const Section = styled.div`
  background-color: #fff;
  color: #333;
  padding: 20px;
  margin: 10px;
  width: 48%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`

export const Title = styled.h2`
  font-size: 1rem;
  margin-bottom: 15px;
`

export const TextArea = styled.textarea`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-top: 20px;
  border-radius: 3px;
  border: 1px solid #ccc;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
`

export const StyledButton = muiStyled(Button)`
  margin-top: 10px;
  margin: 0 10px; /* Adjust the margin to create space between buttons */
  color: ${grey[300]};
  background-color: #004F71;
  
  &:hover {
    background-color: #002738;
  }

  padding: 2px 20px;
  font-size: 20px;
  text-transform: capitalize;
`

export const TitleblockButtons = styled.div`
  display: flex;
  justify-content: right;
  margin-top: 20px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff; /* Add background color if needed */
  padding: 10px 30px; /* Add padding for better visibility */
  border-top: 2px solid ${grey[100]}; /* Add a light border at the top with grey[100] color */
`

export const TitleblockNotes = styled.div`
  margin-top: 20px;
`

export const TitleblockNote = styled.p`
  margin-bottom: 10px;
`

const TitleblockPage = ({
  setGeneratedId,
  setProvidedId,
  setNextPage,
  userData,
}) => {
  const customSnackbarRef = useRef(null)
  const [titleblocks, setTitleblocks] = useState([])
  const [titleblock, setTitleblock] = useState({})
  const handleNextClick = () => {
    setNextPage()
  }

  useEffect(() => {
    fetchTitleblocks()
  }, [])

  async function fetchTitleblocks() {
    try {
      const { data, error } = await supabase
        .from('Titlecontent_duplicate')
        .select('*')
        .order('Created_Date', { ascending: true })
      if (error) {
        throw error
      }
      if (data) {
        const insertedId = data[data.length - 1].id
        const insertedProvidedId = data[data.length - 1].ID
        setGeneratedId(insertedId)
        setProvidedId(insertedProvidedId)
      }

      setTitleblocks(data || [])
    } catch (error) {
      console.error('Error fetching titleblocks:', error.message)
    }
  }

  function handleChange(event) {
    setTitleblock((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      }
    })
  }

  function handleIdChange(event) {
    const sanitizedValue = event.target.value.replace(/\s/g, '')

    setTitleblock((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: sanitizedValue,
      }
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const dataToSubmit = {
        ...titleblock,
        Created_By: userData?.user_metadata?.full_name || '',
      }
      const { data, error } = await supabase
        .from('Titlecontent_duplicate')
        .insert([dataToSubmit])
      if (error) {
        throw error
      }
      fetchTitleblocks()
      customSnackbarRef.current.showSnackbar(
        'You have successfully saved this Title form',
        'success',
      )
    } catch (error) {
      customSnackbarRef.current.showSnackbar(error.message, 'error')
      console.error('Error saving Title form:', error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Container>
        <Section>
          <Title>ID: Unique Identification Reference</Title>
          <TextArea
            placeholder='AB-123456'
            name='ID'
            required={true}
            onChange={handleIdChange}
          />
          <Title>Title: PSDM Description</Title>
          <TextArea
            placeholder=''
            name='Description'
            required={false}
            onChange={handleChange}
          />
          <Title>Team Selection Guidance:</Title>
          <Title>
            Using the RAPID model, who has the roles on the PSDM team? Are all
            team members competent with requisite experience, tract record and
            authority for their assigned roles?
          </Title>

          <Title>Team Lead:</Title>
          <p>
            Who is the problem-solver? The Lead initiates A3 PSDM record, does
            most of the analysis & evaluation work, most of the content entry,
            at discretion of Recommender.
          </p>
          <TextArea
            placeholder=''
            name='ProblemSolvers'
            required={false}
            onChange={handleChange}
          />
          <Title>Input:</Title>
          <p>
            Who provides input to the problem-solution? These people provide
            technical business expertise, experience and information to shape
            the problem & solution with input at the discretion of the
            Inputters.
          </p>
          <TextArea
            placeholder=''
            name='Input'
            required={false}
            onChange={handleChange}
          />
          <Title>Recommend:</Title>
          <p>
            Who makes the recommendation? The Recommender provides technical
            authority to ensure the problem solution set follows good practice
            and recommend solution, steps status from Recommender.
          </p>
          <TextArea
            placeholder=''
            name='Recommend'
            required={false}
            onChange={handleChange}
          />

          <Title>Decision:</Title>
          <p>
            Who makes the decision? The Decision-Maker commits the organization
            to action with requisite business authority and resources{' '}
          </p>
          <TextArea
            placeholder=''
            name='DecisionMakers'
            required={false}
            onChange={handleChange}
          />

          <Title>Implement:</Title>
          <p>
            Who implements the action plan? Primary responsibility to execute
            the action plan and reports execution progress to team. Likely has
            project plans and dedicated team outside of PSDM canvas
          </p>
          <TextArea
            placeholder=''
            name='Implement'
            required={false}
            onChange={handleChange}
          />

          <Title>Assurance:</Title>
          <p>
            Who provides assurance? Provides audit and assurance the PSDM
            follows good practice, evaluates performance metrics and value
            delivery, facilitates lessons learned.
          </p>
          <TextArea
            placeholder=''
            name='Assurance'
            required={false}
            onChange={handleChange}
          />
        </Section>
        <Section>
          <Title>Status:</Title>
          <p>
            Select the current PSDM process stage, In progress states:
            Initiation, Problem, Solution, Decision, Implementation, Value
            Delivery, Learnings. On Hold Status include: Pause, Pivot. Complete
            Status includes
          </p>
          <TextArea
            placeholder=''
            name='Status'
            required={false}
            onChange={handleChange}
          />
          <Title>Type:</Title>
          <Title>Select the best fit decision type</Title>
          <TextArea
            placeholder=''
            name='Type'
            required={false}
            onChange={handleChange}
          />
          <Title>Impact:</Title>
          <p>
            Select impact. Impact choices include: Negligible, Minor, Marginal,
            Major, Critical, Catastrophic
          </p>
          <TextArea
            placeholder=''
            name='Impact'
            required={false}
            onChange={handleChange}
          />
          <Title>Complexity:</Title>
          <p>
            Select complexity on scale 1-7. Rank the complexity
            (low/medium/high) across the following dimensions: Technical,
            Organizational, Social, Time Complexities( Specific guidance
            available)
          </p>
          <TextArea
            placeholder=''
            name='Complexity'
            required={false}
            onChange={handleChange}
          />
          <Title>Value Drivers:</Title>
          <p>Select primary value driver(s) from table</p>
          <TextArea
            placeholder=''
            name='ValueDrivers'
            required={false}
            onChange={handleChange}
          />
          <Title>Organization:</Title>
          <p>
            Select lowest applicable department from the organizational
            hierarchy with accountability and resources to effectively manage
          </p>
          <TextArea
            placeholder=''
            name='Organization'
            required={false}
            onChange={handleChange}
          />
          <Title>Assets:</Title>
          <p>
            Select the applicable assets at the lowest levels of the
            organization’s asset hierarchy affected
          </p>
          <TextArea
            placeholder=''
            name='Assets'
            required={false}
            onChange={handleChange}
          />
          <Title>Practice:</Title>
          <p>
            Select most applicable practice. Practices may include: Operations,
            Maintenance, Reliability Engineering, Asset Strategy, Asset
            Planning, Asset Information, Shutdown/ Turnaround Outages, Supply
            Chain, Risk Management.{' '}
          </p>
          <TextArea
            placeholder=''
            name='Practice'
            required={false}
            onChange={handleChange}
          />
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
        <TitleblockButtons>
          <StyledButton type='submit' variant='contained'>
            Save
          </StyledButton>
          <StyledButton
            type='submit'
            variant='contained'
            onClick={handleNextClick}
          >
            Next
          </StyledButton>
        </TitleblockButtons>
      </Container>
      <CustomSnackbar ref={customSnackbarRef} />
    </form>
  )
}

export default TitleblockPage
