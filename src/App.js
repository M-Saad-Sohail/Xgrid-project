import React, { useState, useEffect } from 'react';

function TableComponent() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const filteredData = data.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };
  const themeClass = isDarkMode ? 'bg-black text-white' : 'bg-white text-gray-800';
  const tableBgClass = isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800';

  return (
    <div className={`w-full h-[100vh] p-10 ${themeClass}`}>
      <button
        onClick={toggleTheme}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Toggle Theme
      </button>
      <h2 className="text-2xl font-bold mb-4">User List</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div className="overflow-x-auto">
        <table className={`min-w-full divide-y divide-gray-200 ${tableBgClass}`}>
          <thead className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-400'} `}>
          <tr>
              <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider">ID</th>
              <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
              <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
              <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider">Phone</th>
              <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider">Address</th>
              <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider">Website</th>
              <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider">Company</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map(item => (
              <tr key={item.id}>
                <td className="px-3 py-2 text-xs whitespace-nowrap">{item.id}</td>
                <td className="px-3 py-2 text-xs whitespace-nowrap">{item.name}</td>
                <td className="px-3 py-2 text-xs whitespace-nowrap">{item.email}</td>
                <td className="px-3 py-2 text-xs whitespace-nowrap">{item.phone}</td>
                <td className="px-3 py-2 text-xs whitespace-nowrap">{item.address.street}</td>
                <td className="px-3 py-2 text-xs whitespace-nowrap">{item.website}</td>
                <td className="px-3 py-2 text-xs whitespace-nowrap">{item.company.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableComponent;
