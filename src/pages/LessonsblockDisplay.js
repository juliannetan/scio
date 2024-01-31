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
  padding: 15px 11px;
  
`;

const Div4 = styled.div`
  color: rgba(0, 0, 0, 0.8);
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
  padding: 102px 10px 134px;
`;
*/
const Div5 = styled.div`
  color: rgba(0, 0, 0, 0.8);
  letter-spacing: -0.22px;
  margin-top: 18px;
  font: 500 20px/150% Inter, sans-serif;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const Div6 = styled.div`
  background-color: #fff;
  display: flex;
  margin-top: 5px;
  flex-direction: column;
  align-items: end;
  padding: 4px 0 50px 60px;
  @media (max-width: 991px) {
    max-width: 100%;
    padding-left: 20px;
  }
`;

const Img = styled.img`
  aspect-ratio: 0.67;
  object-fit: contain;
  object-position: center;
  width: 24px;
  margin-bottom: 76px;
  @media (max-width: 991px) {
    margin-bottom: 40px;
  }
`;

const Div7 = styled.div`
  color: rgba(0, 0, 0, 0.8);
  letter-spacing: -0.22px;
  margin-top: 19px;
  font: 500 20px/150% Inter, sans-serif;
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
  padding: 146px 10px 197px;
`;
*/
const Column2 = styled.div`
  display: flex;
  flex-direction: column;
  line-height: normal;
  width: 57%;
  margin-left: 20px;
  @media (max-width: 991px) {
    width: 100%;
  }
`;

const Div8 = styled.div`
  background-color: #d9d9d9;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  width: 100%;
  padding: 23px 17px 13px;
  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 26px;
  }
`;

const Div9 = styled.div`
  color: rgba(0, 0, 0, 0.8);
  letter-spacing: -0.18px;
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
const Div10 = styled.div`
  color: rgba(0, 0, 0, 0.8);
  letter-spacing: -0.18px;
  margin-top: 17px;
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
const Div11 = styled.div`
  color: rgba(0, 0, 0, 0.8);
  letter-spacing: -0.18px;
  margin-top: 13px;
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
const Div12 = styled.div`
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
const Div13 = styled.div`
  color: rgba(0, 0, 0, 0.8);
  letter-spacing: -0.18px;
  margin-top: 14px;
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
const Div14 = styled.div`
  color: rgba(0, 0, 0, 0.8);
  letter-spacing: -0.18px;
  margin-top: 14px;
  font: 500 16px/150% Inter, sans-serif;
 
`;

const Div15 = styled.div`
  background-color: #fff;
  display: flex;
  margin-top: 8px;
  flex-direction: column;
  align-items: end;
  padding: 6px 0 50px 60px;
  
`;

const Img2 = styled.img`
  aspect-ratio: 0.78;
  object-fit: contain;
  object-position: center;
  width: 24px;
  margin-bottom: 10px;
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


const LessonsblockDisplay = () => {

  
  const [lessonsblocks,setLessonsblocks]=useState([])

  const [lessonsblock2,setLessonsblock2]=useState({ID:'', created_at:'',LLS1:'', LLS2:'',  LLQ1:'', LLQ2:'', LLQ3:'', LLQ4:'', LLQ5:'', LLQ6:'' 
  })

  useEffect(() => {
  fetchLessonsblocks()
  }, [])
  



  async function fetchLessonsblocks(){
    const {data} = await supabase
      .from('Lessonscontent')
      .select('*')
       setLessonsblocks(data)

    }
  

    function handleChange2(event){
    
      setLessonsblock2(prevFormData=>{
        return{
          ...prevFormData,
          [event.target.name]:event.target.Lessons
        }
      })
    }
      


    async function deleteLessonsblocks(lessonsblockID){

      const { data, error } = await supabase
        .from('Lessonscontent')
        .delete()
        .eq('ID', lessonsblockID)
  
      fetchLessonsblocks()
      
      
      if (error){
        console.log(error)
      }
  
      if (data){
        console.log(data)
      }
  
    }


    function displayLessonsblocks(lessonsblockID){

      lessonsblocks.map((lessonsblock)=>{
      
          if(lessonsblock.ID==lessonsblockID){
  
            setLessonsblock2({ ID:lessonsblock.ID, created_at:lessonsblock.created_at, LLS1:lessonsblock.LLS1, LLS2:lessonsblock.LLS2, LLQ1:lessonsblock.LLQ1, LLQ2:lessonsblock.LLQ2,LLQ3:lessonsblock.LLQ3, LLQ4:lessonsblock.LLQ4, LLQ5:lessonsblock.LLQ5, LLQ6:lessonsblock.LLQ6 })
          }
        
      })
  
     }


     async function updateLessonsblocks(lessonsblockID){
   
      const { data, error } = await supabase
        .from('Lessonscontent')
  
        .update({ ID:lessonsblock2.ID, created_at:lessonsblock2.created_at, LLS1:lessonsblock2.LLS1, LLS2:lessonsblock2.LLS2, LLQ1:lessonsblock2.LLQ1, LLQ2:lessonsblock2.LLQ2,LLQ3:lessonsblock2.LLQ3, LLQ4:lessonsblock2.LLQ4, LLQ5:lessonsblock2.LLQ5, LLQ6:lessonsblock2.LLQ6  })
  
        .eq('ID', lessonsblockID)
      
  
  
        fetchLessonsblocks()
  
  
  
        if (error){
          console.log(error)
        }
    
        if (data){
          console.log(data)
        }
      }
   



  return (

    <div100>

    <form onSubmit={()=>updateLessonsblocks(lessonsblock2.ID)}>

      <Div>
        <Column>
          <Div2>
            <Div3>
              <Div4>
                <p>
                  <strong>Shared Learnings Text Bullets</strong>
                </p>
              </Div4>
              <textarea placeholder="" name="LLS1" required={false} onChange={handleChange2} defaultValue={lessonsblock2.LLS1}/>
              <Div5>
                <p>
                  <strong>Decision Quality Sliders Scale Graphic</strong>
                </p>
              </Div5>
              
              <Div7>
                <p>
                  <strong>Secondary Lessons Learned</strong>
                </p>
              </Div7>
              <textarea placeholder="" name="LLS2" required={false} onChange={handleChange2} defaultValue={lessonsblock2.LLS2}/>
            </Div3>
          </Div2>
        </Column>
        <Column2>
          <Div8>
            <Div9>
              <p>
                <strong>
                  Overall Decision/Result: Good/Good, Good/Bad, Bad/Good,
                  Bad/Bad? Show 2x2 graphic
                </strong>
                .
              </p>
            </Div9>
            <textarea placeholder="" name="LLQ1" required={false} onChange={handleChange2} defaultValue={lessonsblock2.LLQ1}/>
            <Div10>
              <p>
                <strong>Additional sustainment activities required?</strong>
              </p>
            </Div10>
            <textarea placeholder="" name="LLQ2" required={false} onChange={handleChange2} defaultValue={lessonsblock2.LLQ2}/>
            <Div11>
              <p>
                <strong>
                  Audit. Problem-solvers follow process? Decision-makers follow
                  process? Minimize biases? Avoid DQ traps?
                </strong>
              </p>
            </Div11>
            <textarea placeholder="" name="LLQ3" required={false} onChange={handleChange2} defaultValue={lessonsblock2.LLQ3}/>
            <Div12>
              <p>
                <strong>Lessons learned? Lessons shared?</strong>
              </p>
            </Div12>
            <textarea placeholder="" name="LLQ4" required={false} onChange={handleChange2} defaultValue={lessonsblock2.LLQ4}/>
            <Div13>
              <p>
                <strong>
                  Future opportunities for continuous improvement? Innovation?
                </strong>
              </p>
            </Div13>
            <textarea placeholder="" name="LLQ5" required={false} onChange={handleChange2} defaultValue={lessonsblock2.LLQ5}/>
            <Div14>
              <p>
                <strong>Provide a Decision Quality Sliders graphic</strong>
              </p>
            </Div14>
            <textarea placeholder="" name="LLQ6" required={false} onChange={handleChange2} defaultValue={lessonsblock2.LLQ6}/>
            
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
    
      {lessonsblocks.map((lessonsblock)=>
    
        <tr key={lessonsblock.ID}>
          <td>{lessonsblock.ID}</td>
          
          <td>{lessonsblock.created_at}</td>
          <td>
            <button onClick={()=>  { if (window.confirm('Are you sure you want to delete this record?')) deleteLessonsblocks(lessonsblock.ID)} }>Delete</button>
            <button onClick={()=>{displayLessonsblocks(lessonsblock.ID)}}>Edit</button>
          
          </td>
    
        </tr>
      )}
    </tbody>
    </table>

    </div100>


  );
}

export default LessonsblockDisplay;