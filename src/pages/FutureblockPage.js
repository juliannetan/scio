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
  padding: 11px 12px;
 
`;

const Div4 = styled.div`
  color: #000;
  letter-spacing: -0.22px;
  font: 500 20px/150% Inter, sans-serif;
 
`;
/*
const textarea = styled(textarea)`
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
  letter-spacing: -0.22px;
  margin-top: 20px;
  font: 500 20px/150% Inter, sans-serif;
  
`;

const Div6 = styled.div`
  background-color: #fff;
  display: flex;
  margin-top: 4px;
  flex-direction: column;
  align-items: end;
  padding: 200px 0 102px 60px;
 
`;

const Div7 = styled.div`
  color: #000;
  letter-spacing: -0.22px;
  font: 500 20px/150% Inter, sans-serif;
 
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
  padding: 15px 16px 44px;
 
`;

const Div9 = styled.div`
  color: #000;
  letter-spacing: -0.18px;
  font: 500 16px/150% Inter, sans-serif;

`;

const Div10 = styled.div`
  color: #000;
  letter-spacing: -0.18px;
  margin-top: 16px;
  font: 500 16px/150% Inter, sans-serif;
  
`;

const Div11 = styled.div`
  color: #000;
  letter-spacing: -0.18px;
  margin-top: 11px;
  font: 500 16px/150% Inter, sans-serif;
  
`;

const Div12 = styled.div`
  color: #000;
  letter-spacing: -0.18px;
  margin-top: 11px;
  font: 500 16px/150% Inter, sans-serif;
 
`;

const Div13 = styled.div`
  color: #000;
  letter-spacing: -0.18px;
  margin-top: 15px;
  font: 500 16px/150% Inter, sans-serif;
  
`;

const Div14 = styled.div`
  color: #000;
  letter-spacing: -0.18px;
  margin-top: 12px;
  font: 500 16px/24px Inter, sans-serif;
  
`;

const Div15 = styled.div`
  background-color: #fff;
  display: flex;
  margin-top: 12px;
  flex-direction: column;
  justify-content: center;
  align-items: end;
  padding: 36px 0 36px 60px;
 
`;

const Img = styled.img`
  aspect-ratio: 0.75;
  object-fit: contain;
  object-position: center;
  width: 32px;
`;


const FutureblockPage = () => {

  
  const [futureblocks,setFutureblocks]=useState([])

  const [futureblock,setFutureblock]=useState({
    FS1:'', FS2:'', FQ1:'',FQ2:'', FQ3:'', FQ4:'', FQ5:'',FQ6:''
  })

  useEffect(() => {
  fetchFutureblocks()
  }, [])
  



  async function fetchFutureblocks(){
    const {data} = await supabase
      .from('Futurecontent')
      .select('*')
       setFutureblocks(data)

    }
  

    function handleChange(event){
    
      setFutureblock(prevFormData=>{
        return{
          ...prevFormData,
          [event.target.name]:event.target.value
        }
      })
    }
   
  

  async function createFutureblock(e){
    e.preventDefault();

    console.log('insidesafe')
    
    await supabase
    .from('Futurecontent')
    
    .insert([{FS1:futureblock.FS1, FS2:futureblock.FS2, FQ1:futureblock.FQ1, FQ2:futureblock.FQ2, FQ3:futureblock.FQ3, FQ4:futureblock.FQ4, FQ5:futureblock.FQ5,FQ6:futureblock.FQ6 }])

    .select()
    
    fetchFutureblocks()
   

  }




  return (

    <form onSubmit = {createFutureblock} > 

      <Div>
        <Column>
          <Div2>
            <Div3>
              <Div4>Future State Gap Statement with bullets</Div4>
              <textarea placeholder="" name="FS1" required={false}  onChange={handleChange}/>
              <Div5>Future State Chart/Graphic</Div5>
              <Div6 />
              <Div7>Secondary Content</Div7>
              <textarea placeholder="" name="FS2" required={false}  onChange={handleChange}/>
            </Div3>
          </Div2>
        </Column>
        <Column2>
          <Div8>
            <Div9>
              What are the expected targets from current business goals &
              objectives?
            </Div9>
            <textarea placeholder="" name="FQ1" required={false}  onChange={handleChange} />
            <Div10>What is the gap between current and future state?</Div10>
            <textarea placeholder="" name="FQ2" required={false}  onChange={handleChange}/>
            <Div11>
              Can the real or perceived constraints in this situation be
              challenged?
            </Div11>
            <textarea placeholder="" name="FQ3" required={false}  onChange={handleChange} />
            <Div12>What are the conditions of satisfaction for success?</Div12>
            <textarea placeholder="" name="FQ4" required={false}  onChange={handleChange}/>
            <Div13>How much of the gap is controllable?</Div13>
            <textarea placeholder="" name="FQ5" required={false}  onChange={handleChange} />
            <Div14>
              What is our tolerance for failure or an undesired outcome?
              <br />
            </Div14>
            <textarea placeholder="" name="FQ6" required={false}  onChange={handleChange}/>
            
          </Div8>
        </Column2>
      </Div>
     <button type='submit' > Save </button> 
    
    </form>
  );
}


export default FutureblockPage;