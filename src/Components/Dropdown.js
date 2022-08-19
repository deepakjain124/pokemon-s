import React, { useState } from "react";

const Dropdown = ({ elem }) => {
  console.log(elem, "basestats");
  const [visible, setvisible] = useState(false);

  return (
    <>
      <div className="dropdown_data">
        <h4 onClick={() => setvisible(!visible)} className="Base_stats">
          {elem.stat.name}
        </h4>
        <p>Base Stat:-{elem.base_stat}</p>
        <p>Effort:-{elem.effort}</p>
      </div>
    </>
  );
};

export default Dropdown;
