import React from 'react';
import styled from 'styled-components';

const StyledMissionIcon = styled('svg')`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`;

const MissionIcon = ({ size = 36 }) => {
  return (
<StyledMissionIcon width="36" height="36" viewBox="0 0 82 74" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.241 72.9989C6.53067 73.5032 3.13227 72.2723 1.60925 67.9926C0.139332 63.8622 1.324 60.4523 4.28051 57.0997C14.671 45.3175 24.856 33.3519 34.9631 21.325C36.1347 19.9309 36.6482 17.7602 36.9014 15.8736C37.2306 13.4209 36.9946 10.8923 37.0003 8.39632C37.0175 0.909637 39.6238 -1.09598 46.6872 1.48131C50.1939 2.76086 53.4142 4.82566 58.1038 7.21894C54.305 9.14672 51.6649 10.6384 48.9028 11.8527C44.7057 13.6979 43.4686 17.392 46.354 20.7688C56.8853 33.0936 67.4466 45.3948 78.1603 57.5606C81.0276 60.8166 81.7378 64.2187 80.3325 68.0916C78.8724 72.1153 75.7346 73.1003 71.6104 73.0681C51.6437 72.9121 31.6751 72.9988 11.241 72.9989ZM44.0174 43.5252C45.6746 45.0344 47.3319 46.5437 49.3425 48.3747C50.7818 46.2381 51.8558 44.6439 53.0941 42.8056C49.0646 38.0438 45.197 33.4734 41.0256 28.544C37.8555 32.2088 35.1944 35.2851 32.3721 38.5479C33.7986 40.4208 35.145 42.1886 36.4915 43.9564C36.6826 43.4356 36.8737 42.9147 37.0648 42.3938C39.2183 42.6075 41.3718 42.8211 44.0174 43.5252Z" fill="#4B384C"/>
</StyledMissionIcon>
);
};

export default MissionIcon;

1
