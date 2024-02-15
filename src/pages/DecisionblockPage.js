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

const CDNURL = "https://vrkrxuzxtdbtcwyhcaiq.supabase.co/storage/v1/object/public/images/scio/decision/";



const DecisionBlockPage = ({ generatedId, providedId, setNextPage }) => {
  const customSnackbarRef = useRef(null)
  const [decisionblocks, setDecisionblocks] = useState([])
  const [decisionblock, setDecisionblock] = useState({})

  const handleNextClick = () => {
    setNextPage()
  }

  useEffect(() => {
    fetchDecisionblocks()
  }, [])

  async function fetchDecisionblocks() {
    const { data } = await supabase
      .from('Decisioncontent_duplicate')
      .select('*')
    setDecisionblocks(data)
  }

  function handleChange(event) {
    setDecisionblock((prevFormData) => {
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
        ...decisionblock,
        id: generatedId,
        ID: providedId,
      }

      const { data, error } = await supabase
        .from('Decisioncontent_duplicate')
        .insert([dataToSubmit])
      if (error) {
        throw error
      }
      fetchDecisionblocks()
      customSnackbarRef.current.showSnackbar(
        'You have successfully saved this Decision form',
        'success',
      )
    } catch (error) {
      customSnackbarRef.current.showSnackbar(error.message, 'error')
      console.error('Error saving Decision form:', error.message)
    }
  }

 /* Upload Image*/
  
  const [images, setImages] = useState([]);
  
  const [selectedFile, setSelectedFile] = useState(null);

  async function getImages() {
    const { data, error } = await supabase
    
      .storage
      .from('images')
      .list( 'scio/decision/', {
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
    .from('images/scio/decision/')
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
    .remove([ 'scio/decision/' + imageName])
  
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
          <Title>Decision Statement</Title>
          <p>Present a summary of  the final decision, the factors that influenced this choice, and why this  alternative was chosen over others rejected.</p>
          <TextArea
            placeholder=''
            name='DS1'
            required={false}
            onChange={handleChange}
          />

          <Title>Secondary  The Decision Content:</Title>
          <Title>Strategy & Values Alignment Table</Title>
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
          <Title>Effort vs Success Table (optional)</Title>
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
          <Title>WYSIATI:</Title>
          <p>What you see is all  there is. Is there any relevant considerations outside the presented  problem-solving set that needs to be part of the decision? Did the team miss  or misrepresent something important? Is more work is required in the  problem-solution set?Valid reasons  include: improper framing, lack of creative alternatives, irrelevant or  unreliable information and knowledge sources, improper tradeoff  evaluation, unsuitable modeling, logic  or reasoning errors. Goal-seeking bias for a preferred recommendation is not  a valid reason.</p>
          <TextArea
            placeholder=''
            name='DQ1'
            required={false}
            onChange={handleChange}
          />
          <Title>Collaboration:</Title>
          <p>Has there been  effective dialogue between problem-solvers, those providing input and  consulted, stakeholders, and the decision-maker? Has everyone weighed in or  agreed who should? Has the best available information and knowledge been  evaluated with sufficient confidence to proceed?</p>
          <TextArea
            placeholder=''
            name='DQ2'
            required={false}
            onChange={handleChange}
          />
          <Title>Yeah… But:</Title>
          <p>Is there a  "Yeah, but…" reaction? If yes, misaligned motivation can adversely  affect decision-making. Can the conflict cause be identified and resolved  instead of avoiding the decision? What's best for the organization and its  stated goals, strategies, objectives and values?</p>
          <TextArea
            placeholder=''
            name='DQ3'
            required={false}
            onChange={handleChange}
          />
         <title>Sound Reasoning:</title>
          <TextArea
            placeholder=''
            name='DQ4'
            required={false}
            onChange={handleChange}
          />
          <Title>Have we guarded against all relevant biases?</Title>
          <TextArea
            placeholder=''
            name='DQ5'
            required={false}
            onChange={handleChange}
          />
          <Title>Have we guarded against all relevant biases?</Title>
          <TextArea
            placeholder=''
            name='DQ6'
            required={false}
            onChange={handleChange}
          />

          <Title>Have we guarded against all relevant biases?</Title>
          <TextArea
            placeholder=''
            name='DQ7'
            required={false}
            onChange={handleChange}
          />

          <Title>Have we guarded against all relevant biases?</Title>
          <TextArea
            placeholder=''
            name='DQ8'
            required={false}
            onChange={handleChange}
          />

          <Title>Have we guarded against all relevant biases?</Title>
          <TextArea
            placeholder=''
            name='DQ9'
            required={false}
            onChange={handleChange}
          />

          <Title>Have we guarded against all relevant biases?</Title>
          <TextArea
            placeholder=''
            name='DQ10'
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

export default DecisionBlockPage
