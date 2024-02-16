import React from 'react'
import Typography from '@mui/material/Typography'

const MissionPage = () => {
  return (
    <main className='App-main'>
      <section style={{ padding: '32px' }}>
        <Typography variant='h3'>Touchstone</Typography>
        <Typography variant='body1'>
          BC Hydro is a provincial Crown corporation, owned by the government
          and people of British Columbia, Canada. We generate and deliver
          electricity to 95% of the population of B.C. and serve over five
          million people. That's a big responsibility that demands a simple,
          clear and straightforward mission with a clear vision that's guided by
          our values.
        </Typography>
      </section>
    </main>
  )
}

export default MissionPage
