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
        <Title>Action  Plan Statement:</Title>
        <p>Present a summary of  the action plan with scope, schedule, cost and resources.</p>
          <Title>Action Plan  Tracking Chart</Title>
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
          <Title>Secondary Action Plan Content</Title>
          <p>Action Plan  Risks Table</p>
          <TextArea
            placeholder=''
            name='IPS2'
            required={false}
            onChange={handleChange}
          />
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
        <Title>Plan Activities:</Title>
        <p>What set of  activities make up the action plan?</p>
          <TextArea
            placeholder=''
            name='IPQ1'
            required={false}
            onChange={handleChange}
          />

        <Title>Planning  Quality:</Title>
        <p>What additional  planning must be done to make an executable action plan? What is the  estimation accuracy target? Choices are 1) Order of Magnitude +/-100%,  Conceptual +/-50%, Budgetary +/-35%, Detailed +/-15%, Control +/-5%.</p>
        <TextArea
          placeholder=''
          name='IPQ2'
          required={false}
          onChange={handleChange}
        />

          <Title>Plan Scope:</Title>
          <p>What is in the action  plan scope? Notify the decision-maker if the execution scope to the action plan changes significantly, add  to plan risks.</p>
          <TextArea
            placeholder=''
            name='IPQ3'
            required={false}
            onChange={handleChange}
          />
          <Title>Plan Schedule:</Title>
          <p>What is the action  plan schedule? What are the major milestones? Notify the decision-maker if  plan timelines are insufficient to execute the action plan, add to plan  risks.</p>
          <TextArea
            placeholder=''
            name='IPQ4'
            required={false}
            onChange={handleChange}
          />
          <Title>Plan Cost:</Title>
          <p>What is the action  plan cost? Include total cost, CapEx and/or OpEx. Include all resources:  labour and materials, internal and contract labour, in directs and overheads,  tools and technologies. Notify decision-maker if actual costs exceed planned  costs, add to plan risks.</p>
          <TextArea
            placeholder=''
            name='IPQ5'
            required={false}
            onChange={handleChange}
          />
          <Title>Plan Resources:</Title>
          <p>What people and  financial resources are required to execute the action plan? Who is on the  implementation team? Where is the funding coming from? Notify the  decision-maker if resources are insufficient to execute the action plan,  add to plan risks.</p>
          <TextArea
            placeholder=''
            name='IPQ6'
            required={false}
            onChange={handleChange}
          />
          <Title>Plan  Tracking:</Title>
          <p>Where is the  implementation progress to date? Update periodically from the project plans  to communicate to the PSDM Team.</p>
          <TextArea
            placeholder=''
            name='IPQ7'
            required={false}
            onChange={handleChange}
          />
          <Title>Plan Contingencies:</Title>
          <p>What contingency  plans are available or in place to adjust or modify the original action plan  should implementation exceed certain guardrail thresholds?</p>
        <TextArea
          placeholder=''
          name='IPQ8'
          required={false}
          onChange={handleChange}
        />
        <Title>Plan Readiness:</Title>
        <p>Does the  implementation plan include changes to be managed affecting people, policies,  processes, procedures, technology and assets to ensure success and  sustainment? What are they? Has the change been communicated to all affected  stakeholders? Do they accept and can they manage the change before, during  and after implementation?</p>
      <TextArea
        placeholder=''
        name='IPQ9'
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
