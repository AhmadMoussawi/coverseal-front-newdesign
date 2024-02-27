
import React from 'react';

interface CustomDivProps extends React.HTMLAttributes<HTMLDivElement> {
  sx?: any; // You can refine this type based on your needs
}

const CustomDiv: React.FC<CustomDivProps> = ({ sx, ...rest }) => {
  return <div {...rest} style={sx}>{/* Your content goes here */}</div>;
};

export default CustomDiv;