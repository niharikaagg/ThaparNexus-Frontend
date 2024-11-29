// import React, { useEffect, useState } from "react";

// function Dropdown({ label, options = [], onChange, defaultValue }) {
//   const [selectedValue, setSelectedValue] = useState(defaultValue || "All");

//   // Update selectedValue whenever defaultValue changes
//   useEffect(() => {
//     setSelectedValue(defaultValue || "All");
//   }, [defaultValue]);

//   const handleChange = (e) => {
//     const newValue = e.target.value;
//     setSelectedValue(newValue); // Update the state with the selected value
//     onChange(newValue); // Notify the parent component of the new selection
//   };

//   return (
//     <div>
//       <label className="block text-gray-700 font-semibold mb-2">{label}</label>
//       <select
//         className="w-48 sm:w-52 p-2 border rounded"
//         onChange={handleChange}
//         value={selectedValue} // Bind select value to selectedValue state
//       >
//         <option value="All">All</option>
//         {options && options.length > 0 ? (
//           options.map((option, index) => (
//             <option key={index} value={option}>
//               {option}
//             </option>
//           ))
//         ) : (
//           <option disabled>No options available</option>
//         )}
//       </select>
//     </div>
//   );
// }

// export default Dropdown;

import React, { useEffect, useState } from "react";

function Dropdown({
  label,
  options = [],
  onChange,
  defaultValue,
  customWidth,
}) {
  const [selectedValue, setSelectedValue] = useState(defaultValue || "All");

  // Update selectedValue whenever defaultValue changes
  useEffect(() => {
    setSelectedValue(defaultValue || "All");
  }, [defaultValue]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setSelectedValue(newValue); // Update the state with the selected value
    onChange(newValue); // Notify the parent component of the new selection
  };

  return (
    <div className={`flex flex-col ${customWidth || "w-40"} text-gray-800`}>
      <label className="text-sm font-medium mb-1">{label}</label>
      <select
        className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring focus:border-blue-400"
        onChange={handleChange}
        value={selectedValue} // Bind select value to selectedValue state
      >
        <option value="All">All</option>
        {options && options.length > 0 ? (
          options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))
        ) : (
          <option disabled>No options available</option>
        )}
      </select>
    </div>
  );
}

export default Dropdown;
