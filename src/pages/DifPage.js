import React from 'react'
import styled from 'styled-components'
import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import { BarPlot } from '@mui/x-charts/BarChart'
import { LinePlot, MarkPlot } from '@mui/x-charts/LineChart'
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis'
import { PiePlot } from '@mui/x-charts/PieChart'
import theme from '../theme'
import DifTable from '../components/DifTable'

const DashboardContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`

const WidgetContainer = styled.div`
  background-color: ${theme.white};
  color: ${theme.secondary};
  padding: 20px;
  margin: 10px;
  width: 48%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`
const WidgetTableContainer = styled.div`
  background-color: ${theme.white};
  color: ${theme.secondary};
  padding: 20px;
  margin: 10px;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`

const WidgetTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 15px;
`

const DifPage = ({
  setSubMenuItem,
  setShowSubItems,
  setRenderA3Canvas,
  setSelectedEntryId,
}) => {
  return (
    <DashboardContainer>
      <WidgetTableContainer>
        <DifTable
          setSubMenuItem={setSubMenuItem}
          setShowSubItems={setShowSubItems}
          setRenderA3Canvas={setRenderA3Canvas}
          setSelectedEntryId={setSelectedEntryId}
        />
      </WidgetTableContainer>
    </DashboardContainer>
  )
}

export default DifPage
