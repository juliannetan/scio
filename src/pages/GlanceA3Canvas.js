import { Button } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { supabase } from '../components/supabase'

const Div = styled.div`
  display: flex;
  flex-direction: column;
`

const Div2 = styled.div`
  border-radius: 4px;
  border: 1px solid #b9b9b9;
  background-color: #fff;
  display: flex;
  width: 100%;
  flex-direction: column;
`

const Div3 = styled.div`
  background-color: rgba(255, 255, 255, 0);
  display: flex;
  gap: 0px;
  padding: 0 20px;
`

const Div4 = styled.div`
  color: #000;
  border-top: 1px solid #b9b9b9;
  border-left: 1px solid #b9b9b9;
  background-color: rgba(0, 0, 0, 0.06);
  ${'' /* flex-grow: 1; */}
  width: 250px;
  justify-content: center;
  padding: 10px 12px;
  font:
    600 12px/130% Inter,
    sans-serif;
`

const Div5 = styled.div`
  color: #000;
  border-top: 1px solid #b9b9b9;
  border-left: 1px solid #b9b9b9;
  background-color: rgba(0, 0, 0, 0.06);
  ${'' /* flex-grow: 1; */}
  width: 250px;
  justify-content: center;
  padding: 10px 12px;
  font:
    600 12px/130% Inter,
    sans-serif;
`

const Div6 = styled.div`
  color: #000;
  white-space: nowrap;
  border-top: 1px solid #b9b9b9;
  border-left: 1px solid #b9b9b9;
  background-color: rgba(0, 0, 0, 0.06);
  ${'' /* flex-grow: 1; */}
  width: 250px;
  justify-content: center;
  padding: 10px 12px;
  font:
    600 12px/130% Inter,
    sans-serif;
`

const Div7 = styled.div`
  color: #000;
  white-space: nowrap;
  border-top: 1px solid #b9b9b9;
  border-left: 1px solid #b9b9b9;
  background-color: rgba(0, 0, 0, 0.06);
  ${'' /* flex-grow: 1; */}
  width: 250px;
  justify-content: center;
  padding: 10px 12px;
  font:
    600 12px/130% Inter,
    sans-serif;
`

const Div8 = styled.div`
  color: #000;
  border-top: 1px solid #b9b9b9;
  border-left: 1px solid #b9b9b9;
  background-color: rgba(0, 0, 0, 0.06);
  ${'' /* flex-grow: 1; */}
  width: 250px;
  justify-content: center;
  padding: 10px 12px;
  font:
    600 12px/130% Inter,
    sans-serif;
`

const Div9 = styled.div`
  background-color: rgba(255, 255, 255, 0);
  display: flex;
  width: 100%;
  gap: 0px;
  padding: 0 20px;
`

const Div10 = styled.div`
  color: #000;
  border-top: 1px solid #b9b9b9;
  border-left: 1px solid #b9b9b9;
  background-color: rgba(255, 255, 255, 0);
  ${'' /* flex-grow: 1; */}
  width: 250px;
  justify-content: center;
  padding: 10px 12px;
  font:
    400 12px/130% Inter,
    sans-serif;
`

const Div11 = styled.div`
  color: #000;
  white-space: nowrap;
  border-top: 1px solid #b9b9b9;
  border-left: 1px solid #b9b9b9;
  background-color: rgba(255, 255, 255, 0);
  ${'' /* flex-grow: 1; */}
  width: 250px;
  justify-content: center;
  padding: 10px 12px;
  font:
    400 12px/130% Inter,
    sans-serif;
`

const Div12 = styled.div`
  color: #000;
  white-space: nowrap;
  border-top: 1px solid #b9b9b9;
  border-left: 1px solid #b9b9b9;
  background-color: rgba(255, 255, 255, 0);
  ${'' /* flex-grow: 1; */}
  width: 250px;
  justify-content: center;
  padding: 10px 12px;
  font:
    400 12px/130% Inter,
    sans-serif;
`

const Div13 = styled.div`
  color: #000;
  border-top: 1px solid #b9b9b9;
  border-left: 1px solid #b9b9b9;
  background-color: rgba(255, 255, 255, 0);
  ${'' /* flex-grow: 1; */}
  width: 250px;
  justify-content: center;
  padding: 10px 12px;
  font:
    400 12px/130% Inter,
    sans-serif;
`

const Div14 = styled.div`
  color: #000;
  border-top: 1px solid #b9b9b9;
  border-left: 1px solid #b9b9b9;
  background-color: rgba(255, 255, 255, 0);
  ${'' /* flex-grow: 1; */}
  width: 250px;
  justify-content: center;
  padding: 10px 12px;
  font:
    400 12px/130% Inter,
    sans-serif;
`

const Div15 = styled.div`
  display: flex;
  margin-top: 15px;
  align-items: start;
  justify-content: space-between;
  gap: 0px;
  padding: 0 20px;
`

const Div16 = styled.div`
  color: #000;
  background-color: none;
  aspect-ratio: 1.24;
  justify-content: center;
  padding: px 14px;
  font:
    600 24px/130% Inter,
    sans-serif;
`

const Div17 = styled.div`
  display: flex;
  margin-top: 2px;
  flex-grow: 1;
  flex-basis: 0%;
  flex-direction: column;
`

const Div18 = styled.div`
  color: #000;
  align-self: start;
  margin-left: 40px;
  font:
    600 16px/130% Inter,
    sans-serif;
`

const Div19 = styled.div`
  display: block;
  color: #000;
  border-radius: 10px;
  background-color: #d9d9d9;
  margin-top: 1px;
  padding: 20px 60px;
  font:
    400 20px/130% Inter,
    sans-serif;
  ${'' /* white-space: nowrap; */}
  ${
    '' /* justify-content: end;
  align-items: end; */
  }
`

const Div20 = styled.div`
  color: #000;
  background-color: none;
  aspect-ratio: 1.24;
  justify-content: center;
  padding: 3px 14px;
  font:
    600 24px/130% Inter,
    sans-serif;
`

const Div21 = styled.div`
  display: flex;
  margin-top: 4px;
  flex-grow: 1;
  flex-basis: 0%;
  flex-direction: column;
`

const Div22 = styled.div`
  color: #000;
  align-self: start;
  margin-left: 26px;
  font:
    600 16px/130% Inter,
    sans-serif;
`

const Div23 = styled.div`
  display: block;
  color: #000;
  border-radius: 10px;
  background-color: #d9d9d9;
  margin-top: 1px;
  padding: 20px 60px;
  font:
    400 20px/130% Inter,
    sans-serif;
`

const Div24 = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 500px;
  height: 200px;
  font-size: 15px;
  word-wrap: break-word;
`

const Div25 = styled.div`
  display: flex;
  justify-content: end;
`

const A3Canvas = () => {
  const [fetchError, setFetchError] = useState(null)
  const [Problemcontent, setProblemcontent] = useState(null)
  const [Currentcontent, setCurrentcontent] = useState(null)
  const [Futurecontent, setFuturecontent] = useState(null)
  const [Solutioncontent, setSolutioncontent] = useState(null)
  const [Decisioncontent, setDecisioncontent] = useState(null)
  const [Implementationcontent, setImplementationcontent] = useState(null)
  const [Valuecontent, setValuecontent] = useState(null)
  const [Lessonscontent, setLessonscontent] = useState(null)

  useEffect(() => {
    const fetchProblemcontent = async () => {
      const { data, error } = await supabase
        .from('Problemcontent')
        .select('*')
        .eq('ID', 'AB-123456')

      if (error) {
        setFetchError('Could not fetch the Current Content Table')
        setProblemcontent(null)
        console.log(error)
      }
      if (data) {
        setProblemcontent(data)
        setFetchError(null)
      }
    }
    fetchProblemcontent()
  }, [])

  useEffect(() => {
    const fetchCurrentcontent = async () => {
      const { data, error } = await supabase
        .from('Currentcontent')
        .select('*')
        .eq('ID', 'AB-123456')

      if (error) {
        setFetchError('Could not fetch the Current Content Table')
        setCurrentcontent(null)
        console.log(error)
      }
      if (data) {
        setCurrentcontent(data)
        setFetchError(null)
      }
    }
    fetchCurrentcontent()
  }, [])

  useEffect(() => {
    const fetchFuturecontent = async () => {
      const { data, error } = await supabase
        .from('Futurecontent')
        .select('*')
        .eq('ID', 'AB-123456')

      if (error) {
        setFetchError('Could not fetch the Current Content Table')
        setFuturecontent(null)
        console.log(error)
      }
      if (data) {
        setFuturecontent(data)
        setFetchError(null)
      }
    }
    fetchFuturecontent()
  }, [])

  useEffect(() => {
    const fetchSolutioncontent = async () => {
      const { data, error } = await supabase
        .from('Solutioncontent')
        .select('*')
        .eq('ID', 'AB-123456')

      if (error) {
        setFetchError('Could not fetch the Current Content Table')
        setSolutioncontent(null)
        console.log(error)
      }
      if (data) {
        setSolutioncontent(data)
        setFetchError(null)
      }
    }
    fetchSolutioncontent()
  }, [])

  useEffect(() => {
    const fetchDecisioncontent = async () => {
      const { data, error } = await supabase
        .from('Decisioncontent')
        .select('*')
        .eq('ID', 'AB-123456')

      if (error) {
        setFetchError('Could not fetch the Current Content Table')
        setDecisioncontent(null)
        console.log(error)
      }
      if (data) {
        setDecisioncontent(data)
        setFetchError(null)
      }
    }
    fetchDecisioncontent()
  }, [])

  useEffect(() => {
    const fetchImplementationcontent = async () => {
      const { data, error } = await supabase
        .from('Implementationcontent')
        .select('*')
        .eq('ID', 'AB-123456')

      if (error) {
        setFetchError('Could not fetch the Current Content Table')
        setImplementationcontent(null)
        console.log(error)
      }
      if (data) {
        setImplementationcontent(data)
        setFetchError(null)
      }
    }
    fetchImplementationcontent()
  }, [])

  useEffect(() => {
    const fetchValuecontent = async () => {
      const { data, error } = await supabase
        .from('Valuecontent')
        .select('*')
        .eq('ID', 'AB-123456')

      if (error) {
        setFetchError('Could not fetch the Current Content Table')
        setValuecontent(null)
        console.log(error)
      }
      if (data) {
        setValuecontent(data)
        setFetchError(null)
      }
    }
    fetchValuecontent()
  }, [])

  useEffect(() => {
    const fetchLessonscontent = async () => {
      const { data, error } = await supabase
        .from('Lessonscontent')
        .select('*')
        .eq('ID', 'AB-123456')

      if (error) {
        setFetchError('Could not fetch the Current Content Table')
        setLessonscontent(null)
        console.log(error)
      }
      if (data) {
        setLessonscontent(data)
        setFetchError(null)
      }
    }
    fetchLessonscontent()
  }, [])
  return (
    <Div>
      <Div2>
        <Div3>
          <Div4>ID</Div4>
          <Div5>Title/Description</Div5>
          <Div6>Team Problem Solver</Div6>
          <Div7>Team Decision Maker</Div7>
          <Div8>Status</Div8>
        </Div3>
        <Div9>
          <Div10>AB-123456</Div10>
          <Div11>Problem-Solution Set Name</Div11>
          <Div12>Team Decision Maker</Div12>
          <Div13>Names</Div13>
          <Div14>Initiation</Div14>
        </Div9>
      </Div2>

      <Div15>
        <Div16>1</Div16>
        <Div17>
          <Div18>Problem Statement</Div18>
          <Div19>
            <Div24>
              {fetchError && <p>{fetchError}</p>}
              {Problemcontent && (
                <div>
                  {Problemcontent.map((Problemcontent) => (
                    <p>{Problemcontent.PS1}</p>
                  ))}
                </div>
              )}
            </Div24>
            <Div25>
              <Link to='/scio/home/problem-statement'>
                <Button>More Info...</Button>
              </Link>
            </Div25>
          </Div19>
        </Div17>

        <Div20>5</Div20>
        <Div21>
          <Div22>Decision</Div22>
          <Div23>
            <Div24>
              {fetchError && <p>{fetchError}</p>}
              {Decisioncontent && (
                <div>
                  {Decisioncontent.map((Decisioncontent) => (
                    <p>{Decisioncontent.DS1}</p>
                  ))}
                </div>
              )}
            </Div24>
            <Div25>
              <Link to='/scio/home/decision'>
                <Button>More Info...</Button>
              </Link>
            </Div25>
          </Div23>
        </Div21>
      </Div15>

      <Div15>
        <Div16>2</Div16>
        <Div17>
          <Div18>Current State</Div18>
          <Div19>
            <Div24>
              {fetchError && <p>{fetchError}</p>}
              {Currentcontent && (
                <div>
                  {Currentcontent.map((Currentcontent) => (
                    <p>{Currentcontent.CS1}</p>
                  ))}
                </div>
              )}
            </Div24>
            <Div25>
              <Link to='/scio/home/current-state'>
                <Button>More Info...</Button>
              </Link>
            </Div25>
          </Div19>
        </Div17>
        <Div20>6</Div20>
        <Div21>
          <Div22>Implementation Plan</Div22>
          <Div23>
            <Div24>
              {fetchError && <p>{fetchError}</p>}
              {Implementationcontent && (
                <div>
                  {Implementationcontent.map((Implementationcontent) => (
                    <p>{Implementationcontent.IPQ1}</p>
                  ))}
                </div>
              )}
            </Div24>
            <Div25>
              <Link to='/scio/home/implementation-plan'>
                <Button>More Info...</Button>
              </Link>
            </Div25>
          </Div23>
        </Div21>
      </Div15>

      <Div15>
        <Div16>3</Div16>
        <Div17>
          <Div18>Future State</Div18>
          <Div19>
            <Div24>
              {fetchError && <p>{fetchError}</p>}
              {Futurecontent && (
                <div>
                  {Futurecontent.map((Futurecontent) => (
                    <p>{Futurecontent.FS1}</p>
                  ))}
                </div>
              )}
            </Div24>
            <Div25>
              <Link to='/scio/home/future-state'>
                <Button>More Info...</Button>
              </Link>
            </Div25>
          </Div19>
        </Div17>
        <Div20>7</Div20>
        <Div21>
          <Div22>Value Delivery</Div22>
          <Div23>
            <Div24>
              {fetchError && <p>{fetchError}</p>}
              {Valuecontent && (
                <div>
                  {Valuecontent.map((Valuecontent) => (
                    <p>{Valuecontent.VDQ1}</p>
                  ))}
                </div>
              )}
            </Div24>
            <Div25>
              <Link to='/scio/home/value-delivery'>
                <Button>More Info...</Button>
              </Link>
            </Div25>
          </Div23>
        </Div21>
      </Div15>

      <Div15>
        <Div16>4</Div16>
        <Div17>
          <Div18>Solution Evaluation</Div18>
          <Div19>
            <Div24>
              {fetchError && <p>{fetchError}</p>}
              {Solutioncontent && (
                <div>
                  {Solutioncontent.map((Solutioncontent) => (
                    <p>{Solutioncontent.SEQ1}</p>
                  ))}
                </div>
              )}
            </Div24>
            <Div25>
              <Link to='/scio/home/solution-evaluation'>
                <Button>More Info...</Button>
              </Link>
            </Div25>
          </Div19>
        </Div17>
        <Div20>8</Div20>
        <Div21>
          <Div22>Lessons Learned</Div22>
          <Div23>
            <Div24>
              {fetchError && <p>{fetchError}</p>}
              {Lessonscontent && (
                <div>
                  {Lessonscontent.map((Lessonscontent) => (
                    <p>{Lessonscontent.LLS1}</p>
                  ))}
                </div>
              )}
            </Div24>
            <Div25>
              <Link to='/scio/home/lessons-learned'>
                <Button>More Info...</Button>
              </Link>
            </Div25>
          </Div23>
        </Div21>
      </Div15>
    </Div>
  )
}

export default A3Canvas
