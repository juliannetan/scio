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

import { v4 as uuidv4 } from 'uuid';
import {  Button, Grid, Card, CardMedia, CardContent, Box } from '@mui/material';

const CDNURL = "https://vrkrxuzxtdbtcwyhcaiq.supabase.co/storage/v1/object/public/images/scio/future/";


const FutureblockPage = ({ generatedId, providedId, setNextPage }) => {
  const customSnackbarRef = useRef(null)
  const [futureblocks, setFutureblocks] = useState([])
  const [futureblock, setFutureblock] = useState({})

  const handleNextClick = () => {
    setNextPage()
  }

  useEffect(() => {
    fetchFutureblocks()
  }, [])

  async function fetchFutureblocks() {
    const { data } = await supabase.from('Futurecontent_duplicate').select('*')
    setFutureblocks(data)
  }

  function handleChange(event) {
    setFutureblock((prevFormData) => {
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
        ...futureblock,
        id: generatedId,
        ID: providedId,
      }

      const { data, error } = await supabase
        .from('Futurecontent_duplicate')
        .insert([dataToSubmit])
      if (error) {
        throw error
      }
      fetchFutureblocks()
      customSnackbarRef.current.showSnackbar(
        'You have successfully saved this Future State form',
        'success',
      )
    } catch (error) {
      customSnackbarRef.current.showSnackbar(error, 'error')
      console.error('Error saving Future State form:', error.message)
    }
  }

 /* Upload Image*/
  const [images, setImages] = useState([]);  
  const [selectedFile, setSelectedFile] = useState(null);

  async function getImages() {
    const { data, error } = await supabase
    
      .storage
      .from('images')
      .list( 'scio/future/', {
        limit: 100,
        offset: 0,
        sortBy: { column: "name", order: "asc"}
      });   

      if(data !== null) {
        setImages(data);
      } else {
        alert("Error loading images");
        console.log(error);
      }
  }

  useEffect(() => {
    getImages();    
}, [])


async function uploadImage(e) {

  let file = e.target.files[0];  

  const { data, error } = await supabase
    .storage
    .from('images/scio/future/')
    .upload('/' + uuidv4(), file )
     
    if(data) {
      console.log('Image uploaded successfully')
    getImages();
  } else {
    console.log('Error uploading image:', error)
  }
}


async function deleteImage(imageName) {
  const { error } = await supabase
    .storage
    .from('images')
    .remove([ 'scio/future/' + imageName])
  
  if(error) {
    alert(error);
  } else {
    getImages();
  }
}

const handleImageClick = () => {
  if (selectedFile)
  {
    window.open(URL.createObjectURL(selectedFile)); 
};
}





  return (
    <form onSubmit={handleSubmit}>
      <Container>
        <Section>
          <Title>Future State Gap Statement with bullets</Title>
          <TextArea
            placeholder=''
            name='FS1'
            required={false}
            onChange={handleChange}
          />
          <Title>Future State Chart/Graphic</Title>
          <p>Use the Choose File button below to upload an image to your gallery</p>
          <input type="file" accept=".png, .jpg, .jpeg, " onChange={(e) => uploadImage(e)} />
          <hr />
          <h3>Your Images</h3>
          <Grid container spacing={2}>
            {images.map((image) => (
              <Grid item key={CDNURL + "/" + image.name}>
                <Card>
                  <CardMedia  
                    component="img"
                    height="150"                
                    image={CDNURL + "/" + image.name}
                  />
                  <CardContent>   
                   
                   <Button size="small" variant="contained" color="error" onClick={() => deleteImage(image.name)}>Delete Image</Button> 
                   
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>  
          <Title>Secondary Content</Title>
          <TextArea
            placeholder=''
            name='FS2'
            required={false}
            onChange={handleChange}
          />
        </Section>
        <Section>
          <Title>
            What are the expected targets from current business goals &
            objectives?
          </Title>
          <TextArea
            placeholder=''
            name='FQ1'
            required={false}
            onChange={handleChange}
          />
          <Title>What is the gap between current and future state?</Title>
          <TextArea
            placeholder=''
            name='FQ2'
            required={false}
            onChange={handleChange}
          />
          <Title>
            Can the real or perceived constraints in this situation be
            challenged?
          </Title>
          <TextArea
            placeholder=''
            name='FQ3'
            required={false}
            onChange={handleChange}
          />
          <Title>What are the conditions of satisfaction for success?</Title>
          <TextArea
            placeholder=''
            name='FQ4'
            required={false}
            onChange={handleChange}
          />
          <Title>How much of the gap is controllable?</Title>
          <TextArea
            placeholder=''
            name='FQ5'
            required={false}
            onChange={handleChange}
          />
          <Title>
            What is our tolerance for failure or an undesired outcome?
          </Title>
          <TextArea
            placeholder=''
            name='FQ6'
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

export default FutureblockPage
