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

const CurrentblockDisplay = ({ selectedEntryId, selectedId, onClose }) => {
  const [currentblock, setCurrentblock] = useState({})
  const customSnackbarRef = useRef(null)

  useEffect(() => {
    fetchCurrentblock()
  }, [])

  async function fetchCurrentblock() {
    try {
      const { data, error } = await supabase
        .from('Currentcontent_duplicate')
        .select('*')
        .eq('ID', selectedEntryId)
        .single()

      if (error) {
        throw error
      }

      if (data) {
        setCurrentblock(data)
      } else {
        setCurrentblock({})
      }
    } catch (error) {
      console.error('Error fetching Current block:', error.message)
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setCurrentblock((prevCurrentblock) => ({
      ...prevCurrentblock,
      [name]: value,
    }))
  }

  const dataToSubmit = {
    ...currentblock,
    id: selectedId,
    ID: selectedEntryId,
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      let { data, error } = {}
      // Check if implementation block ID exists
      const existingEntry = await supabase
        .from('Currentcontent_duplicate')
        .select('*')
        .eq('ID', currentblock.ID)
        .single()

      if (!existingEntry.data) {
        // Insert a new entry if it doesn't exist
        ;({ data, error } = await supabase
          .from('Currentcontent_duplicate')
          .insert([dataToSubmit]))
      } else {
        // Update existing entry
        ;({ data, error } = await supabase
          .from('Currentcontent_duplicate')
          .update(currentblock)
          .eq('ID', currentblock.ID))
      }

      if (error) {
        throw error
      }

      fetchCurrentblock()
      customSnackbarRef.current.showSnackbar(
        'Successfully saved Current form.',
        'success',
      )
    } catch (error) {
      customSnackbarRef.current.showSnackbar(`Error: ${error.message}`, 'error')
      console.error('Error saving Current form:', error.message)
    }
  }

  /* Upload Image*/
  const [images, setImages] = useState([])
  const [selectedFile, setSelectedFile] = useState(null)

  async function getImages() {
    const { data, error } = await supabase.storage
      .from('images')
      .list('scio/' + selectedEntryId + '/current', {
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
      .from('images/scio/' + selectedEntryId + '/current')
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
      .remove(['scio/' + selectedEntryId + '/current/' + imageName])

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
          <Title>Current State:</Title>
          <p>Present....</p>

          <TextArea
            placeholder=''
            name='CS1'
            required={false}
            onChange={handleChange}
            value={currentblock.CS1 || ''}
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
                key={
                  CDNURL + selectedEntryId + '/' + 'current' + '/' + image.name
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
                      'current' +
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
          <Title>Secondary Current State Statement</Title>
          <p>Optional content not shown on A3 Canvas</p>
          <TextArea
            placeholder=''
            name='CS2'
            required={false}
            onChange={handleChange}
            value={currentblock.CS2 || ''}
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
            value={currentblock.CQ1 || ''}
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
            value={currentblock.CQ2 || ''}
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
            value={currentblock.CQ3 || ''}
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
            value={currentblock.CQ4 || ''}
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
            value={currentblock.CQ5 || ''}
          />
        </Section>
        <TitleblockButtons>
          <StyledButton type='submit'>Save</StyledButton>
          <StyledButton onClick={onClose}>Close</StyledButton>
        </TitleblockButtons>
        <CustomSnackbar ref={customSnackbarRef} />
      </Container>
    </form>
  )
}

export default CurrentblockDisplay
