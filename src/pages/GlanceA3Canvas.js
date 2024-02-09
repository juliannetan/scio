import { Button, Modal, Typography } from '@mui/material'
import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { supabase } from '../components/supabase'
import CustomSnackbar from '../components/CustomSnackbar'
import ProblemblockDisplay from './ProblemblockDisplay'
import DecisionblockDisplay from './DecisionblockDisplay'
import CurrentblockDisplay from './CurrentblockDisplay'
import FutureblockDisplay from './FutureblockDisplay'
import ImplementationblockDisplay from './ImplementationblockDisplay'
import SolutionblockDisplay from './SolutionblockDisplay'
import ValueblockDisplay from './ValueblockDisplay'
import LessonsblockDisplay from './LessonsblockDisplay'
import TitleblockDisplay from './TitleblockDisplay'

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
  background-color: #f0f0f0;
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
`

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
  const [selectedId, setSelectedId] = useState(null)
  const customSnackbarRef = useRef(null)
  const [displayModal, setDisplayModal] = useState(false)
  const [displayDecisionModal, setDisplayDecisionModal] = useState(false)
  const [displayCurrentModal, setDisplayCurrentModal] = useState(false)
  const [displayFutureModal, setDisplayFutureModal] = useState(false)
  const [displayImplementationModal, setDisplayImplementationModal] =
    useState(false)
  const [displaySolutionModal, setDisplaySolutionModal] = useState(false)
  const [displayValueModal, setDisplayValueModal] = useState(false)
  const [displayLessonsModal, setDisplayLessonsModal] = useState(false)
  const [displayTitleModal, setDisplayTitleModal] = useState(false)

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

  useEffect(() => {
    fetchData()
    fetchSelectedId()
  }, [selectedEntryId])

  async function fetchSelectedId() {
    try {
      const { data, error } = await supabase
        .from('Titlecontent_duplicate')
        .select('id')
        .eq('ID', selectedEntryId)
        .single()

      if (error) {
        throw error
      }

      if (data) {
        setSelectedId(data.id)
      }
    } catch (error) {
      console.error('Error fetching titleblocks:', error.message)
    }
  }

  const moreInfoText = 'More Info'

  const openModal = () => {
    setDisplayModal(true)
  }

  const closeModal = () => {
    setDisplayModal(false)
    fetchData()
  }

  const openDecisionModal = () => {
    setDisplayDecisionModal(true)
  }

  const closeDecisionModal = () => {
    setDisplayDecisionModal(false)
    fetchData()
  }

  const openCurrentModal = () => {
    setDisplayCurrentModal(true)
  }

  const closeCurrentModal = () => {
    setDisplayCurrentModal(false)
    fetchData()
  }

  const openFutureModal = () => {
    setDisplayFutureModal(true)
  }

  const closeFutureModal = () => {
    setDisplayFutureModal(false)
    fetchData()
  }

  const openImplementationModal = () => {
    setDisplayImplementationModal(true)
  }

  const closeImplementationModal = () => {
    setDisplayImplementationModal(false)
    fetchData()
  }

  const openSolutionModal = () => {
    setDisplaySolutionModal(true)
  }

  const closeSolutionModal = () => {
    setDisplaySolutionModal(false)
    fetchData()
  }

  const openValueModal = () => {
    setDisplayValueModal(true)
  }

  const closeValueModal = () => {
    setDisplayValueModal(false)
    fetchData()
  }

  const openLessonsModal = () => {
    setDisplayLessonsModal(true)
  }

  const closeLessonsModal = () => {
    setDisplayLessonsModal(false)
    fetchData()
  }

  const openTitleModal = () => {
    setDisplayTitleModal(true)
  }

  const closeTitleModal = () => {
    setDisplayTitleModal(false)
    fetchData()
  }

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
                  <Typography variant='subtitle1'>{content.TQ2}</Typography>
                </HeaderItem>
              </React.Fragment>
            ))}
          <StyledButton onClick={openTitleModal}>{moreInfoText}</StyledButton>
          <Modal open={displayTitleModal}>
            <TitleblockDisplay
              selectedEntryId={selectedEntryId}
              selectedId={selectedId}
              onClose={closeTitleModal}
            />
          </Modal>
        </Header>
        <Section>
          <Title>Problem Statement</Title>
          {problemContent &&
            problemContent.map((content) => (
              <React.Fragment key={content.id}>
                <Typography variant='body1'>{content.PS1}</Typography>
              </React.Fragment>
            ))}
          <StyledButton onClick={openModal}>{moreInfoText}</StyledButton>
          <Modal open={displayModal}>
            <ProblemblockDisplay
              selectedEntryId={selectedEntryId}
              selectedId={selectedId}
              onClose={closeModal}
            />
          </Modal>
        </Section>

        <Section>
          <Title>Decision</Title>
          {decisionContent &&
            decisionContent.map((content) => (
              <React.Fragment key={content.id}>
                <Typography variant='body1'>{content.DS1}</Typography>
              </React.Fragment>
            ))}
          <StyledButton onClick={openDecisionModal}>
            {moreInfoText}
          </StyledButton>
          <Modal open={displayDecisionModal}>
            <DecisionblockDisplay
              selectedEntryId={selectedEntryId}
              selectedId={selectedId}
              onClose={closeDecisionModal}
            />
          </Modal>
        </Section>

        <Section>
          <Title>Current</Title>
          {currentContent &&
            currentContent.map((content) => (
              <React.Fragment key={content.id}>
                <Typography variant='body1'>{content.CS1}</Typography>
              </React.Fragment>
            ))}
          <StyledButton onClick={openCurrentModal}>{moreInfoText}</StyledButton>
          <Modal open={displayCurrentModal}>
            <CurrentblockDisplay
              selectedEntryId={selectedEntryId}
              selectedId={selectedId}
              onClose={closeCurrentModal}
            />
          </Modal>
        </Section>

        <Section>
          <Title>Implementation</Title>
          {implementationContent &&
            implementationContent.map((content) => (
              <React.Fragment key={content.id}>
                <Typography variant='body1'>{content.IPQ1}</Typography>
              </React.Fragment>
            ))}
          <StyledButton onClick={openImplementationModal}>
            {moreInfoText}
          </StyledButton>
          <Modal open={displayImplementationModal}>
            <ImplementationblockDisplay
              selectedEntryId={selectedEntryId}
              selectedId={selectedId}
              onClose={closeImplementationModal}
            />
          </Modal>
        </Section>

        <Section>
          <Title>Future</Title>
          {futureContent &&
            futureContent.map((content) => (
              <React.Fragment key={content.id}>
                <Typography variant='body1'>{content.FS1}</Typography>
              </React.Fragment>
            ))}
          <StyledButton onClick={openFutureModal}>{moreInfoText}</StyledButton>
          <Modal open={displayFutureModal}>
            <FutureblockDisplay
              selectedEntryId={selectedEntryId}
              selectedId={selectedId}
              onClose={closeFutureModal}
            />
          </Modal>
        </Section>

        <Section>
          <Title>Value</Title>
          {valueContent &&
            valueContent.map((content) => (
              <React.Fragment key={content.id}>
                <Typography variant='body1'>{content.VDQ1}</Typography>
              </React.Fragment>
            ))}
          <StyledButton onClick={openValueModal}>{moreInfoText}</StyledButton>
          <Modal open={displayValueModal}>
            <ValueblockDisplay
              selectedEntryId={selectedEntryId}
              selectedId={selectedId}
              onClose={closeValueModal}
            />
          </Modal>
        </Section>

        <Section>
          <Title>Solution</Title>
          {solutionContent &&
            solutionContent.map((content) => (
              <React.Fragment key={content.id}>
                <Typography variant='body1'>{content.SEQ1}</Typography>
              </React.Fragment>
            ))}
          <StyledButton onClick={openSolutionModal}>
            {moreInfoText}
          </StyledButton>
          <Modal open={displaySolutionModal}>
            <SolutionblockDisplay
              selectedEntryId={selectedEntryId}
              selectedId={selectedId}
              onClose={closeSolutionModal}
            />
          </Modal>
        </Section>

        <Section>
          <Title>Lessons</Title>
          {lessonsContent &&
            lessonsContent.map((content) => (
              <React.Fragment key={content.id}>
                <Typography variant='body1'>{content.LLS1}</Typography>
              </React.Fragment>
            ))}
          <StyledButton onClick={openLessonsModal}>{moreInfoText}</StyledButton>
          <Modal open={displayLessonsModal}>
            <LessonsblockDisplay
              selectedEntryId={selectedEntryId}
              selectedId={selectedId}
              onClose={closeLessonsModal}
            />
          </Modal>
        </Section>
      </Container>
      <CustomSnackbar ref={customSnackbarRef} />
    </>
  )
}

export default A3Canvas
