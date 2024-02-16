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

const CDNURL = "https://vrkrxuzxtdbtcwyhcaiq.supabase.co/storage/v1/object/public/images/scio/";



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
    .list( 'scio/'+ selectedEntryId + '/future', {
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
  .from('images/scio/'+ selectedEntryId + '/future')
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
  .remove(['scio/'+ selectedEntryId + '/future/' + imageName])

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
        <Title>Future State:</Title>
        <p>Present.....</p>
        <TextArea
          placeholder=''
          name='FS1'
          required={false}
          onChange={handleChange}
          defaultValue={futureblock.FS1}
        />
          <p>Use the Choose File button below to upload an image to your gallery</p>
          <input type="file" accept=".png, .jpg, .jpeg, " onChange={(e) => uploadImage(e)} />
          <hr />
          <h3>Your Images</h3>
          <Grid container spacing={2}>
            {images.map((image) => (
              <Grid item key={CDNURL + selectedEntryId + "/" +  'future'+ "/" + image.name}>
                <Card>
                  <CardMedia  
                    component="img"
                    height="150"                
                    image={CDNURL + selectedEntryId + "/" +  'future'+ "/" + image.name}
                  />
                  <CardContent>   
                   
                   <Button size="small" variant="contained" color="error" onClick={() => deleteImage(image.name)}>Delete Image</Button> 
                   
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>  
          <Title>Secondary Future State Content:</Title>
          <p>Optional content not shown on A3 Canvas</p>
          <div />
         
          <TextArea
            placeholder=''
            name='FS2'
            required={false}
            onChange={handleChange}
            defaultValue={futureblock.FS2}
          />
        </Section>
        <Section>
        <Title>Future Targets:</Title>
        <p>What are the expected  targets from current business goals and objectives?</p>
          <TextArea
            placeholder=''
            name='FQ1'
            required={false}
            onChange={handleChange}
            defaultValue={futureblock.FQ1}
          />
          <Title>Future Gap:</Title>
          <p>What is the variance  between current state and expected future state?</p>
          <TextArea
            placeholder=''
            name='FQ2'
            required={false}
            onChange={handleChange}
            defaultValue={futureblock.FQ2}
          />
          <Title> Future  Controllable: </Title>
          <p>How much of the gap  is controllable? Can some or all of the gap be closed? Is there opportunity  to exceed expectations?</p>
          <TextArea
            placeholder=''
            name='FQ3'
            required={false}
            onChange={handleChange}
            defaultValue={futureblock.FQ3}
          />
          <Title>Future  Success:</Title>
          <p>What are the  conditions of satisfaction or optimization that ensure success?</p>
          <TextArea
            placeholder=''
            name='FQ4'
            required={false}
            onChange={handleChange}
            defaultValue={futureblock.FQ4}
          />
          <Title>Future  Tolerance:</Title>
          <p>What is our tolerance  for failure from an undesired outcome? Is it acceptable if satisfactions for  conditions for success are not fully met? Is there a minimum requirement that  must be met to move forward with a solution?</p>
          <TextArea
            placeholder=''
            name='FQ5'
            required={false}
            onChange={handleChange}
            defaultValue={futureblock.FQ5}
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
