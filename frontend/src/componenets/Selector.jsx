import React, { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";

const Selector = ({ onSelect, label, opt, placeholder }) => {
  const [districts, setDistricts] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Define a function to fetch the districts
    const fetchDistricts = async () => {
      try {
        // Make a GET request to your API endpoint
        const response = await fetch(`http://localhost:3000/api/get/${opt}`);

        // Check if the response is successful
        if (!response.ok) {
          throw new Error('Failed to fetch districts');
        }

        // Parse the response body as JSON
        const data = await response.json();

        // Set the districts state with the data from the response
        setDistricts(data);
      } catch (error) {
        console.error('Error fetching districts:', error);
      }
    };

    // Call the fetchDistricts function
    fetchDistricts();
  }, []);

  const handleSelectDistrict = (district) => {
    setSelected(district);
    setOpen(false);
    setInputValue("");
    // Pass the selected district to the onSelect callback
    onSelect(district);
  };

  
  return (
    <div className="max-w-[400px] w-full font-medium ">
      <label htmlFor="" className="pl-4 text-sm text-textColor font-[550]">{label}</label>
      <div
        onClick={() => setOpen(!open)}
        className={` w-full p-[15px] flex items-center justify-between rounded cursor-pointer  ${
          !selected && "text-gray-700"
        }`}
      >
        {selected
          ? selected?.length > 25
            ? selected?.substring(0, 25) + "..."
            : selected
          : `Select ${placeholder}`}
        <BiChevronDown size={20} className={`${open && "rotate-180"}`} />
      </div>
      <ul
        className={`bg-white mt-2 overflow-y-auto absolute w-full rounded-md ${
          open ? "max-h-60" : "max-h-0"
        } `}
      >
        <div className="flex items-center px-2 sticky top-0 bg-white">
          <AiOutlineSearch size={18} className="text-gray-700" />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toLowerCase())}
            placeholder="Enter City name"
            className="placeholder:text-gray-700 p-2 outline-none"
          />
        </div>
        {districts?.map((district, index) => (
          <li
            key={index}
            className={`p-2 text-sm hover:bg-sky-400 hover:text-white cursor-pointer
            ${
              district?.toLowerCase() === selected?.toLowerCase() &&
              "bg-sky-600 text-white"
            }
            ${
              district?.toLowerCase().startsWith(inputValue)
                ? "block"
                : "hidden"
            }`}
            onClick={() => { handleSelectDistrict(district)}}> 
            {district}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Selector;
