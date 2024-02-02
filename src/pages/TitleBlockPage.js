
import styled from "styled-components";
import React,{useState, useEffect} from 'react';
import { supabase } from '../components/supabase.js';
import { Button } from "@mui/material";

const Div = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: 2px;
  max-width: px;
  height: auto;
  flex-grow: 0;
  padding: 0 20px 0 17px;
  
`;

const Img = styled.img`
  aspect-ratio: 1.25;
  object-fit: contain;
  object-position: center;
  width: 0px;
  fill: #fff;
  overflow: hidden;
  align-self: center;
  margin-top: 18px;
  max-width: 100%;
`;

const Div2 = styled.div`
  background-color: #d9d9d9;
  align-self: start;
  display: flex;
  flex-grow: 1;
  flex-basis: 0%;
  flex-direction: column;
  max-width: 1000px;
  margin: 11px 34px 195px 10px;
  padding: 11px 0 94px 11px;
  
`;

const Div3 = styled.div`
  color: #000;
  letter-spacing: -0.18px;
  font: 600 16px/150% Inter, sans-serif;
  
`;

/*const textarea = styled(textarea)`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-top: 20px;
  border-radius: 3px;
  border-width: 1px;
  border-style: solid;
  border-color: #ccc;
  padding: 10px;
`;*/

const Div4 = styled.div`
  color: #000;
  letter-spacing: -0.18px;
  margin-top: 15px;
  font: 600 16px/150% Inter, sans-serif;
  
`;

/*const textarea1 = styled(textarea)`
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
  letter-spacing: -0.18px;
  margin-top: 11px;
  font: 600 16px/150% Inter, sans-serif;
 
`;

const Div6 = styled.div`
  color: #000;
  letter-spacing: -0.18px;
  margin-top: 9px;
  font: 600 16px/150% Inter, sans-serif;
  
`;

const Div7 = styled.div`
  color: #000;
  letter-spacing: -0.18px;
  margin-top: 16px;
  font: 600 16px/150% Inter, sans-serif;
  
`;

const Div8 = styled.div`
  color: #000;
  letter-spacing: -0.18px;
  margin-top: 6px;
  font: 600 16px/150% Inter, sans-serif;
  
`;

const Div9 = styled.div`
  color: #000;
  letter-spacing: -0.18px;
  margin-top: 9px;
  font: 600 16px/150% Inter, sans-serif;
  
`;

const Div10 = styled.div`
  color: #000;
  letter-spacing: -0.18px;
  margin-top: 8px;
  font: 600 16px/150% Inter, sans-serif;
  
`;

const Div11 = styled.div`
  color: #000;
  letter-spacing: -0.18px;
  margin-top: 9px;
  font: 600 16px/150% Inter, sans-serif;
  
`;

const Div12 = styled.div`
  color: #000;
  letter-spacing: -0.18px;
  margin-top: 11px;
  font: 600 16px/150% Inter, sans-serif;
  
`;

const Div13 = styled.div`
  color: #000;
  letter-spacing: -0.18px;
  margin-top: 6px;
  font: 600 16px/150% Inter, sans-serif;
 
`;

const Div14 = styled.div`
  color: #000;
  letter-spacing: -0.18px;
  margin-top: 6px;
  font: 600 16px/24px Inter, sans-serif;
 
`;

const Div15 = styled.div`
 /* background-color: #d9d9d9;
  display: flex;
  flex-direction: column;
  max-width: 1000px
  margin: 11px 34px 195px 43px;
  padding: 11px 0 94px 11;
 */

  background-color: #d9d9d9;
  align-self: start;
  display: flex;
  flex-grow: 1;
  flex-basis: 0%;
  flex-direction: column;
  max-width: 1000px;
  margin: 11px 34px 195px 10px;
  padding: 11px 0 94px 11px;
`;

const Div16 = styled.div`
color: #000;
letter-spacing: -0.18px;
font: 600 16px/150% Inter, sans-serif;
  
`;

const Div17 = styled.div`
  color: #000;
  letter-spacing: -0.18px;
  margin-top: 11px;
  font: 600 16px/150% Inter, sans-serif;
  
`;

const Div18 = styled.div`
  color: #000;
  letter-spacing: -0.18px;
  margin-top: 10px;
  font: 600 16px/150% Inter, sans-serif;
  
`;

const Div19 = styled.div`
  color: #000;
  letter-spacing: -0.18px;
  margin-top: 7px;
  font: 600 16px/150% Inter, sans-serif;
  
`;

const Div20 = styled.div`
  color: #000;
  letter-spacing: -0.18px;
  margin-top: 8px;
  font: 600 16px/150% Inter, sans-serif;
  
`;

const Div21 = styled.div`
  color: #000;
  letter-spacing: -0.18px;
  margin-top: 6px;
  font: 600 16px/150% Inter, sans-serif;
  
`;

const Div22 = styled.div`
  color: #000;
  letter-spacing: -0.18px;
  margin-top: 10px;
  font: 600 16px/150% Inter, sans-serif;
  
`;

const Div23 = styled.div`
  color: #000;
  letter-spacing: -0.18px;
  margin-top: 7px;
  font: 600 16px/150% Inter, sans-serif;
  
`;

const Div24 = styled.div`
  display: flex;
  margin-top: 144px;
  justify-content: space-between;
  gap: 20px;
  
`;

const Div25 = styled.div`
  display: flex;
  flex-direction: column;
  
`;

const Div26 = styled.div`
  color: #000;
  letter-spacing: -0.18px;
  font: 500 16px/150% Inter, sans-serif;
  
`;

const Div27 = styled.div`
  color: #000;
  letter-spacing: -0.18px;
  margin-top: 14px;
  font: 500 16px/24px Inter, sans-serif;
  
`;




const TitleblockPage = ({ setNextPage }) => {

  const handleNextClick = () => {
    setNextPage(); // This will set the next page in the Drawer component
  };

  const [titleblocks,setTitleblocks]=useState([])  


  const [titleblock,setTitleblock]=useState({
    ID:'', Description:'', ProblemSolvers:'',DecisionMakers:'', Implementation:'', Assurance:'', Delivery:'',Organization:'', Assets:'', Practice:'', Value:'', Status:'', TQ1: '',TQ2: '',TQ3: '',TQ4: '',TQ5: '',TQ6: '',TQ7: '',TQ8: ''
  })



  useEffect(() => {
  fetchTitleblocks()
  }, [])
  

  async function fetchTitleblocks(){
    const {data} = await supabase
      .from('Titlecontent')
      .select('*')
      setTitleblocks(data)

      console.log(titleblocks)
     
    }


    function handleChange(event){
    
      setTitleblock(prevFormData=>{
        return{
          ...prevFormData,
          [event.target.name]: event.target.value
        };
      });
    }
    
   
    console.log(titleblock)

  async function createTitleblock(e){
    e.preventDefault();
    console.log('insidesafe')

    await supabase
    
    .from('Titlecontent')

    .insert([{ ID:titleblock.ID, Description:titleblock.Description, ProblemSolvers:titleblock.ProblemSolvers, DecisionMakers:titleblock.DecisionMakers, Implementation:titleblock.Implementation, Assurance:titleblock.Assurance, Delivery:titleblock.Delivery,Organization:titleblock.Organization, Assets:titleblock.Assets, Practice:titleblock.Practice, Value:titleblock.Value, Status:titleblock.Status, TQ1: titleblock.TQ1,TQ2: titleblock.TQ2,TQ3: titleblock.TQ3,TQ4: titleblock.TQ4,TQ5:titleblock.TQ5 ,TQ6: titleblock.TQ6,TQ7: titleblock.TQ7,TQ8: titleblock.TQ8 }])

    .select()

  fetchTitleblocks()    

  }

  return (
    /*Form Titleblock*/
    <form onSubmit={createTitleblock}> 

    <Div>
     
      <Div2>

        <Div3>ID: Unique Identification Reference</Div3>
        <textarea placeholder="AB-123456" name='ID' required={true} onChange={handleChange}/>
        <Div4>Title: PSDM Description</Div4>
        <textarea placeholder="" name='Description' required={false} onChange={handleChange} />
        <Div5>Problem-Solvers: Input, Recommend</Div5>
        <textarea placeholder="" name='ProblemSolvers' required={false} onChange={handleChange}/>
        <Div6>Decision-Makers: Decide, Agree</Div6>
        <textarea placeholder="" name='DecisionMakers' required={false} onChange={handleChange} />
        <Div7>Implementation: Action Plan Execution</Div7>
        <textarea placeholder="" name='Implementation' required={false} onChange={handleChange} />
        <Div8>Assurance: Monitor Action, Performance, Value</Div8>
        <textarea placeholder="" name='Assurance' required={false} onChange={handleChange}/>
        <Div9>Delivery: Lessons Learned</Div9>
        <textarea placeholder="" name='Delivery' required={false} onChange={handleChange} />
        <Div10>Organization: Lowest org level accountability</Div10>
        <textarea placeholder="" name='Organization' required={false} onChange={handleChange}/>
        <Div11>Assets: Lowest asset level applicability</Div11>
        <textarea placeholder="" name='Assets' required={false} onChange={handleChange}/>
        <Div12>Practice: Asset management practice</Div12>
        <textarea placeholder="" name='Practice' required={false} onChange={handleChange}/>
        <Div13>Value: Primary Value Driver and Impact category</Div13>
        <textarea placeholder="" name='Value' required={false} onChange={handleChange}/>
        <Div14>
          Status: Initiation, Problem, Solution, Decision, Implementation, Value
          Delivery, Lessons Learned, Complete, On Hold, Cancelled (not worth
          solving)
        </Div14>
        <textarea placeholder="" name='Status' required={false} onChange={handleChange} />
      </Div2>

      
      <Div15>
        <Div16>What are the PSDM Identifiers?</Div16>
        <textarea placeholder="" name='TQ1' required={false} onChange={handleChange}/>
        <Div17>What is the PSDM Status?</Div17>
        <textarea placeholder="" name='TQ2' required={false} onChange={handleChange}/>
        <Div18>Who are the Problem-Solvers?</Div18>
        <textarea placeholder="" name='TQ3' required={false} onChange={handleChange}/>
        <Div19>Who are the Decision-Makers?</Div19>
        <textarea placeholder="" name='TQ4' required={false} onChange={handleChange}/>
        <Div20>Who does Implementation?</Div20>
        <textarea placeholder="" name='TQ5' required={false} onChange={handleChange}/>
        <Div21>Who monitors progress, performance and value delivery?</Div21>
        <textarea placeholder="" name='TQ6' required={false} onChange={handleChange}/>
        <Div22>Who leads lessons learned?</Div22>
        <textarea placeholder="" name='TQ7' required={false} onChange={handleChange}/>
        <Div23>
          Do all team members have the requisite competencies and authorities
          for their assigned role?
        </Div23>
        <textarea placeholder="" name='TQ8' required={false} onChange={handleChange}/>

       
        
        
        <Div24>
          <Div25>
            
            <Div26>Note1: Use RAPID, RACI, RAD or other team frame</Div26>
            <Div27>
              Note2: Organization, Assets, Practice, Value are database tables
              that form EOMS ontology
            </Div27>
          </Div25>
         
        </Div24>
      
      </Div15>
      
    </Div>

        <Button type='submit'>Save </Button>
        <Button type='submit' onClick={handleNextClick}>Next</Button>
    </form>
  );
}



export default TitleblockPage;