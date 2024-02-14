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

const CDNURL = "https://vrkrxuzxtdbtcwyhcaiq.supabase.co/storage/v1/object/public/images/scio/ip/";



const ImplementationblockPage = ({ generatedId, providedId, setNextPage }) => {
  const customSnackbarRef = useRef(null)
  const [implementationblocks, setImplementationblocks] = useState([])
  const [implementationblock, setImplementationblock] = useState({})

  const handleNextClick = () => {
    setNextPage()
  }

  useEffect(() => {
    fetchImplementationblocks()
  }, [])

  async function fetchImplementationblocks() {
    const { data } = await supabase
      .from('Implementationcontent_duplicate')
      .select('*')
    setImplementationblocks(data)
  }

  function handleChange(event) {
    setImplementationblock((prevFormData) => {
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
        ...implementationblock,
        id: generatedId,
        ID: providedId,
      }

      const { data, error } = await supabase
        .from('Implementationcontent_duplicate')
        .insert([dataToSubmit])
      if (error) {
        throw error
      }
      fetchImplementationblocks()
      customSnackbarRef.current.showSnackbar(
        'You have successfully saved this Implementation form',
        'success',
      )
    } catch (error) {
      customSnackbarRef.current.showSnackbar(error.message, 'error')
      console.error('Error saving Implementation form:', error.message)
    }
  }

   /* Upload Image*/

  const [images, setImages] = useState([]);  
  const [selectedFile, setSelectedFile] = useState(null);

  async function getImages() {
    const { data, error } = await supabase
    
      .storage
      .from('images')
      .list( 'scio/ip/', {
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
    .from('images/scio/ip/')
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
    .remove([ 'scio/ip/' + imageName])
  
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
          <Title>Action Plan Milestone Chart</Title>
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
          <Title>Secondary Action Plan Milestone</Title>
          <TextArea
            placeholder=''
            name='IPQ2'
            required={false}
            onChange={handleChange}
          />
        </Section>
        <Section>
          <Title>Set of activities assigned to the selected solution?</Title>
          <TextArea
            placeholder=''
            name='IPQ3'
            required={false}
            onChange={handleChange}
          />
          <Title>
            Plan. Include plan scope, schedule, cost and resources, and MOC/org
            change?
          </Title>
          <TextArea
            placeholder=''
            name='IPQ4'
            required={false}
            onChange={handleChange}
          />
          <Title>Do. Commit to execution. Track implementation?</Title>
          <TextArea
            placeholder=''
            name='IPQ5'
            required={false}
            onChange={handleChange}
          />
          <Title>
            Check. Monitor on track within preset guardrails and safeguards?
          </Title>
          <TextArea
            placeholder=''
            name='IPQ6'
            required={false}
            onChange={handleChange}
          />
          <Title>
            Act. Modify and adjust action plan based with preset contingency
            plans?
          </Title>
          <TextArea
            placeholder=''
            name='IPQ7'
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

export default ImplementationblockPage
