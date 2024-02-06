import React, { useState, useEffect } from 'react';
import { supabase } from '../components/supabase.js';
import { Container, Section, Title, TextArea, StyledButton, TitleblockButtons } from './TitleBlockPage.js';

const ImplementationblockPage = ({ setNextPage }) => {
  const handleNextClick = () => {
    setNextPage();
  };

  const [implementationblocks, setImplementationblocks] = useState([]);
  const [implementationblock, setImplementationblock] = useState({
    IPQ1: '', IPQ2: '', IPQ3: '', IPQ4: '', IPQ5: '', IPQ6: '', IPQ7: ''
  });

  useEffect(() => {
    fetchImplementationblocks();
  }, []);

  async function fetchImplementationblocks() {
    const { data } = await supabase
      .from('Implementationcontent')
      .select('*');
    setImplementationblocks(data);
  }

  function handleChange(event) {
    setImplementationblock(prevFormData => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value
      };
    });
  }

  async function createImplementationblock(e) {
    e.preventDefault();

    await supabase
      .from('Implementationcontent')
      .insert([{
        IPQ1: implementationblock.IPQ1, IPQ2: implementationblock.IPQ2, IPQ3: implementationblock.IPQ3,
        IPQ4: implementationblock.IPQ4, IPQ5: implementationblock.IPQ5, IPQ6: implementationblock.IPQ6,
        IPQ7: implementationblock.IPQ7
      }])
      .select();

    fetchImplementationblocks();
  }

  return (
    <form onSubmit={createImplementationblock}>
      <Container>
        <Section>
          <Title>Action Plan Milestone Chart</Title>
          <TextArea placeholder="" name="IPQ1" required={false} onChange={handleChange} />
          <Title>Secondary Action Plan Milestone</Title>
          <TextArea placeholder="" name="IPQ2" required={false} onChange={handleChange} />
        </Section>
        <Section>
          <Title>Set of activities assigned to the selected solution?</Title>
          <TextArea placeholder="" name="IPQ3" required={false} onChange={handleChange} />
          <Title>Plan. Include plan scope, schedule, cost and resources, and MOC/org change?</Title>
          <TextArea placeholder="" name="IPQ4" required={false} onChange={handleChange} />
          <Title>Do. Commit to execution. Track implementation?</Title>
          <TextArea placeholder="" name="IPQ5" required={false} onChange={handleChange} />
          <Title>Check. Monitor on track within preset guardrails and safeguards?</Title>
          <TextArea placeholder="" name="IPQ6" required={false} onChange={handleChange} />
          <Title>Act. Modify and adjust action plan based with preset contingency plans?</Title>
          <TextArea placeholder="" name="IPQ7" required={false} onChange={handleChange} />
        </Section>
        <TitleblockButtons>
        <StyledButton type='submit'>Save</StyledButton>
        <StyledButton type='submit' onClick={handleNextClick}>Next</StyledButton>
      </TitleblockButtons>
      </Container>
    </form>
  );
}

export default ImplementationblockPage;