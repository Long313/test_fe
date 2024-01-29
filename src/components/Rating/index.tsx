import React from 'react';
import { FaStar } from 'react-icons/fa';

interface RatingProps {
  value: number;
  max: number;
}

const Rating: React.FC<RatingProps> = ({ value, max }) => {
  const stars = Array.from({ length: max }, (_, index) => (
    <FaStar key={index} color={index < value ? 'gold' : 'gray'} />
  ));

  return <div>{stars}</div>;
};

export default Rating;