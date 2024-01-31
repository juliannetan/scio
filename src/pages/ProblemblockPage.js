
import styled from "styled-components";
import React,{useState, useEffect} from 'react';
import { supabase } from '../components/supabase';
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
background-color: #d9d9d9;
display: flex;
flex-grow: 1;
flex-direction: column;
width: 100%;
margin-right: -5px;
padding: 20px 37px 50px 30px;

`;

const Div3 = styled.div`
  color: #000;
  letter-spacing: -0.22px;
  font: 500 20px/150% Inter, sans-serif;
  
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
  padding: 136px 10px 180px;
`;
*/
const Div4 = styled.div`
  color: #000;
  letter-spacing: -0.22px;
  margin-top: 37px;
  font: 500 20px/150% Inter, sans-serif;
 
`;
/*
const textarea2 = styled(textarea2`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-top: 20px;
  border-radius: 3px;
  border-width: 1px;
  border-style: solid;
  border-color: #ccc;
  padding: 97px 10px 147px;
`;
*/
const Column2 = styled.div`
  display: flex;
  flex-direction: column;
  line-height: normal;
  width: 57%;
  margin-left: 20px;
 
`;

const Div5 = styled.div`
  background-color: #d9d9d9;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  width: 100%;
  margin-right: -5px;
  padding: 20px 37px 50px 30px;
  
`;

const Div6 = styled.div`
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
const Div7 = styled.div`
  color: rgba(0, 0, 0, 0.8);
  letter-spacing: -0.18px;
  margin-top: 19px;
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
const Div8 = styled.div`
  color: rgba(0, 0, 0, 0.8);
  letter-spacing: -0.18px;
  margin-top: 26px;
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
const Div9 = styled.div`
  color: rgba(0, 0, 0, 0.8);
  letter-spacing: -0.18px;
  margin-top: 6px;
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
const Div10 = styled.div`
  color: rgba(0, 0, 0, 0.8);
  letter-spacing: -0.18px;
  margin-top: 6px;
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
const Div11 = styled.div`
  color: rgba(0, 0, 0, 0.8);
  letter-spacing: -0.18px;
  margin-top: 13px;
  font: 500 16px/150% Inter, sans-serif;
  
`;

const Div12 = styled.div`
  background-color: #fff;
  display: flex;
  margin-top: 8px;
  flex-direction: column;
  justify-content: center;
  align-items: end;
  padding: 21px 0 21px 60px;
  
`;

const Img = styled.img`
  aspect-ratio: 0.63;
  object-fit: contain;
  object-position: center;
  width: 20px;
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



const ProblemblockPage = () => {
  const navigate = useNavigate();

  const handleNextClick = () => {
    navigate('/scio/current-state');
};
  
  const [problemblocks,setProblemblocks]=useState([])

  const [problemblock,setProblemblock]=useState({
   PS1:'', PS2:'', PQ1:'',PQ2:'', PQ3:'', PQ4:'', PQ5:'',PQ6:''
  })

  useEffect(() => {
  fetchProblemblocks()
  }, [])
  



  async function fetchProblemblocks(){
    const {data} = await supabase
      .from('Problemcontent')
      .select('*')
       setProblemblocks(data)

    }
  

    function handleChange(event){
    
      setProblemblock(prevFormData=>{
        return{
          ...prevFormData,
          [event.target.name]:event.target.value
        }
      })
    }
   
  

  async function createProblemblock(e){
    e.preventDefault();

    console.log('insidesafe')
    
    await supabase
    .from('Problemcontent')
    
    .insert([{PS1:problemblock.PS1, PS2:problemblock.PS2, PQ1:problemblock.PQ1, PQ2:problemblock.PQ2, PQ3:problemblock.PQ3, PQ4:problemblock.PQ4, PQ5:problemblock.PQ5,PQ6:problemblock.PQ6 }])

    .select()
    
    fetchProblemblocks()
   

  }
 






  return (

    <form onSubmit = {createProblemblock} > 
    
      <Div>
        <Column>
          <Div2>
            <Div3>Problem Statement </Div3>
            <textarea placeholder="" name="PS1" required={false} onChange={handleChange} />
            <Div4>Secondary Content</Div4>
            <textarea placeholder="" name="PS2" required={false} onChange={handleChange}/>
          </Div2>
        </Column>
        <Column2>
          <Div5>
            <Div6>
              <p>
                <strong>
                  What is the Problem Brief, our initial understanding of the
                  problem (a priority)
                </strong>
              </p>
            </Div6>
            <textarea placeholder="" name="PQ1" required={false} onChange={handleChange}/>
            <Div7>
              <p>
                <strong>Why this is a problem worth solving?</strong>
              </p>
            </Div7>
            <textarea placeholder="" name="PQ2" required={false} onChange={handleChange}/>
            <Div8>
              <p>
                <strong>
                  What is the threat or opportunity to the organization's goals,
                  objectives, strategies or plans?
                </strong>
              </p>
            </Div8>
            <textarea placeholder="" name="PQ3" required={false} onChange={handleChange}/>
            <Div9>
              <p>
                <strong>
                  Who or what internal/external stakeholders are affected?
                </strong>
              </p>
            </Div9>
            <textarea placeholder="" name="PQ4" required={false} onChange={handleChange}/>
            <Div10>
              <p>
                <strong>
                  What alternate frames apply as lens through which we see the
                  problem (apply different perspectives using diverse
                  frameworks)
                </strong>
              </p>
            </Div10>
            <textarea placeholder="" name="PQ5" required={false} onChange={handleChange}/>
            <Div11>
              <p>
                <strong>
                  Clarify the problem statement in context of suitable frame(s)
                </strong>
              </p>
            </Div11>
           
            <textarea placeholder="" name="PQ6" required={false} onChange={handleChange}/>
          </Div5>
        </Column2>
      </Div>
      <Button type='submit' > Save </Button> 
      <Button onClick={handleNextClick}>Next</Button>

    </form>
  
  );
}


export default ProblemblockPage;