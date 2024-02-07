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

const ImplementationblockPage = ({ generatedId, providedId, setNextPage }) => {
  const customSnackbarRef = useRef(null)
  const [implementationblocks, setImplementationblocks] = useState([])
  const [implementationblock, setImplementationblock] = useState({})

  const handleNextClick = () => {
    setNextPage()
  }

  useEffect(() => {
    fetchImplementationblocks()
  }, [])

  async function fetchImplementationblocks() {
    const { data } = await supabase.from('Implementationcontent_duplicate').select('*')
    setImplementationblocks(data)
  }

  function handleChange(event) {
    setImplementationblock((prevFormData) => {
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
        ...implementationblock,
        id: generatedId,
        ID: providedId,
      };

      const { data, error } = await supabase
        .from('Implementationcontent_duplicate')
        .insert([dataToSubmit]);
      if (error) {
        throw error;
      }
      fetchImplementationblocks()
      customSnackbarRef.current.showSnackbar('You have successfully saved this Implementation form', 'success');
    } catch (error) {
      customSnackbarRef.current.showSnackbar(error.message, 'error');
      console.error('Error saving Implementation form:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Container>
        <Section>
          <Title>Action Plan Milestone Chart</Title>
          <TextArea
            placeholder=''
            name='IPQ1'
            required={false}
            onChange={handleChange}
          />
          <Title>Secondary Action Plan Milestone</Title>
          <TextArea
            placeholder=''
            name='IPQ2'
            required={false}
            onChange={handleChange}
          />
        </Section>
        <Section>
          <Title>Set of activities assigned to the selected solution?</Title>
          <TextArea
            placeholder=''
            name='IPQ3'
            required={false}
            onChange={handleChange}
          />
          <Title>
            Plan. Include plan scope, schedule, cost and resources, and MOC/org
            change?
          </Title>
          <TextArea
            placeholder=''
            name='IPQ4'
            required={false}
            onChange={handleChange}
          />
          <Title>Do. Commit to execution. Track implementation?</Title>
          <TextArea
            placeholder=''
            name='IPQ5'
            required={false}
            onChange={handleChange}
          />
          <Title>
            Check. Monitor on track within preset guardrails and safeguards?
          </Title>
          <TextArea
            placeholder=''
            name='IPQ6'
            required={false}
            onChange={handleChange}
          />
          <Title>
            Act. Modify and adjust action plan based with preset contingency
            plans?
          </Title>
          <TextArea
            placeholder=''
            name='IPQ7'
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

export default ImplementationblockPage
