import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../components/supabase.js';
import { Container, Section, Title, TextArea, StyledButton, TitleblockButtons } from './TitleBlockPage.js';
import CustomSnackbar from '../components/CustomSnackbar.js';

const ProblemblockPage = ({ setNextPage }) => {
  const customSnackbarRef = useRef(null);
  const [problemblocks, setProblemblocks] = useState([]);
  const [problemblock, setProblemblock] = useState({
    PS1: '', PS2: '', PQ1: '', PQ2: '', PQ3: '', PQ4: '', PQ5: '', PQ6: ''
  });

  const handleNextClick = () => {
    setNextPage();
  };

  useEffect(() => {
    fetchProblemblocks();
  }, []);

  async function fetchProblemblocks() {
    const { data } = await supabase
      .from('Problemcontent')
      .select('*');
    setProblemblocks(data);
  }

  function handleChange(event) {
    setProblemblock(prevFormData => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value
      };
    });
  }

  async function createProblemblock(e) {
    e.preventDefault();
    await supabase
      .from('Problemcontent')
      .insert([{
        PS1: problemblock.PS1, PS2: problemblock.PS2, PQ1: problemblock.PQ1, PQ2: problemblock.PQ2, PQ3: problemblock.PQ3, PQ4: problemblock.PQ4, PQ5: problemblock.PQ5, PQ6: problemblock.PQ6
      }])
      .select();

    fetchProblemblocks();
    customSnackbarRef.current.showSnackbar('You have successfully saved this Problem Statement form');
  }

  return (
    <form onSubmit={createProblemblock}>
      <Container>
        <Section>
          <Title>Problem Statement</Title>
          <TextArea placeholder="" name="PS1" required={false} onChange={handleChange} />
          <Title>Secondary Content</Title>
          <TextArea placeholder="" name="PS2" required={false} onChange={handleChange} />
        </Section>
        <Section>
          <Title>What is the Problem Brief, our initial understanding of the problem (a priority)</Title>
          <TextArea placeholder="" name="PQ1" required={false} onChange={handleChange} />
          <Title>Why this is a problem worth solving?</Title>
          <TextArea placeholder="" name="PQ2" required={false} onChange={handleChange} />
          <Title>What is the threat or opportunity to the organization's goals, objectives, strategies or plans?</Title>
          <TextArea placeholder="" name="PQ3" required={false} onChange={handleChange} />
          <Title>Who or what internal/external stakeholders are affected?</Title>
          <TextArea placeholder="" name="PQ4" required={false} onChange={handleChange} />
          <Title>What alternate frames apply as lens through which we see the problem (apply different perspectives using diverse frameworks)</Title>
          <TextArea placeholder="" name="PQ5" required={false} onChange={handleChange} />
          <Title>Clarify the problem statement in context of suitable frame(s)</Title>
          <TextArea placeholder="" name="PQ6" required={false} onChange={handleChange} />
        </Section>
        <TitleblockButtons>
        <StyledButton type='submit'>Save</StyledButton>
        <StyledButton type='submit' onClick={handleNextClick}>Next</StyledButton>
      </TitleblockButtons>
      </Container>
      <CustomSnackbar ref={customSnackbarRef} />
    </form>
  );
}

export default ProblemblockPage;