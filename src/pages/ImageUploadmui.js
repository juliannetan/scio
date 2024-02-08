import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Container, Button, Grid, Card, CardMedia, CardContent } from '@mui/material';
import { supabase } from '../components/supabase.js'

const CDNURL = "https://vrkrxuzxtdbtcwyhcaiq.supabase.co/storage/v1/object/public/images/scio/";

const Imageuploadmui = () => {
  const [images, setImages] = useState([]);
  

  async function getImages() {
    const { data, error } = await supabase
    
      .storage
      .from('images')
      .list( 'scio', {
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
    .from('images/scio')
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
    .remove([ 'scio/' + imageName])
  
  if(error) {
    alert(error);
  } else {
    getImages();
  }
}


  return (
    <Container align="center" className="container-sm mt-4">
      <h1>Your ImageWall</h1>
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
                height="140"                
                image={CDNURL + "/" + image.name}
              />
              <CardContent>
              
              <Button size="small" variant="contained" color="error" onClick={() => deleteImage(image.name)}>
                  Delete Image
                </Button>
                
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Imageuploadmui;

/*

import React from 'react';
import { Button } from '@mui/material';
import { supabase } from './createClient';

const downloadFile = async (fileName) => {
  const { data, error } = await supabase
    .storage
    .from('your-storage-bucket-name') // Replace with your actual storage bucket name
    .download(fileName);

  if (data) {
    const url = URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(link);
  } else {
    console.error('Error downloading file:', error);
  }
};

const FileDownloadButton = () => {
  const handleDownload = () => {
    downloadFile('your-file-name.ext'); // Replace with the actual file name you want to download
  };

  return (
    <Button variant="contained" color="primary" onClick={handleDownload}>
      Download File
    </Button>
  );
};

export default FileDownloadButton;*/
