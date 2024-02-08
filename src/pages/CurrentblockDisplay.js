import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../components/supabase.js';
import CustomSnackbar from '../components/CustomSnackbar.js';
import {
  Container,
  Section,
  Title,
  TextArea,
  StyledButton,
  TitleblockButtons,
} from './TitleBlockPage.js';

const CurrentblockDisplay = ({selectedEntryId, selectedId, onClose }) => {
  const [currentblock, setCurrentblock] = useState({});
  const customSnackbarRef = useRef(null);

  useEffect(() => {
    fetchCurrentblock();
  }, []);

  async function fetchCurrentblock() {
    try {
      const { data, error } = await supabase
        .from('Currentcontent_duplicate')
        .select('*')
        .eq('ID', selectedEntryId)
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        setCurrentblock(data);
      } else {
        setCurrentblock({});
      }
    } catch (error) {
      console.error('Error fetching Current block:', error.message);
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCurrentblock((prevCurrentblock) => ({
      ...prevCurrentblock,
      [name]: value,
    }));
  };

  const dataToSubmit = {
    ...currentblock,
    id: selectedId,
    ID: selectedEntryId,
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let { data, error } = {};
      // Check if implementation block ID exists
      const existingEntry = await supabase
        .from('Currentcontent_duplicate')
        .select('*')
        .eq('ID', currentblock.ID)
        .single();
  
      if (!existingEntry.data) {
        // Insert a new entry if it doesn't exist
        ({ data, error } = await supabase
          .from('Currentcontent_duplicate')
          .insert([dataToSubmit]));
      } else {
        // Update existing entry
        ({ data, error } = await supabase
          .from('Currentcontent_duplicate')
          .update(currentblock)
          .eq('ID', currentblock.ID));
      }
      
      if (error) {
        throw error;
      }
  
      fetchCurrentblock();
      customSnackbarRef.current.showSnackbar(
        'Successfully saved Current form.',
        'success'
      );
    } catch (error) {
      customSnackbarRef.current.showSnackbar(`Error: ${error.message}`, 'error');
      console.error('Error saving Current form:', error.message);
    }
  };


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
          value={currentblock.CS1 || ''}
        />
        <Title>Secondary Current State Statement</Title>
        <TextArea
          placeholder=''
          name='CS2'
          required={false}
          onChange={handleChange}
          value={currentblock.CS2 || ''}
        />
      </Section>
      <Section>
        <Title>What is the problem background? How did we get here?</Title>
        <TextArea
          placeholder=''
          name='CQ1'
          required={false}
          onChange={handleChange}
          value={currentblock.CQ1 || ''}
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
          value={currentblock.CQ2 || ''}
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
          value={currentblock.CQ3 || ''}
        />
        <Title>What is our confidence/uncertainty?</Title>
        <TextArea
          placeholder=''
          name='CQ4'
          required={false}
          onChange={handleChange}
          value={currentblock.CQ4 || ''}
        />
        <Title>What are the causes, root causes and 5 Whys?</Title>
        <TextArea
          placeholder=''
          name='CQ5'
          required={false}
          onChange={handleChange}
          value={currentblock.CQ5 || ''}
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
          value={currentblock.CQ6 || ''}
        />
      </Section>
      <TitleblockButtons>
        <StyledButton type='submit'>Save</StyledButton>
        <StyledButton onClick={onClose}>Close</StyledButton>
      </TitleblockButtons>
      <CustomSnackbar ref={customSnackbarRef} />
    </Container>
    </form>
  );
};

export default CurrentblockDisplay;
