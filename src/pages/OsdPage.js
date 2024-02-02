import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import theme from '../theme';
import { supabase } from '../components/supabase';

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

const convertToBulletPoints = (content) => {
  const points = content.split('\n\n').join('\n').split('\n');
  const nonEmptyPoints = points.filter((point) => point.trim() !== '');

  // Remove trailing \n or more than one consecutive \n
  const sanitizedPoints = nonEmptyPoints.map((point) => point.replace(/\n+$/, ''));

  return sanitizedPoints.map((point, index) => (
    <li key={index}>{point}</li>
  ));
};

const OsdPage = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch data from Supabase
    const fetchData = async () => {
      const { data, error } = await supabase.from('items').select('*');
      if (error) {
        console.error('Error fetching data:', error.message);
      } else {
        setItems(data);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs once on mount

  return (
    <DashboardContainer>
      {items.map((item, index) => (
        <WidgetContainer key={index}>
          <WidgetTitle>{item.title}</WidgetTitle>
          <Box sx={{ width: '100%' }}>
            <ul>{convertToBulletPoints(item.content)}</ul>
          </Box>
        </WidgetContainer>
      ))}
    </DashboardContainer>
  );
};

export default OsdPage;
