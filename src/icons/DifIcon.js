import React from 'react';
import styled from 'styled-components';

const StyledDifIcon = styled('svg')`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`;

const DifIcon = ({ size = 36 }) => {
  return (
<StyledDifIcon width={size} height={size} viewBox="0 0 219 227" fill="none" xmlns="http://www.w3.org/2000/svg">
<mask id="mask0_155_105" maskUnits="userSpaceOnUse" x="0" y="0" width="219" height="227">
<path d="M0 -2.71797e-05H218.667V226.667H0V-2.71797e-05Z" fill="white"/>
</mask>
<g mask="url(#mask0_155_105)">
<path d="M113.98 50.2646C133.127 50.2646 148.303 55.1179 159.53 64.7939L109.168 14.4326L73.3363 50.2646H113.98Z" fill="#473554"/>
<path d="M112.565 72.5142H90.3141V161.517H112.565C125.239 161.517 134.781 157.709 141.186 150.089C147.59 142.47 150.795 131.446 150.795 117.016C150.795 102.588 147.59 91.5635 141.186 83.9435C134.781 76.3262 125.239 72.5142 112.565 72.5142Z" fill="#473554"/>
<path d="M169.839 157.083L210.829 116.094L165.081 70.3446C174.83 81.6886 179.721 97.2393 179.721 117.015C179.721 133.163 176.421 146.514 169.839 157.083Z" fill="#473554"/>
<path d="M113.98 183.767H75.1803L109.168 217.755L152.788 174.134C142.463 180.554 129.53 183.767 113.98 183.767Z" fill="#473554"/>
<path d="M62.4003 61.2004L7.50696 116.094L62.4003 170.987V61.2004Z" fill="#473554"/>
</g>
</StyledDifIcon>

);
};

export default DifIcon;
