
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    if (query) {
      navigate(`/search?query=${query}`);
    }
  };

  return (
    <div className="bg-gray-500 flex justify-between items-center p-4">
      <div className="text-lg font-bold text-white ml-4">MovieDb</div>
      <div className="flex space-x-4 mr-4">
        <Link to='/' className='text-white'>Popular</Link>
        <Link to='/TopRated' className='text-white'>Top Rated</Link>
        <Link to='/Upcoming' className='text-white'>Upcoming</Link>
        <input 
          type="text" 
          placeholder="Movie Name" 
          className="px-2 py-1 rounded-md"
          value={query}
          onChange={handleInputChange}
        />
        <button 
          className="bg-gray-600 text-white px-3 py-1 rounded-md"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default Navbar;
