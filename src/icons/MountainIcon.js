import React from 'react';
import styled from 'styled-components';

const StyledMountainIcon = styled('svg')`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`;

const MountainIcon = ({ size = 36 }) => {
  return (
<StyledMountainIcon xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"><g fill="none" stroke="#4b384c" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="m8 3l4 8l5-5l5 15H2z"/><path d="M4.14 15.08c2.62-1.57 5.24-1.43 7.86.42c2.74 1.94 5.49 2 8.23.19"/></g></StyledMountainIcon>  );
};

export default MountainIcon;
