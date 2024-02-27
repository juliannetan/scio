import React, { useState, useEffect, useRef } from 'react'
import { supabase } from '../components/supabase.js'
import {
  Container,
  Section,
  Title,
  TextArea,
  StyledButton,
  TitleblockButtons,
} from './TitleBlockPage.js'
import CustomSnackbar from '../components/CustomSnackbar.js'

import { v4 as uuidv4 } from 'uuid'
import { Button, Grid, Card, CardMedia, CardContent } from '@mui/material'

const CDNURL = process.env.REACT_APP_CDN_URL

const LessonsblockPage = ({ generatedId, providedId, setNextPage }) => {
  const customSnackbarRef = useRef(null)
  const [lessonsblocks, setLessonsblocks] = useState([])
  const [lessonsblock, setLessonsblock] = useState({})

  const handleNextClick = () => {
    setNextPage()
  }

  useEffect(() => {
    fetchLessonsblocks()
  }, [])

  async function fetchLessonsblocks() {
    const { data } = await supabase.from('Lessonscontent_duplicate').select('*')
    setLessonsblocks(data)
  }

  function handleChange(event) {
    setLessonsblock((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      }
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const dataToSubmit = {
        ...lessonsblock,
        id: generatedId,
        ID: providedId,
      }

      const { data, error } = await supabase
        .from('Lessonscontent_duplicate')
        .insert([dataToSubmit])
      if (error) {
        throw error
      }
      fetchLessonsblocks()
      customSnackbarRef.current.showSnackbar(
        'You have successfully saved this Lessons Learned form',
        'success',
      )
    } catch (error) {
      customSnackbarRef.current.showSnackbar(error.message, 'error')
      console.error('Error saving Lessons Learned form:', error.message)
    }
  }

  /* Upload Image*/

  const [images, setImages] = useState([])
  const [selectedFile, setSelectedFile] = useState(null)

  async function getImages() {
    const { data, error } = await supabase.storage
      .from('images')
      .list('scio/' + providedId + '/lessons', {
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
      .from('images/scio/' + providedId + '/lessons')
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
      .remove(['scio/' + providedId + '/lessons/' + imageName])

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
          <Title>Shared Learnings Statement:</Title>
          <p>
            Present a summary of the lessons learned and shared from this
            problem-solution decision-making set.
          </p>
          <TextArea
            placeholder=''
            name='LLS1'
            required={false}
            onChange={handleChange}
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
                key={CDNURL + providedId + '/' + 'lessons' + '/' + image.name}
              >
                <Card>
                  <CardMedia
                    component='img'
                    height='150'
                    image={
                      CDNURL + providedId + '/' + 'lessons' + '/' + image.name
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
            required={false}
            onChange={handleChange}
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
            required={false}
            onChange={handleChange}
          />
          <Title>Appropriate Frame:</Title>
          <p>
            Was an appropriate problem frame well suited to the situation (not
            too narrow, not too broad)? Score 0-100%?
          </p>
          <TextArea
            placeholder=''
            name='LLQ2'
            required={false}
            onChange={handleChange}
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
            required={false}
            onChange={handleChange}
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
            required={false}
            onChange={handleChange}
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
            required={false}
            onChange={handleChange}
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
            required={false}
            onChange={handleChange}
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
            required={false}
            onChange={handleChange}
          />

          <Title>Improvement, Innovation:</Title>
          <p>
            What opportunities for continuous improvement or innovation can be
            made in future problem-solving & decision-making? List them.
          </p>
          <TextArea
            placeholder=''
            name='LLQ8'
            required={false}
            onChange={handleChange}
          />
        </Section>
        <TitleblockButtons>
          <StyledButton type='submit'>Save</StyledButton>
          <StyledButton type='submit' onClick={handleNextClick}>
            Close
          </StyledButton>
        </TitleblockButtons>
      </Container>
      <CustomSnackbar ref={customSnackbarRef} />
    </form>
  )
}

export default LessonsblockPage
