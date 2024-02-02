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
  padding: 12px 12px 23px;
  
`;

const Div4 = styled.div`
  color: #000;
  letter-spacing: -0.22px;
  font: 500 20px/150% Inter, sans-serif;
  
`;

const Div5 = styled.div`
  background-color: #fff;
  display: flex;
  margin-top: 15px;
  flex-direction: column;
  align-items: end;
  padding: 191px 0 132px 60px;
  
`;

const Div6 = styled.div`
  color: #000;
  letter-spacing: -0.22px;
  font: 500 20px/150% Inter, sans-serif;
 
`;

const Div7 = styled.div`
  background-color: #fff;
  display: flex;
  margin-top: 11px;
  flex-direction: column;
  align-items: end;
  padding: 200px 0 180px 60px;
  
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
  padding: 19px 9px 19px 18px;
  
`;

const Div9 = styled.div`
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
const Div10 = styled.div`
  color: #000;
  letter-spacing: -0.18px;
  margin-top: 15px;
  font: 500 16px/150% Inter, sans-serif;
 
`;

const Div11 = styled.div`
  color: #000;
  letter-spacing: -0.18px;
  margin-top: 6px;
  font: 500 16px/150% Inter, sans-serif;
  
`;

const Div12 = styled.div`
  color: #000;
  letter-spacing: -0.18px;
  margin-top: 12px;
  font: 500 16px/150% Inter, sans-serif;
  
`;

const Div13 = styled.div`
  color: #000;
  letter-spacing: -0.18px;
  margin-top: 6px;
  font: 500 16px/150% Inter, sans-serif;
 
`;

const Div14 = styled.div`
  color: #000;
  letter-spacing: -0.18px;
  margin-top: 14px;
  font: 500 16px/150% Inter, sans-serif;
 
`;

const Div15 = styled.div`
  background-color: #fff;
  display: flex;
  margin-top: 4px;
  flex-direction: column;
  justify-content: center;
  align-items: end;
  padding: 30px 0 30px 60px;
 
`;

const Img = styled.img`
  aspect-ratio: 0.63;
  object-fit: contain;
  object-position: center;
  width: 24px;
`;

const Div16 = styled.div`
  color: #000;
  letter-spacing: -0.18px;
  margin-top: 14px;
  font: 500 16px/150% Inter, sans-serif;
 
`;

const Div17 = styled.div`
  background-color: #fff;
  display: flex;
  margin-top: 4px;
  flex-direction: column;
  justify-content: center;
  align-items: end;
  padding: 26px 0 26px 60px;
 
`;

const Img2 = styled.img`
  aspect-ratio: 0.7;
  object-fit: contain;
  object-position: center;
  width: 24px;
`;



const ImplementationblockPage = ({ setNextPage }) => {

  const handleNextClick = () => {
    setNextPage();
  };

  const [implementationblocks,setImplementationblocks]=useState([])

  const [implementationblock,setImplementationblock]=useState({
    IPQ1:'', IPQ2:'',  IPQ3:'', IPQ4:'', IPQ5:'', IPQ6:'', IPQ7:''
  })

  useEffect(() => {
  fetchImplementationblocks()
  }, [])
  



  async function fetchImplementationblocks(){
    const {data} = await supabase
      .from('Implementationcontent')
      .select('*')
       setImplementationblocks(data)

    }
  

    function handleChange(event){
    
      setImplementationblock(prevFormData=>{
        return{
          ...prevFormData,
          [event.target.name]:event.target.value
        }
      })
    }
   
  

  async function createImplementationblock(e){
    e.preventDefault();

    console.log('insidesafe')
    
    await supabase
    .from('Implementationcontent')
    
    .insert([{IPQ1:implementationblock.IPQ1, IPQ2:implementationblock.IPQ2, IPQ3:implementationblock.IPQ3, IPQ4:implementationblock.IPQ4, IPQ5:implementationblock.IPQ5,IPQ6:implementationblock.IPQ6,  IPQ7:implementationblock.IPQ7 }])

    .select()
    
    fetchImplementationblocks()
   

  }


  return (
    <form onSubmit = {createImplementationblock} > 

      <Div>
        <Column>
          <Div2>
            <Div3>
              <Div4>Action Plan Milestone Chart</Div4>
              <Div5 />
              <Div6>Secondary Action Plan Milestone</Div6>
              <Div7 />
            </Div3>
          </Div2>
        </Column>
        <Column2>
          <Div8>
            <Div9>
              <p>
                <strong>
                  Set of activities assigned to the selected solution?
                </strong>
              </p>
            </Div9>
            <textarea placeholder="" name="IPQ1" required={false} onChange={handleChange}/>
            <Div10>
              <p>
                <strong>
                  Plan. Include plan scope, schedule, cost and resources, and
                  MOC/org change?
                </strong>
              </p>
            </Div10>
            <textarea placeholder="" name="IPQ2" required={false} onChange={handleChange}/>
            <Div11>
              <p>
                <strong>Do. Commit to execution. Track implementation?</strong>
              </p>
            </Div11>
            <textarea placeholder="" name="IPQ3" required={false} onChange={handleChange}/>
            <Div12>
              <p>
                <strong>
                  Check. Monitor on track within preset guardrails and
                  safeguards?
                </strong>
              </p>
            </Div12>
            <textarea placeholder="" name="IPQ4" required={false} onChange={handleChange}/>
            <Div13>
              <p>
                <strong>
                  Act. Modify and adjust action plan based with preset
                  contingency plans?
                 
                </strong>
                </p>
            </Div13>
            <textarea placeholder="" name="IPQ5" required={false} onChange={handleChange}/>

            <Div14>
            <p>
                <strong>
                  Monitor action implementation confidence levels?
                 
                </strong>
                </p>
               </Div14>
            <textarea placeholder="" name="IPQ6" required={false} onChange={handleChange}/>
            <Div16>
            <p>
            <strong> Provide an Action Plan graphic card to show activity progress.

            </strong>
              </p>
            </Div16>
            <textarea placeholder="" name="IPQ7" required={false} onChange={handleChange}/>

          </Div8>
        </Column2>
      </Div>
      <Button type='submit' > Save </Button> 
      <Button type='submit' onClick={handleNextClick}>Next</Button>    
    </form>
  );
}

export default ImplementationblockPage;