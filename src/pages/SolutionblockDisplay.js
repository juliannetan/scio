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

const CDNURL = "https://vrkrxuzxtdbtcwyhcaiq.supabase.co/storage/v1/object/public/images/scio/";



const SolutionblockDisplay = ({ selectedEntryId, selectedId, onClose }) => {
  const [solutionblock, setSolutionblock] = useState({})
  const customSnackbarRef = useRef(null)

  useEffect(() => {
    fetchSolutionblock()
  }, [])

  async function fetchSolutionblock() {
    try {
      const { data, error } = await supabase
        .from('Solutioncontent_duplicate')
        .select('*')
        .eq('ID', selectedEntryId)
        .single()

      if (error) {
        throw error
      }

      if (data) {
        setSolutionblock(data)
      } else {
        setSolutionblock({})
      }
    } catch (error) {
      console.error('Error fetching Solution block:', error.message)
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setSolutionblock((prevImplementationblock) => ({
      ...prevImplementationblock,
      [name]: value,
    }))
  }

  const dataToSubmit = {
    ...solutionblock,
    id: selectedId,
    ID: selectedEntryId,
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      let { data, error } = {}
      // Check if implementation block ID exists
      const existingEntry = await supabase
        .from('Solutioncontent_duplicate')
        .select('*')
        .eq('ID', solutionblock.ID)
        .single()

      if (!existingEntry.data) {
        // Insert a new entry if it doesn't exist
        ;({ data, error } = await supabase
          .from('Solutioncontent_duplicate')
          .insert([dataToSubmit]))
      } else {
        // Update existing entry
        ;({ data, error } = await supabase
          .from('Solutioncontent_duplicate')
          .update(solutionblock)
          .eq('ID', solutionblock.ID))
      }

      if (error) {
        throw error
      }

      fetchSolutionblock()
      customSnackbarRef.current.showSnackbar(
        'Successfully saved Solution form.',
        'success',
      )
    } catch (error) {
      customSnackbarRef.current.showSnackbar(`Error: ${error.message}`, 'error')
      console.error('Error saving Solution form:', error.message)
    }
  }

 
  /* Upload Image*/
  const [images, setImages] = useState([]);
  
  const [selectedFile, setSelectedFile] = useState(null);

  async function getImages() {
    const { data, error } = await supabase
    
      .storage
      .from('images')
      .list( 'scio/'+ selectedEntryId + '/solution', {
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
    .from('images/scio/'+ selectedEntryId + '/solution')
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
    .remove(['scio/'+ selectedEntryId + '/solution/' + imageName])
  
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
        <Title>Solution Evaluation</Title>
        <p>Present a summary of the solution model, alternatives, evaluation results and recommendation.</p>
        <TextArea
        placeholder=''
        name='SS1'
        required={false}
        onChange={handleChange}
        value={solutionblock.SS1 || ''}
      />
           
          <Title>Alternative vs. Objectives Table</Title>
          <p>Use the Choose File button below to upload an image to your gallery</p>
          <input type="file" accept=".png, .jpg, .jpeg, " onChange={(e) => uploadImage(e)} />
          <hr />
          <h3>Your Files</h3>
          <Grid container spacing={2}>
            {images.map((image) => (
              <Grid item key={CDNURL + selectedEntryId + "/" +  'solution'+ "/" + image.name}>
                <Card>
                  <CardMedia  
                    component="img"
                    height="150"                
                    image={CDNURL + selectedEntryId + "/" +  'solution'+ "/" + image.name}
                  />
                  <CardContent>   
                   
                   <Button size="small" variant="contained" color="error" onClick={() => deleteImage(image.name)}>Delete Image</Button> 
                   
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>  
          <Title>Solution Alternatives</Title>
          <p>Provide a brief  description of each alternative and summarize resources and cost requirements  with associated benefits. This content is not shown in the A3 Canvas view.</p>

         <strong>Solution  Alterative Set A</strong>
        <TextArea
        placeholder=''
        name='SAA'
        required={false}
        onChange={handleChange}
        value={solutionblock.SAA || ''}
      />   

        <strong>Solution  Alterative Set B</strong>
        <TextArea
        placeholder=''
        name='SAB'
        required={false}
        onChange={handleChange}
        value={solutionblock.SAB || ''}
      />  

      
      <strong>Solution  Alterative Set C</strong>
      <TextArea
      placeholder=''
      name='SAC'
      required={false}
      onChange={handleChange}  
      value={solutionblock.SAC || ''}
    />  

                 
    <strong>Solution  Alterative Set D</strong>
      <TextArea
      placeholder=''
      name='SAD'
      required={false}
      onChange={handleChange}
      value={solutionblock.SAD || ''}
    />  

                 
    <strong>Solution  Alterative Set E</strong>
      <TextArea
      placeholder=''
      name='SAE'
      required={false}
      onChange={handleChange}
      value={solutionblock.SAE || ''}
    />  

    <strong>Solution  Alterative Set F</strong>
      <TextArea
      placeholder=''
      name='SAF'
      required={false}
      onChange={handleChange}
      value={solutionblock.SAF || ''}
    />  

    <Title>Secondary Solution Evaluation Content:</Title>
          <Title>Indicated Recommended and Selected Solution</Title>
          
          <Title>Model Graphic like a decision tree, influence diagram, or other</Title>
          <p>Use the Choose File button below to upload an image to your gallery</p>
          <input type="file" accept=".png, .jpg, .jpeg, " onChange={(e) => uploadImage(e)} />
          <hr />
          <h3>Your Images</h3>
          <Grid container spacing={2}>
            {images.map((image) => (
              <Grid item key={CDNURL + selectedEntryId + "/" +  'solution'+ "/" + image.name}>
                <Card>
                  <CardMedia  
                    component="img"
                    height="150"                
                    image={CDNURL + selectedEntryId + "/" +  'solution'+ "/" + image.name}
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
           <Title>Solution  Alternatives:</Title>
          <p>What rich achievable  set of creative and compelling alternatives (sets of actions) are considered?  Which set returns maximum value? Which set just satisfies success criteria?  Which sets optimize for certain parameters given acceptable tradeoffs? Which  set has the best return within current resource utilization? Do hybrids of  alternatives make sense?</p>
          <TextArea
            placeholder=''
            name='SEQ1'
            required={false}
            onChange={handleChange}
            value={solutionblock.SEQ1 || ''}
          />
          <Title>
          Solution  Model: </Title>
          <p>What model is best  tailored to provide the right level given the decision type, complexity and  impact? What are the relevant inputs and quality of inputs? Is the model  built for satisfying or optimization, and for what exactly?</p>
          <TextArea
            placeholder=''
            name='SEQ2'
            required={false}
            onChange={handleChange}
            value={solutionblock.SEQ2 || ''}
          />
          <Title>Solution  Knowledge:</Title>
          <p>How can we utilize  relevant information and knowledge to  produce reliable judgement and predictions about future outcomes? Is it  qualitative intuition and experience from competent trustworthy unbiased  authoritative sources with sound track records? Is it quantitative data &  analytic evidence from ? Should it be both, and how much of each? How  should we best integrate human  judgment and machine AI/ML?</p>
          <TextArea
            placeholder=''
            name='SEQ3'
            required={false}
            onChange={handleChange}
            value={solutionblock.SEQ3 || ''}
          />
          <Title> Solution  Uncertainty:</Title>
          <p>What are our  uncertainties given we have limited knowledge about the present and the future and can only represent our  understanding wih possibilities, and probabilities. Is the source confidence  sufficient to make a quality evaluation, recommendation and decision? What is  the value of information? Is it worth seeking more info/knowledge to reduce  the uncertainties and increase confidence in the evaluation? Would the answer  change if more information became available or if certain inputs/assumptions  were outside of expectations?</p>
          <TextArea
            placeholder=''
            name='SEQ4'
            required={false}
            onChange={handleChange}
            value={solutionblock.SEQ4 || ''}
          />
          <Title>Solution  Assumptions:</Title>
          <p>What are the  influential variables in the model inputs and assumptions? Usually there is a  few variables that have a disproportionate affect on results. Highlight and  bring attention to each of these. For the expected outcomes, for each alternative outline the level of planning  and confidence associated with the costs and benefits estimates.</p>
          <TextArea
            placeholder=''
            name='SEQ5'
            required={false}
            onChange={handleChange}
            value={solutionblock.SEQ5 || ''}
          />
          <Title>Solution  Alignment:</Title>
          <p>How does each  alternative solution set align to organizational strategic or tactical goals  and objectives, and value framework?</p>
          <TextArea
            placeholder=''
            name='SEQ6'
            required={false}
            onChange={handleChange}
            value={solutionblock.SEQ6 || ''}
          />
       
          <Title>Solution  Tradeoffs:</Title>
          <p>Are value tradeoffs  or constraints a factor? How much of one value can be given up in order to  get more of another, particularly financial (revenue, cost) against  non-financial (safety, environment, customer service, compliance,social  governance reputation) drivers? If so, how much value is left on the table?  Is that acceptable? Are the constraints real or arbitrary? How can they be  addressed? Can they be challenged or changed if there's business value in  doing so?</p>
        <TextArea
          placeholder=''
          name='SEQ7'
          required={false}
          onChange={handleChange}
          value={solutionblock.SEQ7 || ''}
        />

        <Title>Solution  Biases:</Title>
        <p>What biases might be  a factor? Certain information and knowledge can have significant errors or  omission. Non-calibrated and inexperienced people without developed track  records suffer from unintended biases  and overconfidence. What steps have we taken to guard against these biases  and blind spots?</p>
      <TextArea
        placeholder=''
        name='SEQ8'
        required={false}
        onChange={handleChange}
        value={solutionblock.SEQ8 || ''}
      />

      <Title>Solution  Recommendation:</Title>
          <p>What preferred  alternative solution using sound reasoning is recommended? What is the  specific expected outcome and the likelihood of success?</p>
    <TextArea
      placeholder=''
      name='SEQ9'
      required={false}
      onChange={handleChange}
      value={solutionblock.SEQ9 || ''}
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

export default SolutionblockDisplay
