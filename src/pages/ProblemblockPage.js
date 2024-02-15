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

const ProblemblockPage = ({ generatedId, providedId, setNextPage }) => {
  const customSnackbarRef = useRef(null)
  const [problemblocks, setProblemblocks] = useState([])
  const [problemblock, setProblemblock] = useState({})

  const handleNextClick = () => {
    setNextPage()
  }

  useEffect(() => {
    fetchProblemblocks()
  }, [])

  async function fetchProblemblocks() {
    const { data } = await supabase.from('Problemcontent_duplicate').select('*')
    setProblemblocks(data)
  }

  function handleChange(event) {
    setProblemblock((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      }
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const dataToSubmit = {
        ...problemblock,
        id: generatedId,
        ID: providedId,
      }

      const { data, error } = await supabase
        .from('Problemcontent_duplicate')
        .insert([dataToSubmit])
      if (error) {
        throw error
      }
      fetchProblemblocks()
      customSnackbarRef.current.showSnackbar(
        'You have successfully saved this Problem Statement form',
        'success',
      )
    } catch (error) {
      customSnackbarRef.current.showSnackbar(error.message, 'error')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Container>
        <Section>
          <Title>Problem Statement</Title>
          <p><strong>Present a clear and concise paragraph characterizing the following:</strong> </p>                                                     
          <p>1. Gap - The challenge, issue or pain we currently face</p>                                                               <p>2. Context - When and where the problem was found and what makes it a problem</p>                                
          <p>3. Impact - Measure of the problem's potential consequences to the organization </p>
          <p>4. Importance - Why this problem matters to the organization, its stakeholders, and is worth solving</p>                        
          
                                                                                                                       

          
          <TextArea
            placeholder=''
            name='PS1'
            required={false}
            onChange={handleChange}
          />
          <Title>Secondary Content</Title>
          <p>Optional content not shown on A3 Canvas </p>         
          <TextArea
            placeholder=''
            name='PS2'
            required={false}
            onChange={handleChange}
          />
        </Section>


        <Section>
          <Title> What is the Problem? </Title>
          <p> Problem Brief describes the initial understanding of the problem, also called 'a priority'. This statement will be refined after answering the questions below. </p>
          <TextArea
            placeholder=''
            name='PQ1'
            required={false}
            onChange={handleChange}
          />
          <Title>How was  the Problem Discovered?</Title>
          <p>When was this problem discovered? Who? How? Did we deliberately look for and find the problem, or was it unintentional?</p>
          <TextArea
            placeholder=''
            name='PQ2'
            required={false}
            onChange={handleChange}
          />
          <Title>What is at  Stake?</Title>
          <p>What is the threat or opportunity to the organization's goals, objectives, strategies or plans? How much value is at stake against the organization's value framework?</p>
          <TextArea
            placeholder=''
            name='PQ3'
            required={false}
            onChange={handleChange}
          />
          <Title> What is  Affected?</Title>
          <p>Who? What  organizational people or groups and external stakeholders are affected? What  business processes or technologies? What assets cost, performance and risk are  affected?</p>
          <TextArea
            placeholder=''
            name='PQ4'
            required={false}
            onChange={handleChange}
          />
          <Title> Which  Frame? </Title>
          <p>Which frame(s) can we  apply as lens to see the problem. An  appropriate frame addresses the problem purpose, scope and perspective.  Consider alternative frames from diverse perspectives. What frame is the best  fit for use here?</p>
          <TextArea
            placeholder=''
            name='PQ5'
            required={false}
            onChange={handleChange}
          />
          <Title>Problem  Worth Solving?</Title>
          <p>What is this a  problem worth solving and a decision worth making? What is the gap between  what we want versus what we expect or achieve if the problem is not  addressed?</p>
          <TextArea
            placeholder=''
            name='PQ6'
            required={false}
            onChange={handleChange}
          />
          <Title>Clarify  the Problem Statement</Title>
          <p>Clarify the Problem  Brief in light of information presented above. Update responses above as new  information and knowledge becomes available. </p>
        <TextArea
          placeholder=''
          name='PQ7'
          required={false}
          onChange={handleChange}
        />
        </Section>
        <TitleblockButtons>
          <StyledButton type='submit'>Save</StyledButton>
          <StyledButton type='submit' onClick={handleNextClick}>
            Next
          </StyledButton>
        </TitleblockButtons>
      </Container>
      <CustomSnackbar ref={customSnackbarRef} />
    </form>
  )
}

export default ProblemblockPage
