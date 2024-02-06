import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../components/supabase.js';
import { Container, Section, Title, TextArea, StyledButton, TitleblockButtons } from './TitleBlockPage.js';
import CustomSnackbar from '../components/CustomSnackbar.js';

const FutureblockPage = ({ setNextPage }) => {
  const customSnackbarRef = useRef(null);
  const [futureblocks, setFutureblocks] = useState([]);
  const [futureblock, setFutureblock] = useState({
    FS1: '', FS2: '', FQ1: '', FQ2: '', FQ3: '', FQ4: '', FQ5: '', FQ6: ''
  });

  const handleNextClick = () => {
    setNextPage();
  };

  useEffect(() => {
    fetchFutureblocks();
  }, []);

  async function fetchFutureblocks() {
    const { data } = await supabase
      .from('Futurecontent')
      .select('*');
    setFutureblocks(data);
  }

  function handleChange(event) {
    setFutureblock(prevFormData => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value
      };
    });
  }

  async function createFutureblock(e) {
    e.preventDefault();
    await supabase
      .from('Futurecontent')
      .insert([{
        FS1: futureblock.FS1, FS2: futureblock.FS2, FQ1: futureblock.FQ1, FQ2: futureblock.FQ2, FQ3: futureblock.FQ3, FQ4: futureblock.FQ4, FQ5: futureblock.FQ5, FQ6: futureblock.FQ6
      }])
      .select();

    fetchFutureblocks();
    customSnackbarRef.current.showSnackbar('You have successfully saved this Future State form');
  }

  return (
    <form onSubmit={createFutureblock}>
      <Container>
        <Section>
          <Title>Future State Gap Statement with bullets</Title>
          <TextArea placeholder="" name="FS1" required={false} onChange={handleChange} />
          <Title>Future State Chart/Graphic</Title>
          <TextArea />
          <Title>Secondary Content</Title>
          <TextArea placeholder="" name="FS2" required={false} onChange={handleChange} />
        </Section>
        <Section>
          <Title>What are the expected targets from current business goals & objectives?</Title>
          <TextArea placeholder="" name="FQ1" required={false} onChange={handleChange} />
          <Title>What is the gap between current and future state?</Title>
          <TextArea placeholder="" name="FQ2" required={false} onChange={handleChange} />
          <Title>Can the real or perceived constraints in this situation be challenged?</Title>
          <TextArea placeholder="" name="FQ3" required={false} onChange={handleChange} />
          <Title>What are the conditions of satisfaction for success?</Title>
          <TextArea placeholder="" name="FQ4" required={false} onChange={handleChange} />
          <Title>How much of the gap is controllable?</Title>
          <TextArea placeholder="" name="FQ5" required={false} onChange={handleChange} />
          <Title>What is our tolerance for failure or an undesired outcome?</Title>
          <TextArea placeholder="" name="FQ6" required={false} onChange={handleChange} />
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

export default FutureblockPage;