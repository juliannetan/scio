import React from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import theme from '../theme';

const DashboardContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const WidgetContainer = styled.div`
  background-color: ${theme.white};
  color: ${theme.dark};
  padding: 20px;
  margin: 10px;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const WidgetTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 15px;
`;

const OsdPage = () => {
  const items = [
    { title: 'Strategic Organizational Goals'},
    { title: 'Key Operations Objectives', content: 'lorem ipsum' },
    { title: 'Key Operations Strategies', content: 'Content for Key Operations Strategies' },
    { title: 'Strategic Asset Management Plan', content: 'Content for Strategic Asset Management Plan' },
  ];

  return (
    <DashboardContainer>
      {items.map((item, index) => (
        <WidgetContainer key={index}>
          <WidgetTitle>{item.title}</WidgetTitle>
          <Box sx={{ width: '100%' }}>
            {item.content}
          </Box>
        </WidgetContainer>
      ))}
    </DashboardContainer>
  );
};

export default OsdPage;
