import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import { supabase } from '../components/supabase.js'

const Div = styled.div`
  gap: 20px;
  display: flex;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  line-height: normal;
  width: 43%;
  margin-left: 0px;
`

const Div2 = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`

const Div3 = styled.div`
  background-color: #d9d9d9;
  display: flex;
  flex-direction: column;
  margin-bottom: 22px;
  padding: 47px 8px 200px;
`

const Div4 = styled.div`
  color: #000;
  letter-spacing: -0.22px;
  font:
    600 20px/150% Inter,
    sans-serif;
`
/*
const textarea  = styled(textarea `
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
  margin-top: 7px;
  font:
    600 20px/150% Inter,
    sans-serif;
`

const Div6 = styled.div`
  background-color: #fff;
  display: flex;
  margin-top: 7px;
  flex-direction: column;
  align-items: end;
  padding: 200px 0 184px 60px;
`

const Div7 = styled.div`
  color: #000;
  letter-spacing: -0.22px;
  font:
    600 20px/150% Inter,
    sans-serif;
`

const Column2 = styled.div`
  display: flex;
  flex-direction: column;
  line-height: normal;
  width: 57%;
  margin-left: 20px;
`

const Div8 = styled.div`
  background-color: #d9d9d9;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  width: 100%;
  padding: 23px 18px;
`

const Div9 = styled.div`
  color: rgba(0, 0, 0, 0.8);
  letter-spacing: -0.18px;
  font:
    500 16px/150% Inter,
    sans-serif;
`

const Div10 = styled.div`
  color: rgba(0, 0, 0, 0.8);
  letter-spacing: -0.18px;
  margin-top: 9px;
  font:
    500 16px/24px Inter,
    sans-serif;
`

const Div11 = styled.div`
  color: rgba(0, 0, 0, 0.8);
  letter-spacing: -0.18px;
  margin-top: 10px;
  font:
    500 16px/24px Inter,
    sans-serif;
`

const Div12 = styled.div`
  color: rgba(0, 0, 0, 0.8);
  letter-spacing: -0.18px;
  margin-top: 15px;
  font:
    500 16px/150% Inter,
    sans-serif;
`

const Div13 = styled.div`
  color: rgba(0, 0, 0, 0.8);
  letter-spacing: -0.18px;
  margin-top: 18px;
  font:
    500 16px/150% Inter,
    sans-serif;
`

const Div14 = styled.div`
  color: rgba(0, 0, 0, 0.8);
  letter-spacing: -0.18px;
  margin-top: 12px;
  font:
    500 16px/24px Inter,
    sans-serif;
`

const Div15 = styled.div`
  background-color: #fff;
  display: flex;
  margin-top: 15px;
  flex-direction: column;
  justify-content: center;
  align-items: end;
  padding: 16px 0 16px 60px;
`

const Img = styled.img`
  aspect-ratio: 0.36;
  object-fit: contain;
  object-position: center;
  width: 24px;
`

const StyledTable = styled.table`
  border-collapse: collapse;
  max-width: 900px;
  width: 100%;
  margin: 2rem auto;

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
  }
`

const CurrentblockDisplay = () => {
  const [currentblocks, setCurrentblocks] = useState([])

  const [currentblock2, setCurrentblock2] = useState({
    created_at: '',
    ID: '',
    CS1: '',
    CS2: '',
    CQ1: '',
    CQ2: '',
    CQ3: '',
    CQ4: '',
    CQ5: '',
    CQ6: '',
  })

  useEffect(() => {
    fetchCurrentblocks()
  }, [])

  async function fetchCurrentblocks() {
    const { data } = await supabase.from('Currentcontent').select('*')
    setCurrentblocks(data)
  }

  function handleChange2(event) {
    setCurrentblock2((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      }
    })
  }

  async function deleteCurrentblocks(currentblockID) {
    const { data, error } = await supabase
      .from('Currentcontent')
      .delete()
      .eq('ID', currentblockID)

    fetchCurrentblocks()

    if (error) {
      console.log(error)
    }

    if (data) {
      console.log(data)
    }
  }

  function displayCurrentblocks(currentblockID) {
    currentblocks.map((currentblock) => {
      if (currentblock.ID == currentblockID) {
        setCurrentblock2({
          ID: currentblock.ID,
          created_at: currentblock.created_at,
          CS1: currentblock.CS1,
          CS2: currentblock.CS2,
          CQ1: currentblock.CQ1,
          CQ2: currentblock.CQ2,
          CQ3: currentblock.CQ3,
          CQ4: currentblock.CQ4,
          CQ5: currentblock.CQ5,
          CQ6: currentblock.CQ6,
        })
      }
    })
  }

  async function updateCurrentblocks(currentblockID) {
    const { data, error } = await supabase
      .from('Currentcontent')

      .update({
        ID: currentblock2.ID,
        created_at: currentblock2.created_at,
        CS1: currentblock2.CS1,
        CS2: currentblock2.CS2,
        CQ1: currentblock2.CQ1,
        CQ2: currentblock2.CQ2,
        CQ3: currentblock2.CQ3,
        CQ4: currentblock2.CQ4,
        CQ5: currentblock2.CQ5,
        CQ6: currentblock2.CQ6,
      })

      .eq('ID', currentblockID)

    fetchCurrentblocks()

    if (error) {
      console.log(error)
    }

    if (data) {
      console.log(data)
    }
  }

  return (
    <div100>
      <form onSubmit={() => updateCurrentblocks(currentblock2.ID)}>
        <Div>
          <Column>
            <Div2>
              <Div3>
                <Div4>Current State Statement</Div4>
                <textarea
                  name='CS1'
                  required={false}
                  onChange={handleChange2}
                  defaultValue={currentblock2.CS1}
                />
                <Div5>Current State Chart / Graphic</Div5>
                <Div6 />
                <Div7>Secondary Current State Statement</Div7>
                <textarea
                  placeholder=''
                  name='CS2'
                  required={false}
                  onChange={handleChange2}
                  defaultValue={currentblock2.CS2}
                />
              </Div3>
            </Div2>
          </Column>
          <Column2>
            <Div8>
              <Div9>What is the problem background? How did we get here?</Div9>
              <textarea
                placeholder=''
                name='CQ1'
                required={false}
                onChange={handleChange2}
                defaultValue={currentblock2.CQ1}
              />
              <Div10>
                How are we dealing with the problem now? What are the barriers
                to solving this problem already?
              </Div10>
              <textarea
                placeholder=''
                name='CQ2'
                required={false}
                onChange={handleChange2}
                defaultValue={currentblock2.CQ2}
              />
              <Div11>
                Everything is relative. Relative to what, exactly? What is the
                baseline view? Wide view? External view? What’s the denominator?
              </Div11>
              <textarea
                placeholder=''
                name='CQ3'
                required={false}
                onChange={handleChange2}
                defaultValue={currentblock2.CQ3}
              />
              <Div12>What is our confidence/uncertainty?</Div12>
              <textarea
                placeholder=''
                name='CQ4'
                required={false}
                onChange={handleChange2}
                defaultValue={currentblock2.CQ4}
              />
              <Div13>What are the causes, root causes and 5 Whys?</Div13>
              <textarea
                placeholder=''
                name='CQ5'
                required={false}
                onChange={handleChange2}
                defaultValue={currentblock2.CQ5}
              />
              <Div14>
                What is the problem scale? Value driver(s)? Impact? Time
                horizon? Problem type?
                <br />
              </Div14>
              <textarea
                placeholder=''
                name='CQ6'
                required={false}
                onChange={handleChange2}
                defaultValue={currentblock2.CQ6}
              />
            </Div8>
          </Column2>
        </Div>
        <button type='submit'> Save Changes </button>
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
          {currentblocks.map((currentblock) => (
            <tr key={currentblock.ID}>
              <td>{currentblock.ID}</td>

              <td>{currentblock.created_at}</td>
              <td>
                <button
                  onClick={() => {
                    if (
                      window.confirm(
                        'Are you sure you want to delete this record?',
                      )
                    )
                      deleteCurrentblocks(currentblock.ID)
                  }}
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    displayCurrentblocks(currentblock.ID)
                  }}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div100>
  )
}

export default CurrentblockDisplay
