import React from 'react';

const SideB = ({ cardStatus }) => (
  <div className="back">
    <img src={cardStatus.picture} width="100" height="100" />
  </div>
);

export default SideB;
