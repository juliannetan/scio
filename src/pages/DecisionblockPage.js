import styled from "styled-components";
import React,{useState, useEffect} from 'react';
import { supabase } from '../components/supabase.js';
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";



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




const DecisionblockPage = ({ setNextPage }) => {

  const handleNextClick = () => {
    setNextPage();
  };

  const [decisionblocks,setDecisionblocks]=useState([])

  const [decisionblock,setDecisionblock]=useState({
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
  

    function handleChange(event){
    
      setDecisionblock(prevFormData=>{
        return{
          ...prevFormData,
          [event.target.name]:event.target.value
        }
      })
    }
   
  

  async function createDecisionblock(e){
    e.preventDefault();

    console.log('insidesafe')
    
    await supabase
    .from('Decisioncontent')
    
    .insert([{DS1:decisionblock.DS1, DQ1:decisionblock.DQ2, DQ2:decisionblock.DQ2, DQ3:decisionblock.DQ3, DQ4:decisionblock.DQ4, DQ5:decisionblock.DQ5,DQ6:decisionblock.DQ6, DQ7:decisionblock.DQ7 }])

    .select()
    
    fetchDecisionblocks()
   

  }




  return (

    <form onSubmit = {createDecisionblock} > 


      <Div>
        <Column>
          <Div2>
            <Div3>
              <Div4>Decision Statement</Div4>
              <textarea placeholder="" name="DS1" required={false} onChange={handleChange} />
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
            <textarea placeholder="" name="DQ1" required={false} onChange={handleChange}/>
            <Div11>
              <p>
                <strong>
                  What model type is best suited for right level of evaluation
                  rigor and complexity?
                </strong>
              </p>
            </Div11>
            <textarea placeholder="" name="DQ2" required={false} onChange={handleChange} />
            <Div12>
              <p>
                <strong>
                  What inputs are influential variables? Technical, people,
                  management system?
                </strong>
              </p>
            </Div12>
            <textarea placeholder="" name="DQ3" required={false} onChange={handleChange}/>
            <Div13>
              <p>
                <strong>
                  What are the best knowledge sources: intuition/experience,
                  data/analytics evidence or a mix? How do we trust human
                  judgment vs ML/AI?
                </strong>
              </p>
            </Div13>
            <textarea placeholder="" name="DQ4" required={false} onChange={handleChange}/>
            <Div14>
              <p>
                <strong>
                  What is our uncertainty? What is our value of Information? Is
                  it worth seeking more knowledge to reduce our uncertainty?
                </strong>
              </p>
            </Div14>
            <textarea placeholder="" name="DQ5" required={false} onChange={handleChange} />
            <Div15>
              <p>
                <strong>Have we guarded against all relevant biases?</strong>
              </p>
            </Div15>
            <textarea placeholder="" name="DQ6" required={false} onChange={handleChange}/>
            <Div16>
              <p>
                <strong>
                  Do constraints come into play? If so, what value is left on
                  table? Is that acceptable?
                </strong>
              </p>
            </Div16>
            <textarea placeholder="" name="DQ7" required={false} onChange={handleChange}/>
          </Div9>
        </Column2>
      </Div>
      <Button type='submit' > Save </Button> 
      <Button type='submit' onClick={handleNextClick}>Next</Button>    
    </form>
  );
}

export default DecisionblockPage;