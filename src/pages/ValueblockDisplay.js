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
  padding: 14px 13px;
 
`;

const Div4 = styled.div`
  color: rgba(0, 0, 0, 0.8);
  letter-spacing: -0.22px;
  font: 500 20px/150% Inter, sans-serif;
 
`;

const Div5 = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: end;
  padding: 200px 0 131px 60px;
  
`;

const Div6 = styled.div`
  color: rgba(0, 0, 0, 0.8);
  letter-spacing: -0.22px;
  margin-top: 7px;
  font: 500 20px/150% Inter, sans-serif;
  
`;

const Div7 = styled.div`
  background-color: #fff;
  display: flex;
  margin-top: 13px;
  flex-direction: column;
  align-items: end;
  padding: 197px 0 157px 60px;
  
`;

const Div8 = styled.div`
  color: rgba(0, 0, 0, 0.8);
  letter-spacing: -0.22px;
  padding-bottom: 5px;
  margin-top: 13px;
  font: 500 20px/150% Inter, sans-serif;
 
`;

const Div9 = styled.div`
  background-color: #fff;
  display: flex;
  margin-top: 16px;
  flex-direction: column;
  align-items: end;
  padding: 200px 0 185px 60px;
 
`;

const Column2 = styled.div`
  display: flex;
  flex-direction: column;
  line-height: normal;
  width: 57%;
  margin-left: 20px;
 
`;

const Div10 = styled.div`
  background-color: #d9d9d9;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  width: 100%;
  padding: 20px 13px 50px;
  
`;

const Div11 = styled.div`
  color: rgba(0, 0, 0, 0.8);
  letter-spacing: -0.18px;
  font: 500 16px/150% Inter, sans-serif;
  
`;
/*
const textarea = styled(textarea`
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
const Div12 = styled.div`
  color: rgba(0, 0, 0, 0.8);
  letter-spacing: -0.18px;
  margin-top: 8px;
  font: 500 16px/150% Inter, sans-serif;
 
`;

const Div13 = styled.div`
  color: rgba(0, 0, 0, 0.8);
  letter-spacing: -0.18px;
  margin-top: 8px;
  font: 500 16px/150% Inter, sans-serif;
 
`;

const Div14 = styled.div`
  color: rgba(0, 0, 0, 0.8);
  letter-spacing: -0.18px;
  margin-top: 14px;
  font: 500 16px/150% Inter, sans-serif;
 
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



const ValueblockPage = () => {

  
  const [valueblocks,setValueblocks]=useState([])

  const [valueblock2,setValueblock2]=useState({ ID:'', created_at:'', VDQ1:'', VDQ2:'',  VDQ3:'', VDQ4:'', 
  })

  useEffect(() => {
  fetchValueblocks()
  }, [])
  



  async function fetchValueblocks(){
    const {data} = await supabase
      .from('Valuecontent')
      .select('*')
       setValueblocks(data)

    }
  

    function handleChange2(event){
    
      setValueblock2(prevFormData=>{
        return{
          ...prevFormData,
          [event.target.name]:event.target.value
        }
      })
    }
   
    
    async function deleteValueblocks(valueblockID){

      const { data, error } = await supabase
        .from('Valuecontent')
        .delete()
        .eq('ID', valueblockID)
  
      fetchValueblocks
()
      
      
      if (error){
        console.log(error)
      }
  
      if (data){
        console.log(data)
      }
  
    }


    function displayValueblocks(valueblockID){

      valueblocks.map((valueblock)=>{
      
          if(valueblock.ID==valueblockID){
  
            setValueblock2({ ID:valueblock.ID, created_at:valueblock.created_at, VDQ1:valueblock.VDQ1, VDQ2:valueblock.VDQ2, VDQ3:valueblock.VDQ3, VDQ4:valueblock.VDQ4, })
          }
        
      })
  
     }


     async function updateValueblocks(valueblockID){
   
      const { data, error } = await supabase
        .from('Valuecontent')
  
        .update({ ID:valueblock2.ID, created_at:valueblock2.created_at, VDQ1:valueblock2.VDQ1, VDQ2:valueblock2.VDQ2, VDQ3:valueblock2.VDQ3, VDQ4:valueblock2.VDQ4,  })
  
        .eq('ID', valueblockID)
      
  
  
        fetchValueblocks()
  
  
  
        if (error){
          console.log(error)
        }
    
        if (data){
          console.log(data)
        }
      }
   
    


  return (


   <div100>

    <form onSubmit={()=>updateValueblocks(valueblock2.ID)}>
   
      <Div>
        <Column>
          <Div2>
            <Div3>
              <Div4>
                <p>
                  <strong>Performance Graphic</strong>
                </p>
              </Div4>
              <Div5 />
              <Div6>
                <p>
                  <strong>Value Delivery Chart</strong>
                </p>
              </Div6>
              <Div7 />
              <Div8>
                <p>
                  <strong>Secondary Value Delivery</strong>
                </p>
              </Div8>
              <Div9 />
            </Div3>
          </Div2>
        </Column>
        <Column2>
          <Div10>
            <Div11>
              <p>
                <strong>
                  Is what we did having the desired affect within the expected
                  time frame?
                </strong>
              </p>
            </Div11>
            <textarea placeholder="" name="VDQ1" required={false} onChange={handleChange2} defaultValue={valueblock2.VDQ1}/>
            <Div12>
              <p>
                <strong>
                  Identify and track leading performance metrics to lagging
                  business outcomes?
                </strong>
              </p>
            </Div12>
            <textarea placeholder="" name="VDQ2" required={false} onChange={handleChange2}  defaultValue={valueblock2.VDQ2}/>
            <Div13>
              <p>
                <strong>Monitor value realization?</strong>
              </p>
            </Div13>
            <textarea placeholder="" name="VDQ3" required={false} onChange={handleChange2}  defaultValue={valueblock2.VDQ3}/>
            <Div14>
              <p>
                <strong>Performance map to show value delivery progress</strong>
              </p>
            </Div14>
            <textarea placeholder="" name="VDQ4" required={false} onChange={handleChange2}  defaultValue={valueblock2.VDQ4}/>
          </Div10>
        </Column2>
      </Div>
      <button type='submit' > Save Changes</button> 
    
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
    
      {valueblocks.map((valueblock)=>
    
        <tr key={valueblock.ID}>
          <td>{valueblock.ID}</td>
          
          <td>{valueblock.created_at}</td>
          <td>
            <button onClick={()=>  { if (window.confirm('Are you sure you want to delete this record?')) deleteValueblocks(valueblock.ID)} }>Delete</button>
            <button onClick={()=>{displayValueblocks(valueblock.ID)}}>Edit</button>
          
          </td>
    
        </tr>
      )}
    </tbody>
    </table>

    </div100>


  );
}


export default ValueblockPage;