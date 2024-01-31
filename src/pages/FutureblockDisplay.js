import styled from "styled-components";
import React,{useState, useEffect} from 'react';
import { supabase } from './createClient';


const Div = styled.div`
  gap: 20px;
  display: flex;
 
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  line-height: normal;
  width: 43%;
  margin-left: 0px;
 
`;

const Div2 = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
 
`;

const Div3 = styled.div`
  background-color: #d9d9d9;
  display: flex;
  flex-direction: column;
  padding: 11px 12px;
 
`;

const Div4 = styled.div`
  color: #000;
  letter-spacing: -0.22px;
  font: 500 20px/150% Inter, sans-serif;
 
`;
/*
const textarea = styled(textarea)`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-top: 20px;
  border-radius: 3px;
  border-width: 1px;
  border-style: solid;
  border-color: #ccc;
  padding: 10px;
`;
*/
const Div5 = styled.div`
  color: #000;
  letter-spacing: -0.22px;
  margin-top: 20px;
  font: 500 20px/150% Inter, sans-serif;
  
`;

const Div6 = styled.div`
  background-color: #fff;
  display: flex;
  margin-top: 4px;
  flex-direction: column;
  align-items: end;
  padding: 200px 0 102px 60px;
 
`;

const Div7 = styled.div`
  color: #000;
  letter-spacing: -0.22px;
  font: 500 20px/150% Inter, sans-serif;
 
`;

const Column2 = styled.div`
  display: flex;
  flex-direction: column;
  line-height: normal;
  width: 57%;
  margin-left: 20px;
  
`;

const Div8 = styled.div`
  background-color: #d9d9d9;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  width: 100%;
  padding: 15px 16px 44px;
 
`;

const Div9 = styled.div`
  color: #000;
  letter-spacing: -0.18px;
  font: 500 16px/150% Inter, sans-serif;

`;

const Div10 = styled.div`
  color: #000;
  letter-spacing: -0.18px;
  margin-top: 16px;
  font: 500 16px/150% Inter, sans-serif;
  
`;

const Div11 = styled.div`
  color: #000;
  letter-spacing: -0.18px;
  margin-top: 11px;
  font: 500 16px/150% Inter, sans-serif;
  
`;

const Div12 = styled.div`
  color: #000;
  letter-spacing: -0.18px;
  margin-top: 11px;
  font: 500 16px/150% Inter, sans-serif;
 
`;

const Div13 = styled.div`
  color: #000;
  letter-spacing: -0.18px;
  margin-top: 15px;
  font: 500 16px/150% Inter, sans-serif;
  
`;

const Div14 = styled.div`
  color: #000;
  letter-spacing: -0.18px;
  margin-top: 12px;
  font: 500 16px/24px Inter, sans-serif;
  
`;

const Div15 = styled.div`
  background-color: #fff;
  display: flex;
  margin-top: 12px;
  flex-direction: column;
  justify-content: center;
  align-items: end;
  padding: 36px 0 36px 60px;
 
`;

const Img = styled.img`
  aspect-ratio: 0.75;
  object-fit: contain;
  object-position: center;
  width: 32px;
`;



const StyledTable = styled.table`
  border-collapse: collapse;
  max-width: 900px;
  width: 100%;
  margin: 2rem auto;

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
  }
`;


const FutureblockPage = () => {

  
  const [futureblocks,setFutureblocks]=useState([])

  const [futureblock2,setFutureblock2]=useState({ ID:'', created_at:'',
    FS1:'', FS2:'', FQ1:'',FQ2:'', FQ3:'', FQ4:'', FQ5:'',FQ6:''
  })

  useEffect(() => {
  fetchFutureblocks()
  }, [])
  



  async function fetchFutureblocks(){
    const {data} = await supabase
      .from('Futurecontent')
      .select('*')
       setFutureblocks(data)

    }
  

    function handleChange2(event){
    
      setFutureblock2(prevFormData=>{
        return{
          ...prevFormData,
          [event.target.name]:event.target.value
        }
      })
    }
   
    async function deleteFutureblocks(futureblockID){

      const { data, error } = await supabase
        .from('Futurecontent')
        .delete()
        .eq('ID', futureblockID)
  
      fetchFutureblocks()
      
      
      if (error){
        console.log(error)
      }
  
      if (data){
        console.log(data)
      }
  
    }


    function displayFutureblocks(futureblockID){

      futureblocks.map((futureblock)=>{
      
          if(futureblock.ID==futureblockID){
  
            setFutureblock2({ ID:futureblock.ID, created_at:futureblock.created_at, FS1:futureblock.FS1, FS2:futureblock.FS2, FQ1:futureblock.FQ1, FQ2:futureblock.FQ2, FQ3:futureblock.FQ3, FQ4:futureblock.FQ4, FQ5:futureblock.FQ5,FQ6:futureblock.FQ6 })
          }
        
      })
  
     }


     async function updateFutureblocks(futureblockID){
   
      const { data, error } = await supabase
        .from('Futurecontent')
  
        .update({ID:futureblock2.ID, created_at:futureblock2.created_at,  FS1:futureblock2.FS1, FS2:futureblock2.FS2, FQ1:futureblock2.FQ1, FQ2:futureblock2.FQ2, FQ3:futureblock2.FQ3, FQ4:futureblock2.FQ4, FQ5:futureblock2.FQ5,FQ6:futureblock2.FQ6})
  
        .eq('ID', futureblockID)
      
  
  
        fetchFutureblocks()
  
  
  
        if (error){
          console.log(error)
        }
    
        if (data){
          console.log(data)
        }
      }
   
    

  return (

  <div100>

      <form onSubmit={()=>updateFutureblocks(futureblock2.ID)}>
      <Div>
        <Column>
          <Div2>
            <Div3>
              <Div4>Future State Gap Statement with bullets</Div4>
              <textarea placeholder="" name="FS1" required={false}  onChange={handleChange2} defaultValue={futureblock2.FS1}/>
              <Div5>Future State Chart/Graphic</Div5>
              <Div6 />
              <Div7>Secondary Content</Div7>
              <textarea placeholder="" name="FS2" required={false}  onChange={handleChange2} defaultValue={futureblock2.FS2}/>
            </Div3>
          </Div2>
        </Column>
        <Column2>
          <Div8>
            <Div9>
              What are the expected targets from Future business goals &
              objectives?
            </Div9>
            <textarea placeholder="" name="FQ1" required={false}  onChange={handleChange2} defaultValue={futureblock2.FQ1}/>
            <Div10>What is the gap between Future and future state?</Div10>
            <textarea placeholder="" name="FQ2" required={false}  onChange={handleChange2} defaultValue={futureblock2.FQ2}/>
            <Div11>
              Can the real or perceived constraints in this situation be
              challenged?
            </Div11>
            <textarea placeholder="" name="FQ3" required={false}  onChange={handleChange2} defaultValue={futureblock2.FQ3}/>
            <Div12>What are the conditions of satisfaction for success?</Div12>
            <textarea placeholder="" name="FQ4" required={false}  onChange={handleChange2} defaultValue={futureblock2.FQ4}/>
            <Div13>How much of the gap is controllable?</Div13>
            <textarea placeholder="" name="FQ5" required={false}  onChange={handleChange2} defaultValue={futureblock2.FQ5}/>
            <Div14>
              What is our tolerance for failure or an undesired outcome?
              <br />
            </Div14>
            <textarea placeholder="" name="FQ6" required={false}  onChange={handleChange2} defaultValue={futureblock2.FQ6}/>
            
          </Div8>
        </Column2>
        </Div>
     <button type='submit' > Save Changes </button> 
     
    </form>

     

    <table>
    <thead>
      <tr>
        <th>ID</th>
        
        <th>Date Created</th>
        <th>Actions</th>
    
      </tr>
    </thead>
    
    <tbody>
    
      {futureblocks.map((futureblock)=>
    
        <tr key={futureblock.ID}>
          <td>{futureblock.ID}</td>
          
          <td>{futureblock.created_at}</td>
          <td>
            <button onClick={()=>  { if (window.confirm('Are you sure you want to delete this user?')) deleteFutureblocks(futureblock.ID)} }>Delete</button>
            <button onClick={()=>{displayFutureblocks(futureblock.ID)}}>Edit</button>
          
          </td>
    
        </tr>
      )}
    </tbody>
    </table>

    </div100>
  );
}


export default FutureblockPage;