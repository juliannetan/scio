import styled from "styled-components";
import React, { useState, useEffect } from 'react';
import { supabase } from '../components/supabase.js';
import { Button } from "@mui/material";

export const Container = styled.div`
  padding: 20px;
  padding-bottom: 70px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

export const Section = styled.div`
  background-color: #fff;
  color: #333;
  padding: 20px;
  margin: 10px;
  width: 48%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

export const Title = styled.h2`
  font-size: 1rem;
  margin-bottom: 15px;
`;

export const TextArea = styled.textarea`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-top: 20px;
  border-radius: 3px;
  border: 1px solid #ccc;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
`;

export const StyledButton = styled(Button)`
  margin-top: 10px;
  margin: 0 10px; /* Adjust the margin to create space between buttons */
`;

export const TitleblockButtons = styled.div`
  display: flex;
  justify-content: right;
  margin-top: 20px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff; /* Add background color if needed */
  padding: 10px 30px; /* Add padding for better visibility */
`;

export const TitleblockNotes = styled.div`
  margin-top: 20px;
`;

export const TitleblockNote = styled.p`
  margin-bottom: 10px;
`;


const TitleblockPage = ({ setNextPage }) => {
  const handleNextClick = () => {
    setNextPage();
  };

  const [titleblocks, setTitleblocks] = useState([]);

  const [titleblock, setTitleblock] = useState({
    ID: '', Description: '', ProblemSolvers: '', DecisionMakers: '', Implementation: '', Assurance: '', Delivery: '', Organization: '', Assets: '', Practice: '', Value: '', Status: '', TQ1: '', TQ2: '', TQ3: '', TQ4: '', TQ5: '', TQ6: '', TQ7: '', TQ8: ''
  });

  useEffect(() => {
    fetchTitleblocks();
  }, []);

  async function fetchTitleblocks() {
    const { data } = await supabase
      .from('Titlecontent')
      .select('*');
    setTitleblocks(data);
  }

  function handleChange(event) {
    setTitleblock(prevFormData => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value
      };
    });
  }

  async function createTitleblock(e) {
    e.preventDefault();
    await supabase
      .from('Titlecontent')
      .insert([{
        ID: titleblock.ID, Description: titleblock.Description, ProblemSolvers: titleblock.ProblemSolvers, DecisionMakers: titleblock.DecisionMakers,
        Implementation: titleblock.Implementation, Assurance: titleblock.Assurance, Delivery: titleblock.Delivery, Organization: titleblock.Organization,
        Assets: titleblock.Assets, Practice: titleblock.Practice, Value: titleblock.Value, Status: titleblock.Status, TQ1: titleblock.TQ1, TQ2: titleblock.TQ2,
        TQ3: titleblock.TQ3, TQ4: titleblock.TQ4, TQ5: titleblock.TQ5, TQ6: titleblock.TQ6, TQ7: titleblock.TQ7, TQ8: titleblock.TQ8
      }])
      .select();

    fetchTitleblocks();
  }

  return (
    <form onSubmit={createTitleblock}>
    <Container>
        <Section>
          <Title>ID: Unique Identification Reference</Title>
          <TextArea placeholder="AB-123456" name='ID' required={true} onChange={handleChange} />
          <Title>Title: PSDM Description</Title>
          <TextArea placeholder="" name='Description' required={false} onChange={handleChange} />
          <Title>Problem-Solvers: Input, Recommend</Title>
          <TextArea placeholder="" name='ProblemSolvers' required={false} onChange={handleChange} />
          <Title>Decision-Makers: Decide, Agree</Title>
          <TextArea placeholder="" name='DecisionMakers' required={false} onChange={handleChange} />
          <Title>Implementation: Action Plan Execution</Title>
          <TextArea placeholder="" name='Implementation' required={false} onChange={handleChange} />
          <Title>Assurance: Monitor Action, Performance, Value</Title>
          <TextArea placeholder="" name='Assurance' required={false} onChange={handleChange} />
          <Title>Delivery: Lessons Learned</Title>
          <TextArea placeholder="" name='Delivery' required={false} onChange={handleChange} />
          <Title>Organization: Lowest org level accountability</Title>
          <TextArea placeholder="" name='Organization' required={false} onChange={handleChange} />
          <Title>Assets: Lowest asset level applicability</Title>
          <TextArea placeholder="" name='Assets' required={false} onChange={handleChange} />
          <Title>Practice: Asset management practice</Title>
          <TextArea placeholder="" name='Practice' required={false} onChange={handleChange} />
          <Title>Value: Primary Value Driver and Impact category</Title>
          <TextArea placeholder="" name='Value' required={false} onChange={handleChange} />
          <Title>
            Status: Initiation, Problem, Solution, Decision, Implementation, Value
            Delivery, Lessons Learned, Complete, On Hold, Cancelled (not worth
            solving)
          </Title>
          <TextArea placeholder="" name='Status' required={false} onChange={handleChange} />
        </Section>
        <Section>
          <Title>What are the PSDM Identifiers?</Title>
          <TextArea placeholder="" name='TQ1' required={false} onChange={handleChange} />
          <Title>What is the PSDM Status?</Title>
          <TextArea placeholder="" name='TQ2' required={false} onChange={handleChange} />
          <Title>Who are the Problem-Solvers?</Title>
          <TextArea placeholder="" name='TQ3' required={false} onChange={handleChange} />
          <Title>Who are the Decision-Makers?</Title>
          <TextArea placeholder="" name='TQ4' required={false} onChange={handleChange} />
          <Title>Who does Implementation?</Title>
          <TextArea placeholder="" name='TQ5' required={false} onChange={handleChange} />
          <Title>Who monitors progress, performance and value delivery?</Title>
          <TextArea placeholder="" name='TQ6' required={false} onChange={handleChange} />
          <Title>Who leads lessons learned?</Title>
          <TextArea placeholder="" name='TQ7' required={false} onChange={handleChange} />
          <Title>
            Do all team members have the requisite competencies and authorities
            for their assigned role?
          </Title>
          <TextArea placeholder="" name='TQ8' required={false} onChange={handleChange} />
          <TitleblockNotes>
            <TitleblockNote>Note1: Use RAPID, RACI, RAD or other team frame</TitleblockNote>
            <TitleblockNote>
              Note2: Organization, Assets, Practice, Value are database tables
              that form EOMS ontology
            </TitleblockNote>
          </TitleblockNotes>
        </Section>
        <TitleblockButtons>
          <StyledButton type='submit'>Save</StyledButton>
          <StyledButton type='submit' onClick={handleNextClick}>Next</StyledButton>
        </TitleblockButtons>
    </Container>
    </form>

  );
}

export default TitleblockPage;