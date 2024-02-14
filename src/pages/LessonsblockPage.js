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
import {  Button, Grid, Card, CardMedia, CardContent } from '@mui/material';

const CDNURL = "https://vrkrxuzxtdbtcwyhcaiq.supabase.co/storage/v1/object/public/images/scio/lessons/";




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

  const [images, setImages] = useState([]);  
  const [selectedFile, setSelectedFile] = useState(null);

  async function getImages() {
    const { data, error } = await supabase
    
      .storage
      .from('images')
      .list( 'scio/lessons/', {
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
    .from('images/scio/lessons/')
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
    .remove([ 'scio/lessons/' + imageName])
  
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
          <Title>Shared Learnings Text Bullets</Title>
          <TextArea
            placeholder=''
            name='LLS1'
            required={false}
            onChange={handleChange}
          />
          <Title>Decision Quality Sliders Scale Graphic</Title>
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
        
        </Section>
        <Section>
          <Title>
            Overall Decision/Result: Good/Good, Good/Bad, Bad/Good, Bad/Bad?
            Show 2x2 graphic.
          </Title>
          <TextArea
            placeholder=''
            name='LLQ1'
            required={false}
            onChange={handleChange}
          />
          <Title>Additional sustainment activities required?</Title>
          <TextArea
            placeholder=''
            name='LLQ2'
            required={false}
            onChange={handleChange}
          />
          <Title>
            Audit. Problem-solvers follow process? Decision-makers follow
            process? Minimize biases? Avoid DQ traps?
          </Title>
          <TextArea
            placeholder=''
            name='LLQ3'
            required={false}
            onChange={handleChange}
          />
          <Title>Lessons learned? Lessons shared?</Title>
          <TextArea
            placeholder=''
            name='LLQ4'
            required={false}
            onChange={handleChange}
          />
          <Title>
            Future opportunities for continuous improvement? Innovation?
          </Title>
          <TextArea
            placeholder=''
            name='LLQ5'
            required={false}
            onChange={handleChange}
          />
          <Title>Provide a Decision Quality Sliders graphic</Title>
          <TextArea
            placeholder=''
            name='LLQ6'
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
