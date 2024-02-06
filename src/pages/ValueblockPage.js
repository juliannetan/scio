import React, { useState, useEffect } from 'react';
import { supabase } from '../components/supabase.js';
import { Container, Section, Title, TextArea, StyledButton, TitleblockButtons } from './TitleBlockPage.js';

const ValueblockPage = ({ setNextPage }) => {
  const handleNextClick = () => {
    setNextPage();
  };

  const [valueblocks, setValueblocks] = useState([]);
  const [valueblock, setValueblock] = useState({
    VDQ1: '', VDQ2: '', VDQ3: '', VDQ4: ''
  });

  useEffect(() => {
    fetchValueblocks();
  }, []);

  async function fetchValueblocks() {
    const { data } = await supabase
      .from('Valuecontent')
      .select('*');
    setValueblocks(data);
  }

  function handleChange(event) {
    setValueblock(prevFormData => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value
      };
    });
  }

  async function createValueblock(e) {
    e.preventDefault();
    await supabase
      .from('Valuecontent')
      .insert([{
        VDQ1: valueblock.VDQ1, VDQ2: valueblock.VDQ2, VDQ3: valueblock.VDQ3, VDQ4: valueblock.VDQ4
      }])
      .select();

    fetchValueblocks();
  }

  return (
    <form onSubmit={createValueblock}>
      <Container>
        <Section>
          <Title>Performance Graphic</Title>
          {/* Add any relevant components or content here */}
          <TextArea placeholder="" name="performanceGraphic" required={false} onChange={handleChange} />
          <Title>Value Delivery Chart</Title>
          {/* Add any relevant components or content here */}
          <TextArea placeholder="" name="valueDeliveryChart" required={false} onChange={handleChange} />
          <Title>Secondary Value Delivery</Title>
          {/* Add any relevant components or content here */}
          <TextArea placeholder="" name="secondaryValueDelivery" required={false} onChange={handleChange} />
        </Section>
        <Section>
          <Title>Is what we did having the desired affect within the expected time frame?</Title>
          <TextArea placeholder="" name="VDQ1" required={false} onChange={handleChange} />
          <Title>Identify and track leading performance metrics to lagging business outcomes?</Title>
          <TextArea placeholder="" name="VDQ2" required={false} onChange={handleChange} />
          <Title>Monitor value realization?</Title>
          <TextArea placeholder="" name="VDQ3" required={false} onChange={handleChange} />
          <Title>Performance map to show value delivery progress</Title>
          <TextArea placeholder="" name="VDQ4" required={false} onChange={handleChange} />
        </Section>
        <TitleblockButtons>
        <StyledButton type='submit'>Save</StyledButton>
        <StyledButton type='submit' onClick={handleNextClick}>Next</StyledButton>
      </TitleblockButtons>
      </Container>
    </form>
  );
}

export default ValueblockPage;