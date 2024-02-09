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
} from './TitleBlockPage.js'

const ValueblockDisplay = ({ selectedEntryId, selectedId, onClose }) => {
  const customSnackbarRef = useRef(null)
  const [valueblock, setValueblock] = useState({})

  useEffect(() => {
    fetchValueblock()
  }, [])

  async function fetchValueblock() {
    try {
      const { data, error } = await supabase
        .from('Valuecontent_duplicate')
        .select('*')
        .eq('ID', selectedEntryId)
        .single()

      if (error) {
        throw error
      }

      if (data) {
        setValueblock(data)
      } else {
        setValueblock({})
      }
    } catch (error) {
      console.error('Error fetching Value block:', error.message)
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setValueblock((prevImplementationblock) => ({
      ...prevImplementationblock,
      [name]: value,
    }))
  }

  const dataToSubmit = {
    ...valueblock,
    id: selectedId,
    ID: selectedEntryId,
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      let { data, error } = {}
      const existingEntry = await supabase
        .from('Valuecontent_duplicate')
        .select('*')
        .eq('ID', valueblock.ID)
        .single()

      if (!existingEntry.data) {
        // Insert a new entry if it doesn't exist
        ;({ data, error } = await supabase
          .from('Valuecontent_duplicate')
          .insert([dataToSubmit]))
      } else {
        // Update existing entry
        ;({ data, error } = await supabase
          .from('Valuecontent_duplicate')
          .update(valueblock)
          .eq('ID', valueblock.ID))
      }

      if (error) {
        throw error
      }

      fetchValueblock()
      customSnackbarRef.current.showSnackbar(
        'Successfully saved Value form.',
        'success',
      )
    } catch (error) {
      customSnackbarRef.current.showSnackbar(`Error: ${error.message}`, 'error')
      console.error('Error saving Value form:', error.message)
    }
  }

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
            value={valueblock.VDMedia1}
          />
          <Title>Value Delivery Chart</Title>
          <TextArea
            placeholder=''
            name='VDMedia2'
            required={false}
            onChange={handleChange}
            value={valueblock.VDMedia2}
          />
          <Title>Secondary Value Delivery</Title>
          <TextArea
            placeholder=''
            name='VDMedia3'
            required={false}
            onChange={handleChange}
            value={valueblock.VDMedia3}
          />
        </Section>
        <Section>
          <Title>
            Is what we did having the desired effect within the expected time
            frame?
          </Title>
          <TextArea
            placeholder=''
            name='VDQ1'
            required={false}
            onChange={handleChange}
            value={valueblock.VDQ1}
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
            value={valueblock.VDQ2}
          />
          <Title>Monitor value realization?</Title>
          <TextArea
            placeholder=''
            name='VDQ3'
            required={false}
            onChange={handleChange}
            value={valueblock.VDQ3}
          />
          <Title>Performance map to show value delivery progress</Title>
          <TextArea
            placeholder=''
            name='VDQ4'
            required={false}
            onChange={handleChange}
            value={valueblock.VDQ4}
          />
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

export default ValueblockDisplay
