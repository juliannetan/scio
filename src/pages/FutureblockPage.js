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

const FutureblockPage = ({ generatedId, providedId, setNextPage }) => {
  const customSnackbarRef = useRef(null)
  const [futureblocks, setFutureblocks] = useState([])
  const [futureblock, setFutureblock] = useState({})

  const handleNextClick = () => {
    setNextPage()
  }

  useEffect(() => {
    fetchFutureblocks()
  }, [])

  async function fetchFutureblocks() {
    const { data } = await supabase.from('Futurecontent_duplicate').select('*')
    setFutureblocks(data)
  }

  function handleChange(event) {
    setFutureblock((prevFormData) => {
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
        ...futureblock,
        id: generatedId,
        ID: providedId,
      }

      const { data, error } = await supabase
        .from('Futurecontent_duplicate')
        .insert([dataToSubmit])
      if (error) {
        throw error
      }
      fetchFutureblocks()
      customSnackbarRef.current.showSnackbar(
        'You have successfully saved this Future State form',
        'success',
      )
    } catch (error) {
      customSnackbarRef.current.showSnackbar(error, 'error')
      console.error('Error saving Future State form:', error.message)
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
          />
          <Title>Future State Chart/Graphic</Title>
          <TextArea />
          <Title>Secondary Content</Title>
          <TextArea
            placeholder=''
            name='FS2'
            required={false}
            onChange={handleChange}
          />
        </Section>
        <Section>
          <Title>
            What are the expected targets from current business goals &
            objectives?
          </Title>
          <TextArea
            placeholder=''
            name='FQ1'
            required={false}
            onChange={handleChange}
          />
          <Title>What is the gap between current and future state?</Title>
          <TextArea
            placeholder=''
            name='FQ2'
            required={false}
            onChange={handleChange}
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
          />
          <Title>What are the conditions of satisfaction for success?</Title>
          <TextArea
            placeholder=''
            name='FQ4'
            required={false}
            onChange={handleChange}
          />
          <Title>How much of the gap is controllable?</Title>
          <TextArea
            placeholder=''
            name='FQ5'
            required={false}
            onChange={handleChange}
          />
          <Title>
            What is our tolerance for failure or an undesired outcome?
          </Title>
          <TextArea
            placeholder=''
            name='FQ6'
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

export default FutureblockPage
