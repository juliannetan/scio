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
  padding: 16px 19px 10px;
 
`;

const Div4 = styled.div`
  color: #000;
  letter-spacing: -0.18px;
  font: 600 16px/150% Inter, sans-serif;
 
`;

const Div5 = styled.div`
  background-color: #fff;
  display: flex;
  margin-top: 5px;
  flex-direction: column;
  align-items: end;
  padding: 145px 0 50px 60px;
 
`;

const Div6 = styled.div`
  color: #000;
  letter-spacing: -0.18px;
  margin-top: 14px;
  font: 600 16px/150% Inter, sans-serif;
  
`;

const Div7 = styled.div`
  background-color: #fff;
  display: flex;
  margin-top: 5px;
  flex-direction: column;
  align-items: end;
  padding: 158px 0 50px 60px;
  
`;

const Div8 = styled.div`
  color: #000;
  letter-spacing: -0.18px;
  margin-top: 16px;
  font: 600 16px/150% Inter, sans-serif;
 
`;

const Div9 = styled.div`
  background-color: #fff;
  display: flex;
  margin-top: 8px;
  flex-direction: column;
  align-items: end;
  padding: 170px 0 50px 60px;
 
`;

const Div10 = styled.div`
  color: #000;
  letter-spacing: -0.18px;
  font: 600 16px/150% Inter, sans-serif;
  
`;

const Div11 = styled.div`
  background-color: #fff;
  display: flex;
  margin-top: 13px;
  flex-direction: column;
  align-items: end;
  padding: 194px 0 50px 60px;
  
`;

const Column2 = styled.div`
  display: flex;
  flex-direction: column;
  line-height: normal;
  width: 57%;
  margin-left: 20px;
 
`;

const Div12 = styled.div`
  background-color: #d9d9d9;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  width: 100%;
  padding: 15px 13px;
 
`;

const Div13 = styled.div`
  color: #000;
  letter-spacing: -0.18px;
  font: 500 16px/150% Inter, sans-serif;
  
`;
/*
const textarea1 = styled(textarea)`
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
const Div14 = styled.div`
  color: #000;
  letter-spacing: -0.18px;
  margin-top: 6px;
  font: 500 16px/150% Inter, sans-serif;
 
`;

const Div15 = styled.div`
  color: #000;
  letter-spacing: -0.18px;
  margin-top: 6px;
  font: 500 16px/150% Inter, sans-serif;
 
`;

const Div16 = styled.div`
  color: #000;
  letter-spacing: -0.18px;
  margin-top: 6px;
  font: 500 16px/24px Inter, sans-serif;
 
`;

const Div17 = styled.div`
  color: #000;
  letter-spacing: -0.18px;
  margin-top: 6px;
  font: 500 16px/24px Inter, sans-serif;
 
`;

const Div18 = styled.div`
  color: #000;
  letter-spacing: -0.18px;
  margin-top: 13px;
  font: 500 16px/150% Inter, sans-serif;
 
`;

const Div19 = styled.div`
  color: #000;
  letter-spacing: -0.18px;
  margin-top: 10px;
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



const SolutionblockDisplay = () => {

  
  const [solutionblocks,setSolutionblocks]=useState([])

  const [solutionblock2,setSolutionblock2]=useState({ ID:'', created_at:'',
    SEQ1:'', SEQ2:'', SEQ3:'',SEQ4:'', SEQ5:'', SEQ6:'', SEQ7:''
  })

  useEffect(() => {
  fetchSolutionblocks()
  }, [])
  



  async function fetchSolutionblocks(){
    const {data} = await supabase
      .from('Solutioncontent')
      .select('*')
       setSolutionblocks(data)

    }
  

    function handleChange2(event){
    
      setSolutionblock2(prevFormData=>{
        return{
          ...prevFormData,
          [event.target.name]:event.target.value
        }
      })
    }
   
    async function deleteSolutionblocks(solutionblockID){

      const { data, error } = await supabase
        .from('Solutioncontent')
        .delete()
        .eq('ID', solutionblockID)
  
      fetchSolutionblocks()
      
      
      if (error){
        console.log(error)
      }
  
      if (data){
        console.log(data)
      }
  
    }


    function displaySolutionblocks(solutionblockID){

      solutionblocks.map((solutionblock)=>{
      
          if(solutionblock.ID==solutionblockID){
  
            setSolutionblock2({ ID:solutionblock.ID, created_at:solutionblock.created_at, SEQ1:solutionblock.SEQ1, SEQ2:solutionblock.SEQ2, SEQ3:solutionblock.SEQ3,SEQ4:solutionblock.SEQ4, SEQ5:solutionblock.SEQ5, SEQ6:solutionblock.SEQ6, SEQ7:solutionblock.SEQ7 })
          }
        
      })
  
     }


     async function updateSolutionblocks(solutionblockID){
   
      const { data, error } = await supabase
        .from('Solutioncontent')
  
        .update({ ID:solutionblock2.ID, created_at:solutionblock2.created_at, SEQ1:solutionblock2.SEQ1, SEQ2:solutionblock2.SEQ2, SEQ3:solutionblock2.SEQ3,SEQ4:solutionblock2.SEQ4, SEQ5:solutionblock2.SEQ5, SEQ6:solutionblock2.SEQ6, SEQ7:solutionblock2.SEQ7})
  
        .eq('ID', solutionblockID)
      
  
  
        fetchSolutionblocks()
  
  
  
        if (error){
          console.log(error)
        }
    
        if (data){
          console.log(data)
        }
      }
   

  return (


   <div100>

      <form onSubmit={()=>updateSolutionblocks(solutionblock2.ID)}>
      <Div>
        <Column>
          <Div2>
            <Div3>
              <Div4>Model Diagram Graphic</Div4>
              <Div5 />
              <Div6>Alternative vs. Objectives Table</Div6>
              <Div7 />
              <Div8>Indicated Recommended and Selected Solution</Div8>
              <Div9 />
              <Div10>Model Diagram Graphic</Div10>
              <Div11 />
            </Div3>
          </Div2>
        </Column>
        <Column2>
          <Div12>
            <Div13>
              <p>
                <strong>
                  Identify several compelling creative alternatives
                </strong>
              </p>
            </Div13>
            <textarea placeholder="" name="SEQ1" required={false} onChange={handleChange2} defaultValue={solutionblock2.SEQ1}/>
            <Div14>
              <p>
                <strong>
                  What model type is best suited for right level of evaluation
                  rigour and complexity?
                </strong>
              </p>
            </Div14>
            <textarea placeholder="" name="SEQ2" required={false} onChange={handleChange2} defaultValue={solutionblock2.SEQ2}/>
            <Div15>
              <p>
                <strong>
                  What inputs are influential variables? Technical, people,
                  management system?
                </strong>
              </p>
            </Div15>
            <textarea placeholder="" name="SEQ3" required={false} onChange={handleChange2} defaultValue={solutionblock2.SEQ3}/>
            <Div16>
              <p>
                <strong>
                  What are the best knowledge sources: intuition/experience,
                  data/analytics evidence or a mix? How do we trust human
                  judgement vs ML/AI?
                </strong>
              </p>
            </Div16>
            <textarea placeholder="" name="SEQ4" required={false} onChange={handleChange2} defaultValue={solutionblock2.SEQ4}/>
            <Div17>
              <p>
                <strong>
                  What is our uncertainty? What is our value of Information? Is
                  it worth seeking more knowledge to reduce our uncertainty?
                </strong>
              </p>
            </Div17>
            <textarea placeholder="" name="SEQ5" required={false} onChange={handleChange2} defaultValue={solutionblock2.SEQ5}/>
            <Div18>
              <p>
                <strong>Have we guarded against all relevant biases?</strong>
              </p>
            </Div18>
            <textarea placeholder="" name="SEQ6" required={false} onChange={handleChange2} defaultValue={solutionblock2.SEQ6}/>
            <Div19>
              <p>
                <strong>
                  Do constraints come into play? If so, what value is left on
                  table? Is that acceptable?
                </strong>
              </p>
            </Div19>
            <textarea placeholder="" name="SEQ7" required={false} onChange={handleChange2} defaultValue={solutionblock2.SEQ7}/>
          </Div12>
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
    
      {solutionblocks.map((solutionblock)=>
    
        <tr key={solutionblock.ID}>
          <td>{solutionblock.ID}</td>
          
          <td>{solutionblock.created_at}</td>
          <td>
            <button onClick={()=>  { if (window.confirm('Are you sure you want to delete this record?')) deleteSolutionblocks(solutionblock.ID)} }>Delete</button>
            <button onClick={()=>{displaySolutionblocks(solutionblock.ID)}}>Edit</button>
          
          </td>
    
        </tr>
      )}
    </tbody>
    </table>




    </div100>
  );
  
}


export default SolutionblockDisplay;

