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

const ValueblockPage = ({ setNextPage }) => {
  const customSnackbarRef = useRef(null)
  const [valueblocks, setValueblocks] = useState([])
  const [valueblock, setValueblock] = useState({})

  const handleNextClick = () => {
    setNextPage()
  }

  useEffect(() => {
    fetchValueblocks()
  }, [])

  async function fetchValueblocks() {
    const { data } = await supabase.from('Valuecontent').select('*')
    setValueblocks(data)
  }

  function handleChange(event) {
    setValueblock((prevFormData) => {
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
        .from('Valuecontent')
        .insert([valueblock]);
      if (error) {
        throw error;
      }
      fetchValueblocks()
      customSnackbarRef.current.showSnackbar('You have successfully saved this Value Delivery form', 'success');
    } catch (error) {
      customSnackbarRef.current.showSnackbar(error.message, 'error');
      console.error('Error saving Value Delivery form:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Container>
        <Section>
          <Title>Performance Graphic</Title>
          <TextArea
            placeholder=''
            name='VDMedia1'
            required={false}
            onChange={handleChange}
          />
          <Title>Value Delivery Chart</Title>
          <TextArea
            placeholder=''
            name='VDMedia2'
            required={false}
            onChange={handleChange}
          />
          <Title>Secondary Value Delivery</Title>
          <TextArea
            placeholder=''
            name='VDMedia3'
            required={false}
            onChange={handleChange}
          />
        </Section>
        <Section>
          <Title>
            Is what we did having the desired affect within the expected time
            frame?
          </Title>
          <TextArea
            placeholder=''
            name='VDQ1'
            required={false}
            onChange={handleChange}
          />
          <Title>
            Identify and track leading performance metrics to lagging business
            outcomes?
          </Title>
          <TextArea
            placeholder=''
            name='VDQ2'
            required={false}
            onChange={handleChange}
          />
          <Title>Monitor value realization?</Title>
          <TextArea
            placeholder=''
            name='VDQ3'
            required={false}
            onChange={handleChange}
          />
          <Title>Performance map to show value delivery progress</Title>
          <TextArea
            placeholder=''
            name='VDQ4'
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

export default ValueblockPage
