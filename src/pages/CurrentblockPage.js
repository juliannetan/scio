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

/*import {useUser, useSupabaseClient} from '@supabase/supabase-auth-helpers';*/
import { v4 as uuidv4 } from 'uuid'
import { Button, Grid, Card, CardMedia, CardContent } from '@mui/material'

const CDNURL =
  'https://vrkrxuzxtdbtcwyhcaiq.supabase.co/storage/v1/object/public/images/scio/'

const CurrentblockPage = ({ generatedId, providedId, setNextPage }) => {
  const customSnackbarRef = useRef(null)
  const [currentblocks, setCurrentblocks] = useState([])
  const [currentblock, setCurrentblock] = useState({})

  const handleNextClick = () => {
    setNextPage()
  }

  useEffect(() => {
    fetchCurrentblocks()
  }, [])

  async function fetchCurrentblocks() {
    const { data } = await supabase.from('Currentcontent_duplicate').select('*')
    setCurrentblocks(data)
  }

  function handleChange(event) {
    setCurrentblock((prevFormData) => {
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
        ...currentblock,
        id: generatedId,
        ID: providedId,
      }

      const { data, error } = await supabase
        .from('Currentcontent_duplicate')
        .insert([dataToSubmit])
      if (error) {
        throw error
      }
      fetchCurrentblocks()
      customSnackbarRef.current.showSnackbar(
        'You have successfully saved this Current State form',
        'success',
      )
    } catch (error) {
      customSnackbarRef.current.showSnackbar(error.message, 'error')
      console.error('Error saving Current State form:', error.message)
    }
  }

  /* Upload Image*/
  const [images, setImages] = useState([])

  async function getImages() {
    const { data, error } = await supabase.storage
      .from('images')
      .list('scio/' + providedId + '/current', {
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
      .from('images/scio/' + providedId + '/current')
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
      .remove(['scio/' + providedId + '/current/' + imageName])

    if (error) {
      alert(error)
    } else {
      getImages()
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Container>
        <Section>
          <Title>Current State:</Title>
          <p>Present....</p>

          <TextArea
            placeholder=''
            name='CS1'
            required={false}
            onChange={handleChange}
          />
          <Title>Current State Chart/Graphic</Title>
          <p>
            Use the Choose File button below to upload an image to your gallery
          </p>
          <input
            type='file'
            accept='.png, .jpg, .jpeg, '
            onChange={(e) => uploadImage(e)}
          />

          <h3>Your Images</h3>
          <Grid container spacing={2}>
            {images.map((image) => (
              <Grid
                item
                key={CDNURL + providedId + '/' + 'current' + '/' + image.name}
              >
                <Card>
                  <CardMedia
                    component='img'
                    height='150'
                    image={
                      CDNURL + providedId + '/' + 'current' + '/' + image.name
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

          <Title>Secondary Current State Statement</Title>
          <p>Optional content not shown on A3 Canvas</p>

          <TextArea
            placeholder=''
            name='CS2'
            required={false}
            onChange={handleChange}
          />
        </Section>

        <Section>
          <Title>Problem Background:</Title>
          <p>What is the problem background? How did we get here?</p>
          <TextArea
            placeholder=''
            name='CQ1'
            required={false}
            onChange={handleChange}
          />
          <Title>Currently Managing:</Title>
          <p>
            How are we currently dealing with the problem now? Why isn't it
            working? What are the barriers to solving this problem already?
          </p>
          <TextArea
            placeholder=''
            name='CQ2'
            required={false}
            onChange={handleChange}
          />
          <Title>Current Context:</Title>
          <p>
            Everything is relative. This is a problem relative to what, exactly?
            What is the baseline view? What is the wide global view? What is the
            external or fresh eyes view? What is the denominator?
          </p>
          <TextArea
            placeholder=''
            name='CQ3'
            required={false}
            onChange={handleChange}
          />
          <Title>Current Causes:</Title>
          <p>
            What are the causes and root causes of the problem? How quickly is
            the problem developing?
          </p>
          <TextArea
            placeholder=''
            name='CQ4'
            required={false}
            onChange={handleChange}
          />
          <Title>Current Confidence:</Title>
          <p>
            What is our confidence or uncertainty in our understanding of the
            problem? How much error might be present? What information and
            knowledge do we possess and is our confidence low, medium or high?
            What information and knowledge we do not possess would be useful? Is
            it worth pursuing?
          </p>
          <TextArea
            placeholder=''
            name='CQ5'
            required={false}
            onChange={handleChange}
          />
        </Section>
        <TitleblockButtons>
          <StyledButton type='submit'>Save</StyledButton>
          <StyledButton type='submit' onClick={handleNextClick}>
            Next
          </StyledButton>
        </TitleblockButtons>
      </Container>
      <CustomSnackbar ref={customSnackbarRef} />
    </form>
  )
}

export default CurrentblockPage
