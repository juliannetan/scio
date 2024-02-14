import React, { useState, useEffect } from 'react'
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

const CDNURL = "https://vrkrxuzxtdbtcwyhcaiq.supabase.co/storage/v1/object/public/images/scio/future/";



const FutureblockDisplay = ({ selectedEntryId, selectedId, onClose }) => {
  const [futureblock, setFuturebblock] = useState({})
  const customSnackbarRef = React.useRef(null)

  useEffect(() => {
    fetchFutureblock()
  }, [])

  async function fetchFutureblock() {
    try {
      const { data, error } = await supabase
        .from('Futurecontent_duplicate')
        .select('*')
        .eq('ID', selectedEntryId)
        .single()

      if (error) {
        throw error
      }

      if (data) {
        setFuturebblock(data)
      } else {
        setFuturebblock({})
      }
    } catch (error) {
      console.error('Error fetching Future block:', error.message)
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFuturebblock((prevFutureblock) => ({
      ...prevFutureblock,
      [name]: value,
    }))
  }

  const dataToSubmit = {
    ...futureblock,
    id: selectedId,
    ID: selectedEntryId,
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      let { data, error } = {}
      // Check if implementation block ID exists
      const existingEntry = await supabase
        .from('Futurecontent_duplicate')
        .select('*')
        .eq('ID', futureblock.ID)
        .single()

      if (!existingEntry.data) {
        // Insert a new entry if it doesn't exist
        ;({ data, error } = await supabase
          .from('Futurecontent_duplicate')
          .insert([dataToSubmit]))
      } else {
        // Update existing entry
        ;({ data, error } = await supabase
          .from('Futurecontent_duplicate')
          .update(futureblock)
          .eq('ID', futureblock.ID))
      }

      if (error) {
        throw error
      }

      fetchFutureblock()
      customSnackbarRef.current.showSnackbar(
        'Successfully saved Future form.',
        'success',
      )
    } catch (error) {
      customSnackbarRef.current.showSnackbar(`Error: ${error.message}`, 'error')
      console.error('Error saving Future form:', error.message)
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
          <Title>Future State Chart/Graphic</Title>
          <div />
          <Title>Secondary Content</Title>
          <TextArea
            placeholder=''
            name='FS2'
            required={false}
            onChange={handleChange}
            defaultValue={futureblock.FS2}
          />
        </Section>
        <Section>
          <Title>
            What are the expected targets from Future business goals &
            objectives?
          </Title>
          <TextArea
            placeholder=''
            name='FQ1'
            required={false}
            onChange={handleChange}
            defaultValue={futureblock.FQ1}
          />
          <Title>What is the gap between Future and future state?</Title>
          <TextArea
            placeholder=''
            name='FQ2'
            required={false}
            onChange={handleChange}
            defaultValue={futureblock.FQ2}
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
            defaultValue={futureblock.FQ3}
          />
          <Title>What are the conditions of satisfaction for success?</Title>
          <TextArea
            placeholder=''
            name='FQ4'
            required={false}
            onChange={handleChange}
            defaultValue={futureblock.FQ4}
          />
          <Title>How much of the gap is controllable?</Title>
          <TextArea
            placeholder=''
            name='FQ5'
            required={false}
            onChange={handleChange}
            defaultValue={futureblock.FQ5}
          />
          <Title>
            What is our tolerance for failure or an undesired outcome?
          </Title>
          <TextArea
            placeholder=''
            name='FQ6'
            required={false}
            onChange={handleChange}
            defaultValue={futureblock.FQ6}
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

export default FutureblockDisplay
