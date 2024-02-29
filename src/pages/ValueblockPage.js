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
import { Button, Grid, Card, CardMedia, CardContent, Box } from '@mui/material'

const CDNURL = process.env.REACT_APP_CDN_URL

const ValueblockPage = ({ generatedId, providedId, setNextPage }) => {
  const customSnackbarRef = useRef(null)
  const [valueblocks, setValueblocks] = useState([])
  const [valueblock, setValueblock] = useState({})

  const handleNextClick = () => {
    setNextPage()
  }

  useEffect(() => {
    fetchValueblocks()
  }, [])

  async function fetchValueblocks() {
    const { data } = await supabase.from('Valuecontent_duplicate').select('*')
    setValueblocks(data)
  }

  function handleChange(event) {
    setValueblock((prevFormData) => {
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
        ...valueblock,
        id: generatedId,
        ID: providedId,
      }

      const { data, error } = await supabase
        .from('Valuecontent_duplicate')
        .insert([dataToSubmit])
      if (error) {
        throw error
      }
      fetchValueblocks()
      customSnackbarRef.current.showSnackbar(
        'You have successfully saved this Value Delivery form',
        'success',
      )
    } catch (error) {
      customSnackbarRef.current.showSnackbar(error.message, 'error')
      console.error('Error saving Value Delivery form:', error.message)
    }
  }

 /* Upload Image1*/

const [images1, setImages1] = useState([])

async function getImages1() {
  const { data, error } = await supabase.storage
    .from('images')
    .list('scio/' + providedId + '/value' + '/file1' , {
      limit: 100,
      offset: 0,
      sortBy: { column: 'name', order: 'asc' },
    })

  if (data !== null) {
    setImages1(data)
  } else {
    alert('Error loading images')
    console.log(error)
  }
}

useEffect(() => {
  getImages1()
}, [])

async function uploadImage1(e) {
  let file = e.target.files[0]

  const { data, error } = await supabase.storage
    .from('images/scio/' + providedId + '/value' + '/file1'  )
    .upload('/' + uuidv4(), file)

  if (data) {
    console.log('Image uploaded successfully')
    getImages1()
  } else {
    console.log('Error uploading image:', error)
  }
}

async function deleteImage1(imageName) {
  const { error } = await supabase.storage
    .from('images')
    .remove(['scio/' + providedId + '/value' + '/file1' + '/'  + imageName])

  if (error) {
    alert(error)
  } else {
    getImages1()
  }
}


 /* Upload Image2*/

 const [images2, setImages2] = useState([])
 const [selectedFile, setSelectedFile] = useState(null)

 async function getImages2() {
   const { data, error } = await supabase.storage
     .from('images')
     .list('scio/' + providedId + '/value' + '/file2' , {
       limit: 100,
       offset: 0,
       sortBy: { column: 'name', order: 'asc' },
     })

   if (data !== null) {
     setImages2(data)
   } else {
     alert('Error loading images')
     console.log(error)
   }
 }

 useEffect(() => {
   getImages2()
 }, [])

 async function uploadImage2(e) {
   let file = e.target.files[0]

   const { data, error } = await supabase.storage
     .from('images/scio/' + providedId + '/value'  + '/file2' )
     .upload('/' + uuidv4(), file)

   if (data) {
     console.log('Image uploaded successfully')
     getImages2()
   } else {
     console.log('Error uploading image:', error)
   }
 }

 async function deleteImage2(imageName) {
   const { error } = await supabase.storage
     .from('images')
     .remove(['scio/' + providedId + '/value' + '/file2' + '/' +   imageName])

   if (error) {
     alert(error)
   } else {
     getImages2()
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
          <Title>Value Delivery Statement:</Title>
          <p>
            Present a summary of the performance change and value delivery as
            expected from the action plan.
          </p>
          <Title>Performance Metrics Graphic</Title>
          <p>
            Use the Choose File button below to upload an image to your gallery
          </p>
          <input
            type='file'
            accept='.png, .jpg, .jpeg, '
            onChange={(e) => uploadImage1(e)}
          />
          <hr />
          <h3>Your Images</h3>
          <Grid container spacing={2}>
            {images1.map((image) => (
              <Grid
                item
                key={CDNURL + providedId + '/value' + '/file1' + '/'   + image.name}
              >
                <Card>
                  <CardMedia
                    component='img'
                    height='150'
                    image={
                      CDNURL + providedId + '/value' + '/file1' + '/'  + image.name
                    }
                  />
                  <CardContent>
                    <Button
                      size='small'
                      variant='contained'
                      color='error'
                      onClick={() => deleteImage1(image.name)}
                    >
                      Delete Image
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Title>Value Realization Chart</Title>
          <p>
            Use the Choose File button below to upload an image to your gallery
          </p>
          <input
            type='file'
            accept='.png, .jpg, .jpeg, '
            onChange={(e) => uploadImage2(e)}
          />
          <hr />
          <h3>Your Images</h3>
          <Grid container spacing={2}>
            {images2.map((image) => (
              <Grid
                item
                key={CDNURL + providedId + '/value' + '/file2' + '/'  + image.name}
              >
                <Card>
                  <CardMedia
                    component='img'
                    height='150'
                    image={
                      CDNURL + providedId + '/value' + '/file2' + '/'  + image.name
                    }
                  />
                  <CardContent>
                    <Button
                      size='small'
                      variant='contained'
                      color='error'
                      onClick={() => deleteImage2(image.name)}
                    >
                      Delete Image
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Title>Secondary Value Delivery</Title>
          <TextArea
            placeholder=''
            name='VDMedia3'
            required={false}
            onChange={handleChange}
          />
        </Section>
        <Section>
          <Title>Performance Metrics:</Title>
          <p>
            What operational metrics are affected by the action plan? How much
            are these metrics being affected against success criteria?
          </p>
          <TextArea
            placeholder=''
            name='VDQ1'
            required={false}
            onChange={handleChange}
          />
          <Title>Value Drivers:</Title>
          <p>
            What are the Value Drivers at play? How are we measuring value
            delivery against these drivers?
          </p>
          <TextArea
            placeholder=''
            name='VDQ2'
            required={false}
            onChange={handleChange}
          />
          <Title>Value Timeline:</Title>
          <p>
            Is the value being delivered within the expected time frame
            according to success criteria?
          </p>
          <TextArea
            placeholder=''
            name='VDQ3'
            required={false}
            onChange={handleChange}
          />
          <Title>Value Realization:</Title>
          <p>
            How are we monitoring and reporting on value realization against
            success criteria?
          </p>
          <TextArea
            placeholder=''
            name='VDQ4'
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

export default ValueblockPage
