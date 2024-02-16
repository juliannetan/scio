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

const CDNURL =
  'https://vrkrxuzxtdbtcwyhcaiq.supabase.co/storage/v1/object/public/images/scio/'

const LessonsblockDisplay = ({ selectedEntryId, selectedId, onClose }) => {
  const customSnackbarRef = useRef(null)
  const [lessonsblock, setLessonsblock] = useState({})

  useEffect(() => {
    fetchLessonsblock()
  }, [])

  async function fetchLessonsblock() {
    try {
      const { data, error } = await supabase
        .from('Lessonscontent_duplicate')
        .select('*')
        .eq('ID', selectedEntryId)
        .single()

      if (error) {
        throw error
      }

      if (data) {
        setLessonsblock(data)
      } else {
        setLessonsblock({})
      }
    } catch (error) {
      console.error('Error fetching Lessons block:', error.message)
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setLessonsblock((prevLessonsblock) => ({
      ...prevLessonsblock,
      [name]: value,
    }))
  }

  const dataToSubmit = {
    ...lessonsblock,
    id: selectedId,
    ID: selectedEntryId,
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      let { data, error } = {}
      const existingEntry = await supabase
        .from('Lessonscontent_duplicate')
        .select('*')
        .eq('ID', lessonsblock.ID)
        .single()

      if (!existingEntry.data) {
        // Insert a new entry if it doesn't exist
        ;({ data, error } = await supabase
          .from('Lessonscontent_duplicate')
          .insert([dataToSubmit]))
      } else {
        // Update existing entry
        ;({ data, error } = await supabase
          .from('Lessonscontent_duplicate')
          .update(lessonsblock)
          .eq('ID', lessonsblock.ID))
      }

      if (error) {
        throw error
      }

      fetchLessonsblock()
      customSnackbarRef.current.showSnackbar(
        'Successfully saved Lessons form.',
        'success',
      )
    } catch (error) {
      customSnackbarRef.current.showSnackbar(`Error: ${error.message}`, 'error')
      console.error('Error saving Lessons form:', error.message)
    }
  }

  /* Upload Image*/

  const [images, setImages] = useState([])
  const [selectedFile, setSelectedFile] = useState(null)

  async function getImages() {
    const { data, error } = await supabase.storage
      .from('images')
      .list('scio/' + selectedEntryId + '/lessons', {
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
      .from('images/scio/' + selectedEntryId + '/lessons')
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
      .remove(['scio/' + selectedEntryId + '/lessons/' + imageName])

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
      <Container onSubmit={handleSubmit}>
        <Section>
          <Title>Shared Learnings Statement:</Title>
          <p>
            Present a summary of the lessons learned and shared from this
            problem-solution decision-making set.
          </p>
          <TextArea
            placeholder=''
            name='LLS1'
            onChange={handleChange}
            value={lessonsblock.LLS1}
          />
          <Title>Decision Quality Sliders Scale Graphic</Title>
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
                key={
                  CDNURL + selectedEntryId + '/' + 'lessons' + '/' + image.name
                }
              >
                <Card>
                  <CardMedia
                    component='img'
                    height='150'
                    image={
                      CDNURL +
                      selectedEntryId +
                      '/' +
                      'lessons' +
                      '/' +
                      image.name
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

          <Title>Secondary Shared Learnings Content:</Title>
          <TextArea
            placeholder=''
            name='LLS2'
            onChange={handleChange}
            value={lessonsblock.LLS2}
          />
        </Section>
        <Section>
          <Title>Decision Appraisal:</Title>
          <p>
            Was it a quality decision, good or bad? What was the outcome, good
            or bad?
          </p>
          <TextArea
            placeholder=''
            name='LLQ1'
            onChange={handleChange}
            value={lessonsblock.LLQ1}
          />
          <Title>Appropriate Frame:</Title>
          <p>
            Was an appropriate problem frame well suited to the situation (not
            too narrow, not too broad)? Score 0-100%?
          </p>
          <TextArea
            placeholder=''
            name='LLQ2'
            onChange={handleChange}
            value={lessonsblock.LLQ2}
          />
          <Title>Creative Alternatives:</Title>
          <p>
            Were a rich set of alternatives created each with distinct actions,
            costs and benefits? A decision can't be better than the best
            alternative. Score 0-100%?
          </p>
          <TextArea
            placeholder=''
            name='LLQ3'
            onChange={handleChange}
            value={lessonsblock.LLQ3}
          />
          <Title>Relevant Knowledge:</Title>
          <p>
            Was relevant and reliable information and the best available
            knowledge applied from trusted sources? Were the significant inputs
            and assumptions tested? Was it worth getting more info/knowledge to
            reduce uncertainty around the decision? Score 0-100%?
          </p>
          <TextArea
            placeholder=''
            name='LLQ4'
            onChange={handleChange}
            value={lessonsblock.LLQ4}
          />

          <Title>Values & Tradeoffs:</Title>
          <p>
            Did the evaluation of the solution alternatives properly weigh
            tradeoffs consistent with the organization's strategies &
            objectives, and values? Score 0-100%?
          </p>
          <TextArea
            placeholder=''
            name='LLQ5'
            onChange={handleChange}
            value={lessonsblock.LLQ5}
          />
          <Title>Sound Reasoning:</Title>
          <p>
            Did the evaluation apply sound reasoning with a suitable solution
            model? Were the relative uncertainties between alternatives
            assessed? Were attempts made to minimize biases and blind spots?
            Score 0-100%?
          </p>
          <TextArea
            placeholder=''
            name='LLQ6'
            onChange={handleChange}
            value={lessonsblock.LLQ6}
          />

          <Title>Commitment to Action:</Title>
          <p>
            Did the alternative with the best value proposition become clear?
            Was the decision to action clear and concise? Did the organization
            secure resources, show active leadership and see it through? Were
            any guardrails exceeded and contingency plans implemented? Score
            0-100%?
          </p>
          <TextArea
            placeholder=''
            name='LLQ7'
            onChange={handleChange}
            value={lessonsblock.LLQ7}
          />

          <Title>Improvement, Innovation:</Title>
          <p>
            What opportunities for continuous improvement or innovation can be
            made in future problem-solving & decision-making? List them.
          </p>
          <TextArea
            placeholder=''
            name='LLQ8'
            onChange={handleChange}
            value={lessonsblock.LLQ8}
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

export default LessonsblockDisplay
