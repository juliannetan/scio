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

const LessonsblockPage = ({ setNextPage }) => {
  const customSnackbarRef = useRef(null)
  const [lessonsblocks, setLessonsblocks] = useState([])
  const [lessonsblock, setLessonsblock] = useState({})

  const handleNextClick = () => {
    setNextPage()
  }

  useEffect(() => {
    fetchLessonsblocks()
  }, [])

  async function fetchLessonsblocks() {
    const { data } = await supabase.from('Lessonscontent').select('*')
    setLessonsblocks(data)
  }

  function handleChange(event) {
    setLessonsblock((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      }
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data, error } = await supabase
        .from('Lessonscontent')
        .insert([lessonsblock]);
      if (error) {
        throw error;
      }
      fetchLessonsblocks()
      customSnackbarRef.current.showSnackbar('You have successfully saved this Lessons Learned form', 'success');
    } catch (error) {
      customSnackbarRef.current.showSnackbar(error.message, 'error');
      console.error('Error saving Lessons Learned form:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Container>
        <Section>
          <Title>Shared Learnings Text Bullets</Title>
          <TextArea
            placeholder=''
            name='LLS1'
            required={false}
            onChange={handleChange}
          />
          <Title>Decision Quality Sliders Scale Graphic</Title>
          <TextArea
            placeholder=''
            name='LLS2'
            required={false}
            onChange={handleChange}
          />
        </Section>
        <Section>
          <Title>
            Overall Decision/Result: Good/Good, Good/Bad, Bad/Good, Bad/Bad?
            Show 2x2 graphic.
          </Title>
          <TextArea
            placeholder=''
            name='LLQ1'
            required={false}
            onChange={handleChange}
          />
          <Title>Additional sustainment activities required?</Title>
          <TextArea
            placeholder=''
            name='LLQ2'
            required={false}
            onChange={handleChange}
          />
          <Title>
            Audit. Problem-solvers follow process? Decision-makers follow
            process? Minimize biases? Avoid DQ traps?
          </Title>
          <TextArea
            placeholder=''
            name='LLQ3'
            required={false}
            onChange={handleChange}
          />
          <Title>Lessons learned? Lessons shared?</Title>
          <TextArea
            placeholder=''
            name='LLQ4'
            required={false}
            onChange={handleChange}
          />
          <Title>
            Future opportunities for continuous improvement? Innovation?
          </Title>
          <TextArea
            placeholder=''
            name='LLQ5'
            required={false}
            onChange={handleChange}
          />
          <Title>Provide a Decision Quality Sliders graphic</Title>
          <TextArea
            placeholder=''
            name='LLQ6'
            required={false}
            onChange={handleChange}
          />
        </Section>
        <TitleblockButtons>
          <StyledButton type='submit'>Save</StyledButton>
          <StyledButton type='submit' onClick={handleNextClick}>
            Close
          </StyledButton>
        </TitleblockButtons>
      </Container>
      <CustomSnackbar ref={customSnackbarRef} />
    </form>
  )
}

export default LessonsblockPage
