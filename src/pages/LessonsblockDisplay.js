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

import { v4 as uuidv4 } from 'uuid';
import {  Button, Grid, Card, CardMedia, CardContent } from '@mui/material';

const CDNURL = "https://vrkrxuzxtdbtcwyhcaiq.supabase.co/storage/v1/object/public/images/scio/lessons/";



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
      <Container onSubmit={handleSubmit}>
        <Section>
          <Title>Shared Learnings Text Bullets</Title>
          <TextArea
            placeholder=''
            name='LLS1'
            onChange={handleChange}
            value={lessonsblock.LLS1}
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
        
          <Title>Secondary Lessons Learned</Title>
          <TextArea
            placeholder=''
            name='LLS2'
            onChange={handleChange}
            value={lessonsblock.LLS2}
          />
        </Section>
        <Section>
          <Title>Overall Decision/Result</Title>
          <TextArea
            placeholder=''
            name='LLQ1'
            onChange={handleChange}
            value={lessonsblock.LLQ1}
          />
          <Title>Additional sustainment activities required?</Title>
          <TextArea
            placeholder=''
            name='LLQ2'
            onChange={handleChange}
            value={lessonsblock.LLQ2}
          />
          <Title>Audit</Title>
          <TextArea
            placeholder=''
            name='LLQ3'
            onChange={handleChange}
            value={lessonsblock.LLQ3}
          />
          <Title>Lessons learned? Lessons shared?</Title>
          <TextArea
            placeholder=''
            name='LLQ4'
            onChange={handleChange}
            value={lessonsblock.LLQ4}
          />
          <Title>
            Future opportunities for continuous improvement? Innovation?
          </Title>
          <TextArea
            placeholder=''
            name='LLQ5'
            onChange={handleChange}
            value={lessonsblock.LLQ5}
          />
          <Title>Provide a Decision Quality Sliders graphic</Title>
          <TextArea
            placeholder=''
            name='LLQ6'
            onChange={handleChange}
            value={lessonsblock.LLQ6}
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
