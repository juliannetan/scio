import { Button, Typography } from '@mui/material'
import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { supabase } from '../components/supabase'
import CustomSnackbar from '../components/CustomSnackbar'

const Container = styled.div`
  padding: 20px;
  padding-bottom: 70px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`

const Section = styled.div`
  background-color: #fff;
  color: #333;
  padding: 20px;
  margin: 10px;
  width: 48%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`

const Title = styled.h2`
  font-size: 1rem;
  margin-bottom: 15px;
`

const Header = styled.div`
  padding: 0 20px 20px;
  border-radius: 8px;
  width: 100%; /* Set width to 100% */
  display: flex;
  flex-direction: column; /* Arrange items in a column */
  align-items: center; /* Center items horizontally */
  background-color: #fff;
  color: #333;
  margin: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`

const HeaderItem = styled.div`
  margin-bottom: -20px;
  width: 100%; /* Set width to 100% */
  display: flex;
  align-items: center;
`

const HeaderLabel = styled(Title)`
  margin-right: 10px;
`

const MainHeader = styled.h1`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 20px;
`;

const StyledButton = styled(Button)`
  margin-top: 10px;
  margin: 0 10px;
  color: #fff;
  background-color: #004f71;

  &:hover {
    background-color: #002738;
  }

  padding: 2px 20px;
  font-size: 20px;
  text-transform: capitalize;
`

const A3Canvas = ({ selectedEntryId }) => {
  const [fetchError, setFetchError] = useState(null)
  const [titleContent, setTitleContent] = useState(null)
  const [problemContent, setProblemContent] = useState(null)
  const [decisionContent, setDecisionContent] = useState(null)
  const [currentContent, setCurrentContent] = useState(null)
  const [implementationContent, setImplementationContent] = useState(null)
  const [futureContent, setFutureContent] = useState(null)
  const [valueContent, setValueContent] = useState(null)
  const [solutionContent, setSolutionContent] = useState(null)
  const [lessonsContent, setLessonsContent] = useState(null)
  const customSnackbarRef = useRef(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          titleData,
          problemData,
          decisionData,
          currentData,
          implementationData,
          futureData,
          valueData,
          solutionData,
          lessonsData,
        ] = await Promise.all([
          supabase
            .from('Titlecontent_duplicate')
            .select('*')
            .eq('ID', selectedEntryId),
          supabase
            .from('Problemcontent_duplicate')
            .select('*')
            .eq('ID', selectedEntryId),
          supabase
            .from('Decisioncontent_duplicate')
            .select('*')
            .eq('ID', selectedEntryId),
          supabase
            .from('Currentcontent_duplicate')
            .select('*')
            .eq('ID', selectedEntryId),
          supabase
            .from('Implementationcontent_duplicate')
            .select('*')
            .eq('ID', selectedEntryId),
          supabase
            .from('Futurecontent_duplicate')
            .select('*')
            .eq('ID', selectedEntryId),
          supabase
            .from('Valuecontent_duplicate')
            .select('*')
            .eq('ID', selectedEntryId),
          supabase
            .from('Solutioncontent_duplicate')
            .select('*')
            .eq('ID', selectedEntryId),
          supabase
            .from('Lessonscontent_duplicate')
            .select('*')
            .eq('ID', selectedEntryId),
        ])

        setTitleContent(titleData.data)
        setProblemContent(problemData.data)
        setDecisionContent(decisionData.data)
        setCurrentContent(currentData.data)
        setImplementationContent(implementationData.data)
        setFutureContent(futureData.data)
        setValueContent(valueData.data)
        setSolutionContent(solutionData.data)
        setLessonsContent(lessonsData.data)
        setFetchError(null)
      } catch (error) {
        customSnackbarRef.current.showSnackbar(error.message, 'error')
        console.error(error)
      }
    }

    fetchData()
  }, [selectedEntryId])

  const moreInfoText = 'More Info'

  return (
    <>
      <Container>
      <MainHeader>A3 Canvas</MainHeader>
        <Header>
          <HeaderItem>
            <HeaderLabel>ID:</HeaderLabel>
            <Typography variant='subtitle1'>{selectedEntryId}</Typography>
          </HeaderItem>
          {titleContent &&
            titleContent.map((content) => (
              <React.Fragment key={content.id}>
                <HeaderItem>
                  <HeaderLabel>Description:</HeaderLabel>
                  <Typography variant='subtitle1'>
                    {content.Description}
                  </Typography>
                </HeaderItem>
                <HeaderItem>
                  <HeaderLabel>Team Problem Solver:</HeaderLabel>
                  <Typography variant='subtitle1'>
                    {content.ProblemSolvers}
                  </Typography>
                </HeaderItem>
                <HeaderItem>
                  <HeaderLabel>Team Decision Maker:</HeaderLabel>
                  <Typography variant='subtitle1'>
                    {content.DecisionMakers}
                  </Typography>
                </HeaderItem>
                <HeaderItem>
                  <HeaderLabel>Status:</HeaderLabel>
                </HeaderItem>
              </React.Fragment>
            ))}
        </Header>
        <Section>
          <Title>Problem Statement</Title>
          {fetchError && <p>{fetchError}</p>}
          {problemContent &&
            problemContent.map((content) => (
              <React.Fragment key={content.id}>
                <Typography variant='body1'>{content.PS1}</Typography>
              </React.Fragment>
            ))}
          <Link to='/scio/home/problem-statement'>
            <StyledButton>{moreInfoText}</StyledButton>
          </Link>
        </Section>

        <Section>
          <Title>Decision</Title>
          {fetchError && <p>{fetchError}</p>}
          {decisionContent &&
            decisionContent.map((content) => (
              <React.Fragment key={content.id}>
                <Typography variant='body1'>{content.DS1}</Typography>
              </React.Fragment>
            ))}
          <Link to='/scio/home/decision'>
            <StyledButton>{moreInfoText}</StyledButton>
          </Link>
        </Section>

        <Section>
          <Title>Current</Title>
          {fetchError && <p>{fetchError}</p>}
          {currentContent &&
            currentContent.map((content) => (
              <React.Fragment key={content.id}>
                <Typography variant='body1'>{content.CS1}</Typography>
              </React.Fragment>
            ))}
          <Link to='/scio/home/current'>
            <StyledButton>{moreInfoText}</StyledButton>
          </Link>
        </Section>

        <Section>
          <Title>Implementation</Title>
          {fetchError && <p>{fetchError}</p>}
          {implementationContent &&
            implementationContent.map((content) => (
              <React.Fragment key={content.id}>
                <Typography variant='body1'>{content.IPQ1}</Typography>
              </React.Fragment>
            ))}
          <Link to='/scio/home/implementation'>
            <StyledButton>{moreInfoText}</StyledButton>
          </Link>
        </Section>

        <Section>
          <Title>Future</Title>
          {fetchError && <p>{fetchError}</p>}
          {futureContent &&
            futureContent.map((content) => (
              <React.Fragment key={content.id}>
                <Typography variant='body1'>{content.FS1}</Typography>
              </React.Fragment>
            ))}
          <Link to='/scio/home/future'>
            <StyledButton>{moreInfoText}</StyledButton>
          </Link>
        </Section>

        <Section>
          <Title>Value</Title>
          {fetchError && <p>{fetchError}</p>}
          {valueContent &&
            valueContent.map((content) => (
              <React.Fragment key={content.id}>
                <Typography variant='body1'>{content.VDQ1}</Typography>
              </React.Fragment>
            ))}
          <Link to='/scio/home/value'>
            <StyledButton>{moreInfoText}</StyledButton>
          </Link>
        </Section>

        <Section>
          <Title>Solution</Title>
          {fetchError && <p>{fetchError}</p>}
          {solutionContent &&
            solutionContent.map((content) => (
              <React.Fragment key={content.id}>
                <Typography variant='body1'>{content.SEQ1}</Typography>
              </React.Fragment>
            ))}
          <Link to='/scio/home/solution'>
            <StyledButton>{moreInfoText}</StyledButton>
          </Link>
        </Section>

        <Section>
          <Title>Lessons</Title>
          {fetchError && <p>{fetchError}</p>}
          {lessonsContent &&
            lessonsContent.map((content) => (
              <React.Fragment key={content.id}>
                <Typography variant='body1'>{content.LLS1}</Typography>
              </React.Fragment>
            ))}
          <Link to='/scio/home/lessons'>
            <StyledButton>{moreInfoText}</StyledButton>
          </Link>
        </Section>
      </Container>
      <CustomSnackbar ref={customSnackbarRef} />
    </>
  )
}

export default A3Canvas
