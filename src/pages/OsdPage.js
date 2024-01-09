import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import theme from '../theme';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://eyxirpucxpgzloxoqtjj.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5eGlycHVjeHBnemxveG9xdGpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ4Mzg3NDUsImV4cCI6MjAyMDQxNDc0NX0.dRupM9AJsqal6KLOML7E5kMfjrMEfR16_pwughoNZls');

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
            {item.content}
          </Box>
        </WidgetContainer>
      ))}
    </DashboardContainer>
  );
};

export default OsdPage;
