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
  padding: 11px 10px;
 
`;

const Div4 = styled.div`
  color: #000;
  letter-spacing: -0.18px;
  font: 600 16px/150% Inter, sans-serif;
 
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
  padding: 19px 10px 81px;
`;
*/
const Div5 = styled.div`
  color: #000;
  letter-spacing: -0.18px;
  margin-top: 17px;
  font: 600 16px/150% Inter, sans-serif;
 
`;

const Div6 = styled.div`
  background-color: #fff;
  display: flex;
  margin-top: 9px;
  flex-direction: column;
  align-items: end;
  padding: 174px 0 50px 60px;
  
`;

const Div7 = styled.div`
  color: #000;
  letter-spacing: -0.18px;
  font: 600 16px/150% Inter, sans-serif;
  
`;

const Div8 = styled.div`
  background-color: #fff;
  display: flex;
  margin-top: 10px;
  flex-direction: column;
  align-items: end;
  padding: 157px 0 111px 60px;
  
`;

const Column2 = styled.div`
  display: flex;
  flex-direction: column;
  line-height: normal;
  width: 57%;
  margin-left: 20px;
 
`;

const Div9 = styled.div`
  background-color: #d9d9d9;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  width: 100%;
  padding: 18px 0 10px 14px;

`;

const Div10 = styled.div`
  color: #000;
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
const Div11 = styled.div`
  color: #000;
  letter-spacing: -0.18px;
  margin-top: 13px;
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
  color: #000;
  letter-spacing: -0.18px;
  margin-top: 6px;
  font: 500 16px/150% Inter, sans-serif;
  @media (max-width: 991px) {
    max-width: 100%;
  }
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
const Div13 = styled.div`
  color: #000;
  letter-spacing: -0.18px;
  margin: 14px 14px 0 0;
  font: 500 16px/24px Inter, sans-serif;
 
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
const Div14 = styled.div`
  color: #000;
  letter-spacing: -0.18px;
  margin-top: 5px;
  font: 500 16px/24px Inter, sans-serif;
  
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
const Div15 = styled.div`
  color: #000;
  letter-spacing: -0.18px;
  margin-top: 6px;
  font: 500 16px/150% Inter, sans-serif;
  @media (max-width: 991px) {
    max-width: 100%;
  }
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
const Div16 = styled.div`
  color: #000;
  letter-spacing: -0.18px;
  margin-top: 6px;
  font: 500 16px/150% Inter, sans-serif;
  @media (max-width: 991px) {
    max-width: 100%;
  }
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


const DecisionblockDisplay = () => {

  
  const [decisionblocks,setDecisionblocks]=useState([])

  const [decisionblock2,setDecisionblock2]=useState({ ID:'', created_at:'',
    DS1:'', DQ1:'', DQ2:'', DQ3:'',DQ4:'', DQ5:'', DQ6:'', DQ7:''
  })

  useEffect(() => {
  fetchDecisionblocks()
  }, [])
  

  async function fetchDecisionblocks(){
    const {data} = await supabase
      .from('Decisioncontent')
      .select('*')
       setDecisionblocks(data)

    }
  

    function handleChange2(event){
    
      setDecisionblock2(prevFormData=>{
        return{
          ...prevFormData,
          [event.target.name]:event.target.value
        }
      })
    }
   
    async function deleteDecisionblocks(decisionblockID){

      const { data, error } = await supabase
        .from('Decisioncontent')
        .delete()
        .eq('ID', decisionblockID)
  
      fetchDecisionblocks()
      
      
      if (error){
        console.log(error)
      }
  
      if (data){
        console.log(data)
      }
  
    }


    function displayDecisionblocks(decisionblockID){

      decisionblocks.map((decisionblock)=>{
      
          if(decisionblock.ID==decisionblockID){
  
            setDecisionblock2({ ID:decisionblock.ID, created_at:decisionblock.created_at, DS1:decisionblock.DS1, DQ1:decisionblock.DQ2, DQ2:decisionblock.DQ2, DQ3:decisionblock.DQ3, DQ4:decisionblock.DQ4, DQ5:decisionblock.DQ5,DQ6:decisionblock.DQ6, DQ7:decisionblock.DQ7 })
          }
        
      })
  
     }


     async function updateDecisionblocks(decisionblockID){
   
      const { data, error } = await supabase
        .from('Decisioncontent')
  
        .update({ ID:decisionblock2.ID, created_at:decisionblock2.created_at, DS1:decisionblock2.DS1, DQ1:decisionblock2.DQ2, DQ2:decisionblock2.DQ2, DQ3:decisionblock2.DQ3, DQ4:decisionblock2.DQ4, DQ5:decisionblock2.DQ5,DQ6:decisionblock2.DQ6, DQ7:decisionblock2.DQ7 })
  
        .eq('ID', decisionblockID)
      
  
  
        fetchDecisionblocks()
  
  
  
        if (error){
          console.log(error)
        }
    
        if (data){
          console.log(data)
        }
      }
   
    


  return (

   
    <div100>

    <form onSubmit={()=>updateDecisionblocks(decisionblock2.ID)}>


      <Div>
        <Column>
          <Div2>
            <Div3>
              <Div4>Decision Statement</Div4>
              <textarea placeholder="" name="DS1" required={false} onChange={handleChange2} defaultValue={decisionblock2.DS1}/>
              <Div5>Strategy & Values Alignment Table</Div5>
              <Div6 />
              <Div7>Effort vs Success Table (optional)</Div7>
              <Div8 />
            </Div3>
          </Div2>
        </Column>
        <Column2>
          <Div9>
            <Div10>
              <p>
                <strong>
                  Identify several compelling creative alternatives.
                </strong>
              </p>
            </Div10>
            <textarea placeholder="" name="DQ1" required={false} onChange={handleChange2} defaultValue={decisionblock2.DQ1} />
            <Div11>
              <p>
                <strong>
                  What model type is best suited for right level of evaluation
                  rigor and complexity?
                </strong>
              </p>
            </Div11>
            <textarea placeholder="" name="DQ2" required={false} onChange={handleChange2} defaultValue={decisionblock2.DQ2}/>
            <Div12>
              <p>
                <strong>
                  What inputs are influential variables? Technical, people,
                  management system?
                </strong>
              </p>
            </Div12>
            <textarea placeholder="" name="DQ3" required={false} onChange={handleChange2} defaultValue={decisionblock2.DQ3}/>
            <Div13>
              <p>
                <strong>
                  What are the best knowledge sources: intuition/experience,
                  data/analytics evidence or a mix? How do we trust human
                  judgment vs ML/AI?
                </strong>
              </p>
            </Div13>
            <textarea placeholder="" name="DQ4" required={false} onChange={handleChange2} defaultValue={decisionblock2.DQ4}/>
            <Div14>
              <p>
                <strong>
                  What is our uncertainty? What is our value of Information? Is
                  it worth seeking more knowledge to reduce our uncertainty?
                </strong>
              </p>
            </Div14>
            <textarea placeholder="" name="DQ5" required={false} onChange={handleChange2} defaultValue={decisionblock2.DQ5}/>
            <Div15>
              <p>
                <strong>Have we guarded against all relevant biases?</strong>
              </p>
            </Div15>
            <textarea placeholder="" name="DQ6" required={false} onChange={handleChange2} defaultValue={decisionblock2.DQ6}/>
            <Div16>
              <p>
                <strong>
                  Do constraints come into play? If so, what value is left on
                  table? Is that acceptable?
                </strong>
              </p>
            </Div16>
            <textarea placeholder="" name="DQ7" required={false} onChange={handleChange2} defaultValue={decisionblock2.DQ7}/>
          </Div9>
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
    
      {decisionblocks.map((decisionblock)=>
    
        <tr key={decisionblock.ID}>
          <td>{decisionblock.ID}</td>
          
          <td>{decisionblock.created_at}</td>
          <td>
            <button onClick={()=>  { if (window.confirm('Are you sure you want to delete this user?')) deleteDecisionblocks(decisionblock.ID)} }>Delete</button>
            <button onClick={()=>{displayDecisionblocks(decisionblock.ID)}}>Edit</button>
          
          </td>
    
        </tr>
      )}
    </tbody>
    </table>

    </div100>

  );
}

export default DecisionblockDisplay;