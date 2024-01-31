
import styled from "styled-components";
import React,{useState, useEffect} from 'react';
import { supabase } from './createClient';


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
  font: 600 16px/150% Inter, sans-serif;
  
`;

const Div27 = styled.div`
  color: #000;
  letter-spacing: -0.18px;
  margin-top: 14px;
  font: 600 16px/24px Inter, sans-serif;
  
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

const TitleblockDisplay = () => {

  
  const [titleblocks,setTitleblocks]=useState([])



  const [titleblock2,setTitleblock2]=useState({
    id:'', created_at:'', ID:'', Description:'', ProblemSolvers:'',DecisionMakers:'', Implementation:'', Assurance:'', Delivery:'',Organization:'', Assets:'', Practice:'', Value:'', Status:'', TQ1: '',TQ2: '',TQ3: '',TQ4: '',TQ5: '',TQ6: '',TQ7: '',TQ8: ''
  })
 
  useEffect(() => {
    fetchTitleblocks()
    }, [])
 
  
  async function fetchTitleblocks(){
    const {data} = await supabase
      .from('Titlecontent')
      .select('*')
       setTitleblocks(data)

    }

   
    function handleChange2(event){
    
      setTitleblock2(prevFormData=>{
        return{
          ...prevFormData,
          [event.target.name]:event.target.value
        }
      })
    }

   /* const { data, error } = await supabase
    .from('Titlecontent')
    .insert(ID, Description);
  
  // Handle the result or error
  if (error) {
    console.error('Error inserting data:', error);
  } else {
    console.log('Data inserted successfully:', data);

  }*/


  async function deleteTitleblocks(titleblockID){

    const { data, error } = await supabase
      .from('Titlecontent')
      .delete()
      .eq('ID', titleblockID)

    fetchTitleblocks()
    
    
    if (error){
      console.log(error)
    }

    if (data){
      console.log(data)
    }

  }
 
  function displayTitleblocks(titleblockID){

    titleblocks.map((titleblock)=>{
    
        if(titleblock.ID==titleblockID){

          setTitleblock2({ ID:titleblock.ID, created_at: titleblock.created_at, Description:titleblock.Description, ProblemSolvers:titleblock.ProblemSolvers, DecisionMakers:titleblock.DecisionMakers, Implementation:titleblock.Implementation, Assurance:titleblock.Assurance, Delivery:titleblock.Delivery,Organization:titleblock.Organization, Assets:titleblock.Assets, Practice:titleblock.Practice, Value:titleblock.Value, Status:titleblock.Status, TQ1: titleblock.TQ1,TQ2: titleblock.TQ2,TQ3: titleblock.TQ3,TQ4: titleblock.TQ4,TQ5:titleblock.TQ5 ,TQ6: titleblock.TQ6,TQ7: titleblock.TQ7,TQ8: titleblock.TQ8 })
        }
      
    })

   }
  

   async function updateTitleblocks(titleblockID){
   
    const { data, error } = await supabase
      .from('Titlecontent')

      .update({ id:titleblock2.id, ID:titleblock2.ID, Description:titleblock2.Description, ProblemSolvers:titleblock2.ProblemSolvers, DecisionMakers:titleblock2.DecisionMakers, Implementation:titleblock2.Implementation, Assurance:titleblock2.Assurance, Delivery:titleblock2.Delivery,Organization:titleblock2.Organization, Assets:titleblock2.Assets, Practice:titleblock2.Practice, Value:titleblock2.Value, Status:titleblock2.Status, TQ1: titleblock2.TQ1,TQ2: titleblock2.TQ2,TQ3: titleblock2.TQ3,TQ4: titleblock2.TQ4,TQ5:titleblock2.TQ5 ,TQ6: titleblock2.TQ6,TQ7: titleblock2.TQ7,TQ8: titleblock2.TQ8})

      .eq('ID', titleblockID)
    


      fetchTitleblocks()



      if (error){
        console.log(error)
      }
  
      if (data){
        console.log(data)
      }
    }
 

  return (


     <div>
          
       <form onSubmit={()=>updateTitleblocks(titleblock2.ID)}>
      <Div2>

        <Div3>ID: Unique Identification Reference</Div3>
        <textarea  name='ID' required={false} onChange={handleChange2} defaultValue={titleblock2.ID}/>
        <Div4>Title: PSDM Description</Div4>
        <textarea  name='Description' required={false} onChange={handleChange2} defaultValue={titleblock2.Description}/>
        <Div5>Problem-Solvers: Input, Recommend</Div5>
        <textarea  name='ProblemSolvers' required={false} onChange={handleChange2} defaultValue={titleblock2.ProblemSolvers}/>
        <Div6>Decision-Makers: Decide, Agree</Div6>
        <textarea  name='DecisionMakers' required={false} onChange={handleChange2} defaultValue={titleblock2.DecisionMakers} />
        <Div7>Implementation: Action Plan Execution</Div7>
        <textarea  name='Implementation' required={false} onChange={handleChange2} defaultValue={titleblock2.Implementation}/>
        <Div8>Assurance: Monitor Action, Performance, Value</Div8>
        <textarea  name='Assurance' required={false} onChange={handleChange2} defaultValue={titleblock2.Assurance}/>
        <Div9>Delivery: Lessons Learned</Div9>
        <textarea  name='Delivery' required={false} onChange={handleChange2} defaultValue={titleblock2.Delivery}/>
        <Div10>Organization: Lowest org level accountability</Div10>
        <textarea  name='Organization' required={false} onChange={handleChange2} defaultValue={titleblock2.Organization}/>
        <Div11>Assets: Lowest asset level applicability</Div11>
        <textarea  name='Assets' required={false} onChange={handleChange2} defaultValue={titleblock2.Assets}/>
        <Div12>Practice: Asset management practice</Div12>
        <textarea  name='Practice' required={false} onChange={handleChange2}/>
        <Div13>Value: Primary Value Driver and Impact category</Div13>
        <textarea  name='Value' required={false} onChange={handleChange2} defaultValue={titleblock2.Value}/>
        <Div14>
          Status: Initiation, Problem, Solution, Decision, Implementation, Value
          Delivery, Lessons Learned, Complete, On Hold, Cancelled (not worth
          solving)
        </Div14>
        <textarea  name='Status' required={false} onChange={handleChange2} defaultValue={titleblock2.Status}/>
      </Div2>

      
      <Div15>
        <Div16>What are the PSDM Identifiers?</Div16>
        <textarea  name='TQ1' required={false} onChange={handleChange2} defaultValue={titleblock2.TQ1}/>
        <Div17>What is the PSDM Status?</Div17>
        <textarea  name='TQ2' required={false} onChange={handleChange2} defaultValue={titleblock2.TQ2}/>
        <Div18>Who are the Problem-Solvers?</Div18>
        <textarea  name='TQ3' required={false} onChange={handleChange2} defaultValue={titleblock2.TQ3}/>
        <Div19>Who are the Decision-Makers?</Div19>
        <textarea  name='TQ4' required={false} onChange={handleChange2} defaultValue={titleblock2.TQ4}/>
        <Div20>Who does Implementation?</Div20>
        <textarea  name='TQ5' required={false} onChange={handleChange2} defaultValue={titleblock2.TQ5}/>
        <Div21>Who monitors progress, performance and value delivery?</Div21>
        <textarea  name='TQ6' required={false} onChange={handleChange2} defaultValue={titleblock2.TQ6}/>
        <Div22>Who leads lessons learned?</Div22>
        <textarea  name='TQ7' required={false} onChange={handleChange2} defaultValue={titleblock2.TQ7}/>
        <Div23>
          Do all team members have the requisite competencies and authorities
          for their assigned role?
        </Div23>
        <textarea  name='TQ8' required={false} onChange={handleChange2} defaultValue={titleblock2.TQ8}/>

        
        
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
     
    <button type='submit'>Save Changes</button>
         
</form>
          

<table>
<thead>
  <tr>
    <th>ID</th>
    <th>Description</th>
    <th>Date Created</th>
    <th>Actions</th>

  </tr>
</thead>

<tbody>

  {titleblocks.map((titleblock)=>

    <tr key={titleblock.ID}>
      <td>{titleblock.ID}</td>
      <td>{titleblock.Description}</td>
      <td>{titleblock.created_at}</td>
      <td>
        <button onClick={()=>  { if (window.confirm('Are you sure you want to delete this record?')) deleteTitleblocks(titleblock.ID)} }>Delete</button>
        <button onClick={()=>{displayTitleblocks(titleblock.ID)}}>Edit</button>
      
      </td>

    </tr>
  )}
</tbody>
</table>

</div>

    )
  }



export default TitleblockDisplay

