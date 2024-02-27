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

import { v4 as uuidv4 } from 'uuid'
import { Button, Grid, Card, CardMedia, CardContent } from '@mui/material'

const CDNURL = process.env.REACT_APP_CDN_URL

const ImplementationblockDisplay = ({
  selectedEntryId,
  selectedId,
  onClose,
}) => {
  const [implementationblock, setImplementationblock] = useState({})
  const customSnackbarRef = useRef(null)

  useEffect(() => {
    fetchImplementationblock()
  }, [])

  async function fetchImplementationblock() {
    try {
      const { data, error } = await supabase
        .from('Implementationcontent_duplicate')
        .select('*')
        .eq('ID', selectedEntryId)
        .single()

      if (error) {
        throw error
      }

      if (data) {
        setImplementationblock(data)
      } else {
        setImplementationblock({})
      }
    } catch (error) {
      console.error('Error fetching Implementation block:', error.message)
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setImplementationblock((prevImplementationblock) => ({
      ...prevImplementationblock,
      [name]: value,
    }))
  }

  const dataToSubmit = {
    ...implementationblock,
    id: selectedId,
    ID: selectedEntryId,
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      let { data, error } = {}
      // Check if implementation block ID exists
      const existingEntry = await supabase
        .from('Implementationcontent_duplicate')
        .select('*')
        .eq('ID', implementationblock.ID)
        .single()

      if (!existingEntry.data) {
        // Insert a new entry if it doesn't exist
        ;({ data, error } = await supabase
          .from('Implementationcontent_duplicate')
          .insert([dataToSubmit]))
      } else {
        // Update existing entry
        ;({ data, error } = await supabase
          .from('Implementationcontent_duplicate')
          .update(implementationblock)
          .eq('ID', implementationblock.ID))
      }

      if (error) {
        throw error
      }

      fetchImplementationblock()
      customSnackbarRef.current.showSnackbar(
        'Successfully saved Implementation form.',
        'success',
      )
    } catch (error) {
      customSnackbarRef.current.showSnackbar(`Error: ${error.message}`, 'error')
      console.error('Error saving Implementation form:', error.message)
    }
  }

  /* Upload Image*/

  const [images, setImages] = useState([])
  const [selectedFile, setSelectedFile] = useState(null)

  async function getImages() {
    const { data, error } = await supabase.storage
      .from('images')
      .list('scio/' + selectedEntryId + '/ip', {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' },
      })

    if (data !== null) {
      setImages(data)
    } else {
      alert('Error loading images')
      console.log(error)
    }
  }

  useEffect(() => {
    getImages()
  }, [])

  async function uploadImage(e) {
    let file = e.target.files[0]

    const { data, error } = await supabase.storage
      .from('images/scio/' + selectedEntryId + '/ip')
      .upload('/' + uuidv4(), file)

    if (data) {
      console.log('Image uploaded successfully')
      getImages()
    } else {
      console.log('Error uploading image:', error)
    }
  }

  async function deleteImage(imageName) {
    const { error } = await supabase.storage
      .from('images')
      .remove(['scio/' + selectedEntryId + '/ip/' + imageName])

    if (error) {
      alert(error)
    } else {
      getImages()
    }
  }

  const handleImageClick = () => {
    if (selectedFile) {
      window.open(URL.createObjectURL(selectedFile))
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Container>
        <Section>
          <Title>Action Plan Statement:</Title>
          <p>
            Present a summary of the action plan with scope, schedule, cost and
            resources.
          </p>
          <Title>Action Plan Tracking Chart</Title>
          <p>
            Use the Choose File button below to upload an image to your gallery
          </p>
          <input
            type='file'
            accept='.png, .jpg, .jpeg, '
            onChange={(e) => uploadImage(e)}
          />
          <hr />
          <h3>Your Images</h3>
          <Grid container spacing={2}>
            {images.map((image) => (
              <Grid
                item
                key={CDNURL + selectedEntryId + '/' + 'ip' + '/' + image.name}
              >
                <Card>
                  <CardMedia
                    component='img'
                    height='150'
                    image={
                      CDNURL + selectedEntryId + '/' + 'ip' + '/' + image.name
                    }
                  />
                  <CardContent>
                    <Button
                      size='small'
                      variant='contained'
                      color='error'
                      onClick={() => deleteImage(image.name)}
                    >
                      Delete Image
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Title>Secondary Action Plan Content</Title>
          <p>Action Plan Risks Table</p>
          <TextArea
            placeholder=''
            name='IPS2'
            required={false}
            onChange={handleChange}
            value={implementationblock.IPQ2 || ''}
          />
          <p>
            Use the Choose File button below to upload an image to your gallery
          </p>
          <input
            type='file'
            accept='.png, .jpg, .jpeg, '
            onChange={(e) => uploadImage(e)}
          />
          <hr />
          <h3>Your Images</h3>
          <Grid container spacing={2}>
            {images.map((image) => (
              <Grid
                item
                key={CDNURL + selectedEntryId + '/' + 'ip' + '/' + image.name}
              >
                <Card>
                  <CardMedia
                    component='img'
                    height='150'
                    image={
                      CDNURL + selectedEntryId + '/' + 'ip' + '/' + image.name
                    }
                  />
                  <CardContent>
                    <Button
                      size='small'
                      variant='contained'
                      color='error'
                      onClick={() => deleteImage(image.name)}
                    >
                      Delete Image
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Section>
        <Section>
          <Title>Plan Activities:</Title>
          <p>What set of activities make up the action plan?</p>
          <TextArea
            placeholder=''
            name='IPQ1'
            required={false}
            onChange={handleChange}
            value={implementationblock.IPQ1 || ''}
          />
          <Title>Planning Quality:</Title>
          <p>
            What additional planning must be done to make an executable action
            plan? What is the estimation accuracy target? Choices are 1) Order
            of Magnitude +/-100%, Conceptual +/-50%, Budgetary +/-35%, Detailed
            +/-15%, Control +/-5%.
          </p>
          <TextArea
            placeholder=''
            name='IPQ2'
            required={false}
            onChange={handleChange}
            value={implementationblock.IPQ2 || ''}
          />
          <Title>Plan Scope:</Title>
          <p>
            What is in the action plan scope? Notify the decision-maker if the
            execution scope to the action plan changes significantly, add to
            plan risks.
          </p>
          <TextArea
            placeholder=''
            name='IPQ3'
            required={false}
            onChange={handleChange}
            value={implementationblock.IPQ3 || ''}
          />
          <Title>Plan Schedule:</Title>
          <p>
            What is the action plan schedule? What are the major milestones?
            Notify the decision-maker if plan timelines are insufficient to
            execute the action plan, add to plan risks.
          </p>
          <TextArea
            placeholder=''
            name='IPQ4'
            required={false}
            onChange={handleChange}
            value={implementationblock.IPQ4 || ''}
          />
          <Title>Plan Cost:</Title>
          <p>
            What is the action plan cost? Include total cost, CapEx and/or OpEx.
            Include all resources: labour and materials, internal and contract
            labour, in directs and overheads, tools and technologies. Notify
            decision-maker if actual costs exceed planned costs, add to plan
            risks.
          </p>
          <TextArea
            placeholder=''
            name='IPQ5'
            required={false}
            onChange={handleChange}
            value={implementationblock.IPQ5 || ''}
          />
          <Title>Plan Resources:</Title>
          <p>
            What people and financial resources are required to execute the
            action plan? Who is on the implementation team? Where is the funding
            coming from? Notify the decision-maker if resources are insufficient
            to execute the action plan, add to plan risks.
          </p>
          <TextArea
            placeholder=''
            name='IPQ6'
            required={false}
            onChange={handleChange}
            value={implementationblock.IPQ6 || ''}
          />
          <Title>Plan Tracking:</Title>
          <p>
            Where is the implementation progress to date? Update periodically
            from the project plans to communicate to the PSDM Team.
          </p>
          <TextArea
            placeholder=''
            name='IPQ7'
            required={false}
            onChange={handleChange}
            value={implementationblock.IPQ7 || ''}
          />

          <Title>Plan Contingencies:</Title>
          <p>
            What contingency plans are available or in place to adjust or modify
            the original action plan should implementation exceed certain
            guardrail thresholds?
          </p>
          <TextArea
            placeholder=''
            name='IPQ8'
            required={false}
            onChange={handleChange}
            value={implementationblock.IPQ8 || ''}
          />
          <Title>Plan Readiness:</Title>
          <p>
            Does the implementation plan include changes to be managed affecting
            people, policies, processes, procedures, technology and assets to
            ensure success and sustainment? What are they? Has the change been
            communicated to all affected stakeholders? Do they accept and can
            they manage the change before, during and after implementation?
          </p>
          <TextArea
            placeholder=''
            name='IPQ9'
            required={false}
            onChange={handleChange}
            value={implementationblock.IPQ9 || ''}
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
