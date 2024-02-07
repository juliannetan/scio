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

const DecisionBlockPage = ({ generatedId, providedId, setNextPage }) => {
  const customSnackbarRef = useRef(null)
  const [decisionblocks, setDecisionblocks] = useState([])
  const [decisionblock, setDecisionblock] = useState({})

  const handleNextClick = () => {
    setNextPage()
  }

  useEffect(() => {
    fetchDecisionblocks()
  }, [])

  async function fetchDecisionblocks() {
    const { data } = await supabase.from('Decisioncontent_duplicate').select('*')
    setDecisionblocks(data)
  }

  function handleChange(event) {
    setDecisionblock((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      }
    })
  }


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const dataToSubmit = {
        ...decisionblock,
        id: generatedId,
        ID: providedId
      };

      const { data, error } = await supabase
        .from('Decisioncontent_duplicate')
        .insert([dataToSubmit]);
      if (error) {
        throw error;
      }
      fetchDecisionblocks()
      customSnackbarRef.current.showSnackbar('You have successfully saved this Decision form', 'success');
    } catch (error) {
      customSnackbarRef.current.showSnackbar(error.message, 'error');
      console.error('Error saving Decision form:', error.message);
    }
  };

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
          />
          <Title>Strategy & Values Alignment Table</Title>
          <TextArea
            placeholder=''
            name='DQ1'
            required={false}
            onChange={handleChange}
          />
          <Title>Effort vs Success Table (optional)</Title>
          <TextArea
            placeholder=''
            name='DQ2'
            required={false}
            onChange={handleChange}
          />
        </Section>
        <Section>
          <Title>Identify several compelling creative alternatives.</Title>
          <TextArea
            placeholder=''
            name='DQ3'
            required={false}
            onChange={handleChange}
          />
          <Title>
            What model type is best suited for the right level of evaluation
            rigor and complexity?
          </Title>
          <TextArea
            placeholder=''
            name='DQ4'
            required={false}
            onChange={handleChange}
          />
          <Title>
            What inputs are influential variables? Technical, people, management
            system?
          </Title>
          <TextArea
            placeholder=''
            name='DQ5'
            required={false}
            onChange={handleChange}
          />
          <Title>
            What are the best knowledge sources: intuition/experience,
            data/analytics evidence, or a mix? How do we trust human judgment vs
            ML/AI?
          </Title>
          <TextArea
            placeholder=''
            name='DQ6'
            required={false}
            onChange={handleChange}
          />
          <Title>Have we guarded against all relevant biases?</Title>
          <TextArea
            placeholder=''
            name='DQ7'
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

export default DecisionBlockPage
