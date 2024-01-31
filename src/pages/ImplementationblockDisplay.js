import styled from "styled-components";
import React,{useState, useEffect} from 'react';
import { supabase } from '../components/supabase.js';




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


const ImplementationblockDisplay = () => {

  
  const [implementationblocks,setImplementationblocks]=useState([])

  const [implementationblock2,setImplementationblock2]=useState({ ID:'', created_at:'', IPQ1:'', IPQ2:'',  IPQ3:'', IPQ4:'', IPQ5:'', IPQ6:'', IPQ7:''
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
  

    function handleChange2(event){
    
      setImplementationblock2(prevFormData=>{
        return{
          ...prevFormData,
          [event.target.name]:event.target.value
        }
      })
    }
   
    
    async function deleteImplementationblocks(implementationblockID){

      const { data, error } = await supabase
        .from('Implementationcontent')
        .delete()
        .eq('ID', implementationblockID)
  
      fetchImplementationblocks()
      
      
      if (error){
        console.log(error)
      }
  
      if (data){
        console.log(data)
      }
  
    }


    function displayImplementationblocks(implementationblockID){

      implementationblocks.map((implementationblock)=>{
      
          if(implementationblock.ID==implementationblockID){
  
            setImplementationblock2({ ID:implementationblock.ID, created_at:implementationblock.created_at,IPQ1:implementationblock.IPQ1, IPQ2:implementationblock.IPQ2, IPQ3:implementationblock.IPQ3, IPQ4:implementationblock.IPQ4, IPQ5:implementationblock.IPQ5,IPQ6:implementationblock.IPQ6,  IPQ7:implementationblock.IPQ7})
          }
        
      })
  
     }


     async function updateImplementationblocks(implementationblockID){
   
      const { data, error } = await supabase
        .from('Implementationcontent')
  
        .update({ ID:implementationblock2.ID, created_at:implementationblock2.created_at,IPQ1:implementationblock2.IPQ1, IPQ2:implementationblock2.IPQ2, IPQ3:implementationblock2.IPQ3, IPQ4:implementationblock2.IPQ4, IPQ5:implementationblock2.IPQ5,IPQ6:implementationblock2.IPQ6,  IPQ7:implementationblock2.IPQ7 })
  
        .eq('ID', implementationblockID)
      
  
  
        fetchImplementationblocks()
  
  
  
        if (error){
          console.log(error)
        }
    
        if (data){
          console.log(data)
        }
      }
   
    


  return (

    <div100>

    <form onSubmit={()=>updateImplementationblocks(implementationblock2.ID)}>

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
            <textarea placeholder="" name="IPQ1" required={false} onChange={handleChange2} defaultValue={implementationblock2.IPQ1}/>
            <Div10>
              <p>
                <strong>
                  Plan. Include plan scope, schedule, cost and resources, and
                  MOC/org change?
                </strong>
              </p>
            </Div10>
            <textarea placeholder="" name="IPQ2" required={false} onChange={handleChange2} defaultValue={implementationblock2.IPQ2}/>
            <Div11>
              <p>
                <strong>Do. Commit to execution. Track implementation?</strong>
              </p>
            </Div11>
            <textarea placeholder="" name="IPQ3" required={false} onChange={handleChange2} defaultValue={implementationblock2.IPQ3}/>
            <Div12>
              <p>
                <strong>
                  Check. Monitor on track within preset guardrails and
                  safeguards?
                </strong>
              </p>
            </Div12>
            <textarea placeholder="" name="IPQ4" required={false} onChange={handleChange2} defaultValue={implementationblock2.IPQ4}/>
            <Div13>
              <p>
                <strong>
                  Act. Modify and adjust action plan based with preset
                  contingency plans?
                 
                </strong>
                </p>
            </Div13>
            <textarea placeholder="" name="IPQ5" required={false} onChange={handleChange2} defaultValue={implementationblock2.IPQ5}/>

            <Div14>
            <p>
                <strong>
                  Monitor action implementation confidence levels?
                 
                </strong>
                </p>
               </Div14>
            <textarea placeholder="" name="IPQ6" required={false} onChange={handleChange2} defaultValue={implementationblock2.IPQ6}/>
            <Div16>
            <p>
            <strong> Provide an Action Plan graphic card to show activity progress.

            </strong>
              </p>
            </Div16>
            <textarea placeholder="" name="IPQ7" required={false} onChange={handleChange2} defaultValue={implementationblock2.IPQ7}/>

          </Div8>
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
    
      {implementationblocks.map((implementationblock)=>
    
        <tr key={implementationblock.ID}>
          <td>{implementationblock.ID}</td>
          
          <td>{implementationblock.created_at}</td>
          <td>
            <button onClick={()=>  { if (window.confirm('Are you sure you want to delete this record?')) deleteImplementationblocks(implementationblock.ID)} }>Delete</button>
            <button onClick={()=>{displayImplementationblocks(implementationblock.ID)}}>Edit</button>
          
          </td>
    
        </tr>
      )}
    </tbody>
    </table>

    </div100>

  );
}

export default ImplementationblockDisplay;