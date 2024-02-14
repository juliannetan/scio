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

const CDNURL = "https://vrkrxuzxtdbtcwyhcaiq.supabase.co/storage/v1/object/public/images/scio/ip/";



const ImplementationblockDisplay = ({
  selectedEntryId,
  selectedId,
  onClose,
}) => {
  const [implementationblock, setImplementationblock] = useState({})
  const customSnackbarRef = useRef(null)

  useEffect(() => {
    fetchImplementationblock()
  }, [])

  async function fetchImplementationblock() {
    try {
      const { data, error } = await supabase
        .from('Implementationcontent_duplicate')
        .select('*')
        .eq('ID', selectedEntryId)
        .single()

      if (error) {
        throw error
      }

      if (data) {
        setImplementationblock(data)
      } else {
        setImplementationblock({})
      }
    } catch (error) {
      console.error('Error fetching Implementation block:', error.message)
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setImplementationblock((prevImplementationblock) => ({
      ...prevImplementationblock,
      [name]: value,
    }))
  }

  const dataToSubmit = {
    ...implementationblock,
    id: selectedId,
    ID: selectedEntryId,
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      let { data, error } = {}
      // Check if implementation block ID exists
      const existingEntry = await supabase
        .from('Implementationcontent_duplicate')
        .select('*')
        .eq('ID', implementationblock.ID)
        .single()

      if (!existingEntry.data) {
        // Insert a new entry if it doesn't exist
        ;({ data, error } = await supabase
          .from('Implementationcontent_duplicate')
          .insert([dataToSubmit]))
      } else {
        // Update existing entry
        ;({ data, error } = await supabase
          .from('Implementationcontent_duplicate')
          .update(implementationblock)
          .eq('ID', implementationblock.ID))
      }

      if (error) {
        throw error
      }

      fetchImplementationblock()
      customSnackbarRef.current.showSnackbar(
        'Successfully saved Implementation form.',
        'success',
      )
    } catch (error) {
      customSnackbarRef.current.showSnackbar(`Error: ${error.message}`, 'error')
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
            value={implementationblock.IPQ2 || ''}
          />
        </Section>
        <Section>
          <Title>Set of activities assigned to the selected solution?</Title>
          <TextArea
            placeholder=''
            name='IPQ3'
            required={false}
            onChange={handleChange}
            value={implementationblock.IPQ3 || ''}
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
            value={implementationblock.IPQ4 || ''}
          />
          <Title>Do. Commit to execution. Track implementation?</Title>
          <TextArea
            placeholder=''
            name='IPQ5'
            required={false}
            onChange={handleChange}
            value={implementationblock.IPQ5 || ''}
          />
          <Title>
            Check. Monitor on track within preset guardrails and safeguards?
          </Title>
          <TextArea
            placeholder=''
            name='IPQ6'
            required={false}
            onChange={handleChange}
            value={implementationblock.IPQ6 || ''}
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
            value={implementationblock.IPQ7 || ''}
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

export default ImplementationblockDisplay
