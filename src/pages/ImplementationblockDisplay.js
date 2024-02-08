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

const ImplementationblockDisplay = ({ selectedEntryId, selectedId, onClose }) => {
  const [implementationblock, setImplementationblock] = useState({})
  const customSnackbarRef = useRef(null);

  useEffect(() => {
    fetchImplementationblock();
  }, []);

  async function fetchImplementationblock() {
    try {
      const { data, error } = await supabase
        .from('Implementationcontent_duplicate')
        .select('*')
        .eq('ID', selectedEntryId)
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        setImplementationblock(data);
      } else {
        setImplementationblock({});
      }
    } catch (error) {
      console.error('Error fetching Implementation block:', error.message);
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setImplementationblock((prevImplementationblock) => ({
      ...prevImplementationblock,
      [name]: value,
    }));
  };

  const dataToSubmit = {
    ...implementationblock,
    id: selectedId,
    ID: selectedEntryId,
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let { data, error } = {};
      // Check if implementation block ID exists
      const existingEntry = await supabase
        .from('Implementationcontent_duplicate')
        .select('*')
        .eq('ID', implementationblock.ID)
        .single();
  
      if (!existingEntry.data) {
        // Insert a new entry if it doesn't exist
        ({ data, error } = await supabase
          .from('Implementationcontent_duplicate')
          .insert([dataToSubmit]));
      } else {
        // Update existing entry
        ({ data, error } = await supabase
          .from('Implementationcontent_duplicate')
          .update(implementationblock)
          .eq('ID', implementationblock.ID));
      }
  
      if (error) {
        throw error;
      }
  
      fetchImplementationblock();
      customSnackbarRef.current.showSnackbar(
        'Successfully saved Implementation form.',
        'success'
      );
    } catch (error) {
      customSnackbarRef.current.showSnackbar(`Error: ${error.message}`, 'error');
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
            value={implementationblock.IPQ1 || ''}
          />
          <Title>Secondary Action Plan Milestone</Title>
          <TextArea
            placeholder=''
            name='IPQ2'
            required={false}
            onChange={handleChange}
            value={implementationblock.IPQ2 || ''}
          />
          </Section>
          <Section>
          <Title>Set of activities assigned to the selected solution?</Title>
          <TextArea
            placeholder=''
            name='IPQ3'
            required={false}
            onChange={handleChange}
            value={implementationblock.IPQ3 || ''}
          />
          <Title>Plan. Include plan scope, schedule, cost and resources, and MOC/org change?</Title>
          <TextArea
            placeholder=''
            name='IPQ4'
            required={false}
            onChange={handleChange}
            value={implementationblock.IPQ4 || ''}
          />
          <Title>Do. Commit to execution. Track implementation?</Title>
          <TextArea
            placeholder=''
            name='IPQ5'
            required={false}
            onChange={handleChange}
            value={implementationblock.IPQ5 || ''}
          />
          <Title>Check. Monitor on track within preset guardrails and safeguards?</Title>
          <TextArea
            placeholder=''
            name='IPQ6'
            required={false}
            onChange={handleChange}
            value={implementationblock.IPQ6 || ''}
          />
          <Title>Act. Modify and adjust action plan based with preset contingency plans?</Title>
          <TextArea
            placeholder=''
            name='IPQ7'
            required={false}
            onChange={handleChange}
            value={implementationblock.IPQ7 || ''}
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

export default ImplementationblockDisplay
