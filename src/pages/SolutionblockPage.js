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

const SolutionblockPage = ({ setNextPage }) => {
  const customSnackbarRef = useRef(null)
  const [solutionblocks, setSolutionblocks] = useState([])
  const [solutionblock, setSolutionblock] = useState({
    SEQ1: '',
    SEQ2: '',
    SEQ3: '',
    SEQ4: '',
    SEQ5: '',
    SEQ6: '',
    SEQ7: '',
  })

  const handleNextClick = () => {
    setNextPage()
  }

  useEffect(() => {
    fetchSolutionblocks()
  }, [])

  async function fetchSolutionblocks() {
    const { data } = await supabase.from('Solutioncontent').select('*')
    setSolutionblocks(data)
  }

  function handleChange(event) {
    setSolutionblock((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      }
    })
  }

  async function createSolutionblock(e) {
    e.preventDefault()

    console.log('insidesafe')

    await supabase
      .from('Solutioncontent')
      .insert([
        {
          SEQ1: solutionblock.SEQ1,
          SEQ2: solutionblock.SEQ2,
          SEQ3: solutionblock.SEQ3,
          SEQ4: solutionblock.SEQ4,
          SEQ5: solutionblock.SEQ5,
          SEQ6: solutionblock.SEQ6,
          SEQ7: solutionblock.SEQ7,
        },
      ])
      .select()

    fetchSolutionblocks()
    customSnackbarRef.current.showSnackbar(
      'You have successfully saved this Solution Evaluation form',
    )
  }

  return (
    <form onSubmit={createSolutionblock}>
      <Container>
        <Section>
          <Title>Model Diagram Graphic</Title>
          <TextArea />
          <Title>Alternative vs. Objectives Table</Title>
          <TextArea />
          <Title>Indicated Recommended and Selected Solution</Title>
          <TextArea />
          <Title>Model Diagram Graphic</Title>
          <TextArea />
        </Section>
        <Section>
          <Title>Identify several compelling creative alternatives</Title>
          <TextArea
            placeholder=''
            name='SEQ1'
            required={false}
            onChange={handleChange}
          />
          <Title>
            What model type is best suited for right level of evaluation rigour
            and complexity?
          </Title>
          <TextArea
            placeholder=''
            name='SEQ2'
            required={false}
            onChange={handleChange}
          />
          <Title>
            What inputs are influential variables? Technical, people, management
            system?
          </Title>
          <TextArea
            placeholder=''
            name='SEQ3'
            required={false}
            onChange={handleChange}
          />
          <Title>
            What are the best knowledge sources: intuition/experience,
            data/analytics evidence or a mix? How do we trust human judgement vs
            ML/AI?
          </Title>
          <TextArea
            placeholder=''
            name='SEQ4'
            required={false}
            onChange={handleChange}
          />
          <Title>
            What is our uncertainty? What is our value of Information? Is it
            worth seeking more knowledge to reduce our uncertainty?
          </Title>
          <TextArea
            placeholder=''
            name='SEQ5'
            required={false}
            onChange={handleChange}
          />
          <Title>Have we guarded against all relevant biases?</Title>
          <TextArea
            placeholder=''
            name='SEQ6'
            required={false}
            onChange={handleChange}
          />
          <Title>
            Do constraints come into play? If so, what value is left on table?
            Is that acceptable?
          </Title>
          <TextArea
            placeholder=''
            name='SEQ7'
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

export default SolutionblockPage
