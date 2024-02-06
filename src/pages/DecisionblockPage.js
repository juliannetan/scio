import React, { useState, useEffect } from 'react';
import { supabase } from '../components/supabase.js';
import { Container, Section, Title, TextArea, StyledButton, TitleblockButtons } from './TitleBlockPage.js';

const DecisionBlockPage = ({ setNextPage }) => {
  const handleNextClick = () => {
    setNextPage();
  };

  const [decisionblocks, setDecisionblocks] = useState([]);
  const [decisionblock, setDecisionblock] = useState({
    DS1: '', DQ1: '', DQ2: '', DQ3: '', DQ4: '', DQ5: '', DQ6: '', DQ7: ''
  });

  useEffect(() => {
    fetchDecisionblocks();
  }, []);

  async function fetchDecisionblocks() {
    const { data } = await supabase
      .from('Decisioncontent')
      .select('*');
    setDecisionblocks(data);
  }

  function handleChange(event) {
    setDecisionblock(prevFormData => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value
      };
    });
  }

  async function createDecisionblock(e) {
    e.preventDefault();
    await supabase
      .from('Decisioncontent')
      .insert([{
        DS1: decisionblock.DS1, DQ1: decisionblock.DQ1, DQ2: decisionblock.DQ2, DQ3: decisionblock.DQ3, DQ4: decisionblock.DQ4, DQ5: decisionblock.DQ5, DQ6: decisionblock.DQ6, DQ7: decisionblock.DQ7
      }])
      .select();

    fetchDecisionblocks();
  }

  return (
    <form onSubmit={createDecisionblock}>
      <Container>
        <Section>
          <Title>Decision Statement</Title>
          <TextArea placeholder="" name="DS1" required={false} onChange={handleChange} />
          <Title>Strategy & Values Alignment Table</Title>
          <TextArea placeholder="" name="DQ1" required={false} onChange={handleChange} />
          <Title>Effort vs Success Table (optional)</Title>
          <TextArea placeholder="" name="DQ2" required={false} onChange={handleChange} />
        </Section>
        <Section>
          <Title>Identify several compelling creative alternatives.</Title>
          <TextArea placeholder="" name="DQ3" required={false} onChange={handleChange} />
          <Title>What model type is best suited for the right level of evaluation rigor and complexity?</Title>
          <TextArea placeholder="" name="DQ4" required={false} onChange={handleChange} />
          <Title>What inputs are influential variables? Technical, people, management system?</Title>
          <TextArea placeholder="" name="DQ5" required={false} onChange={handleChange} />
          <Title>What are the best knowledge sources: intuition/experience, data/analytics evidence, or a mix? How do we trust human judgment vs ML/AI?</Title>
          <TextArea placeholder="" name="DQ6" required={false} onChange={handleChange} />
          <Title>Have we guarded against all relevant biases?</Title>
          <TextArea placeholder="" name="DQ7" required={false} onChange={handleChange} />
        </Section>
        <TitleblockButtons>
        <StyledButton type='submit'>Save</StyledButton>
        <StyledButton type='submit' onClick={handleNextClick}>Next</StyledButton>
      </TitleblockButtons>
      </Container>
    </form>
  );
}

export default DecisionBlockPage;