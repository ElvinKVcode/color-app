import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const HomePage = () => {
  const location = useLocation();
  const { colors, groupName } = location.state || { colors: [], groupName: '' };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900">
      <h1 className="text-5xl font-bold mb-4 mt-2 text-gray-50">Əsas Səhifə</h1>
      <Link to="/settings">
        <button className="px-48 py-2 bg-red-700 text-white rounded mt-5">Yeni rəng qutunuzu əlavə edin</button>
      </Link>
      {groupName && (
        <div className="mt-10">
          <h2 className="text-3xl font-bold mb-4 text-gray-50">{groupName}</h2>
          <div className="flex flex-wrap">
            {colors.map((color, index) => (
              <div key={index} className="p-4 m-2 rounded text-gray-100" style={{ backgroundColor: color.code }}>
                {color.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
