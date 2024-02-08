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

const CurrentblockPage = ({ generatedId, providedId, setNextPage }) => {
  const customSnackbarRef = useRef(null)
  const [currentblocks, setCurrentblocks] = useState([])
  const [currentblock, setCurrentblock] = useState({})

  const handleNextClick = () => {
    setNextPage()
  }

  useEffect(() => {
    fetchCurrentblocks()
  }, [])

  async function fetchCurrentblocks() {
    const { data } = await supabase.from('Currentcontent_duplicate').select('*')
    setCurrentblocks(data)
  }

  function handleChange(event) {
    setCurrentblock((prevFormData) => {
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
        ...currentblock,
        id: generatedId,
        ID: providedId,
      }

      const { data, error } = await supabase
        .from('Currentcontent_duplicate')
        .insert([dataToSubmit])
      if (error) {
        throw error
      }
      fetchCurrentblocks()
      customSnackbarRef.current.showSnackbar(
        'You have successfully saved this Current State form',
        'success',
      )
    } catch (error) {
      customSnackbarRef.current.showSnackbar(error.message, 'error')
      console.error('Error saving Current State form:', error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Container>
        <Section>
          <Title>Current State Statement</Title>
          <TextArea
            placeholder=''
            name='CS1'
            required={false}
            onChange={handleChange}
          />
          <Title>Secondary Current State Statement</Title>
          <TextArea
            placeholder=''
            name='CS2'
            required={false}
            onChange={handleChange}
          />
        </Section>
        <Section>
          <Title>What is the problem background? How did we get here?</Title>
          <TextArea
            placeholder=''
            name='CQ1'
            required={false}
            onChange={handleChange}
          />
          <Title>
            How are we dealing with the problem now? What are the barriers to
            solving this problem already?
          </Title>
          <TextArea
            placeholder=''
            name='CQ2'
            required={false}
            onChange={handleChange}
          />
          <Title>
            Everything is relative. Relative to what, exactly? What is the
            baseline view? Wide view? External view? What’s the denominator?
          </Title>
          <TextArea
            placeholder=''
            name='CQ3'
            required={false}
            onChange={handleChange}
          />
          <Title>What is our confidence/uncertainty?</Title>
          <TextArea
            placeholder=''
            name='CQ4'
            required={false}
            onChange={handleChange}
          />
          <Title>What are the causes, root causes and 5 Whys?</Title>
          <TextArea
            placeholder=''
            name='CQ5'
            required={false}
            onChange={handleChange}
          />
          <Title>
            What is the problem scale? Value driver(s)? Impact? Time horizon?
            Problem type?
          </Title>
          <TextArea
            placeholder=''
            name='CQ6'
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

export default CurrentblockPage
