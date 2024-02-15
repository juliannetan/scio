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
import {  Button, Grid, Card, CardMedia, CardContent, Box } from '@mui/material';

const CDNURL = "https://vrkrxuzxtdbtcwyhcaiq.supabase.co/storage/v1/object/public/images/scio/value/";


const ValueblockDisplay = ({ selectedEntryId, selectedId, onClose }) => {
  const customSnackbarRef = useRef(null)
  const [valueblock, setValueblock] = useState({})

  useEffect(() => {
    fetchValueblock()
  }, [])

  async function fetchValueblock() {
    try {
      const { data, error } = await supabase
        .from('Valuecontent_duplicate')
        .select('*')
        .eq('ID', selectedEntryId)
        .single()

      if (error) {
        throw error
      }

      if (data) {
        setValueblock(data)
      } else {
        setValueblock({})
      }
    } catch (error) {
      console.error('Error fetching Value block:', error.message)
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setValueblock((prevImplementationblock) => ({
      ...prevImplementationblock,
      [name]: value,
    }))
  }

  const dataToSubmit = {
    ...valueblock,
    id: selectedId,
    ID: selectedEntryId,
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      let { data, error } = {}
      const existingEntry = await supabase
        .from('Valuecontent_duplicate')
        .select('*')
        .eq('ID', valueblock.ID)
        .single()

      if (!existingEntry.data) {
        // Insert a new entry if it doesn't exist
        ;({ data, error } = await supabase
          .from('Valuecontent_duplicate')
          .insert([dataToSubmit]))
      } else {
        // Update existing entry
        ;({ data, error } = await supabase
          .from('Valuecontent_duplicate')
          .update(valueblock)
          .eq('ID', valueblock.ID))
      }

      if (error) {
        throw error
      }

      fetchValueblock()
      customSnackbarRef.current.showSnackbar(
        'Successfully saved Value form.',
        'success',
      )
    } catch (error) {
      customSnackbarRef.current.showSnackbar(`Error: ${error.message}`, 'error')
      console.error('Error saving Value form:', error.message)
    }
  }


/* Upload Image*/

const [images, setImages] = useState([]);  
const [selectedFile, setSelectedFile] = useState(null);

async function getImages() {
  const { data, error } = await supabase
  
    .storage
    .from('images')
    .list( 'scio/value/', {
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
  .from('images/scio/value/')
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
  .remove([ 'scio/value/' + imageName])

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
        <Title>Value  Delivery Statement:</Title>
        <p>Present a summary of  the performance change and value delivery as expected from the action plan.</p>
          <Title>Performance Metrics Graphic</Title>
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
          <Title>Value Realization Chart</Title>
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
          <Title>Secondary Value Delivery</Title>
          <TextArea
            placeholder=''
            name='VDMedia3'
            required={false}
            onChange={handleChange}
            value={valueblock.VDMedia3}
          />
        </Section>
        <Section>
        <Title>Performance Metrics:</Title>
        <p>What operational  metrics are affected by the action plan? How much are these metrics being  affected against success criteria?</p>
          <TextArea
            placeholder=''
            name='VDQ1'
            required={false}
            onChange={handleChange}
            value={valueblock.VDQ1}
          />
          <Title>Value  Drivers:</Title>
          <p>What are the Value  Drivers at play? How are we measuring value delivery against these drivers?</p>
          <TextArea
            placeholder=''
            name='VDQ2'
            required={false}
            onChange={handleChange}
            value={valueblock.VDQ2}
          />
          <Title>Value  Timeline:</Title>
          <p>Is the value being  delivered within the expected time frame according to success criteria?</p>
          <TextArea
            placeholder=''
            name='VDQ3'
            required={false}
            onChange={handleChange}
            value={valueblock.VDQ3}
          />
          <Title>Value Realization:</Title>
          <p>How are we monitoring  and reporting on value realization against success criteria?</p>
          <TextArea
            placeholder=''
            name='VDQ4'
            required={false}
            onChange={handleChange}
            value={valueblock.VDQ4}
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

export default ValueblockDisplay
