import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SettingPage = () => {
  const [colorName, setColorName] = useState('');
  const [colorCode, setColorCode] = useState('');
  const [groupName, setGroupName] = useState('');
  const [colors, setColors] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateColorCode = (code) => /^#([0-9A-F]{3}){1,2}$/i.test(code);

  const addColor = () => {
    const newErrors = {};
    if (!colorName) newErrors.colorName = true;
    if (!colorCode || !validateColorCode(colorCode)) newErrors.colorCode = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (colorName && colorCode && colors.length < 6) {
      setColors([...colors, { name: colorName, code: colorCode }]);
      setColorName('');
      setColorCode('');
      setErrors({});
    }
  };

  const saveColors = (e) => {
    e.preventDefault();
    if (colors.length === 6 && groupName) {
      navigate('/', { state: { colors, groupName } });
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-gray-50">
      <h1 className="text-5xl font-bold mb-4 mt-2 text-gray-50">Tənzimləmə Səhifəsi</h1>
      <p className="text-lg mb-10">Burada siz 6 rəng adı və kodu seçib onları saxlamaqla öz rəng qruplarınızı yarada bilərsiniz.</p>
      <form onSubmit={saveColors} className="flex flex-col items-center w-full max-w-md">
        <input
          type="text"
          placeholder="Rəng adı"
          value={colorName}
          onChange={(e) => setColorName(e.target.value)}
          className={`p-2 w-full border ${errors.colorName ? 'border-red-500' : 'border-gray-300'} rounded text-black placeholder-black mb-4`}
        />
        <input
          type="text"
          placeholder="Rəng kodu"
          value={colorCode}
          onChange={(e) => setColorCode(e.target.value)}
          className={`p-2 w-full border ${errors.colorCode ? 'border-red-500' : 'border-gray-300'} rounded text-black placeholder-black mb-4`}
        />
        {errors.colorCode && <p className="text-red-500 mb-4">Düzgün rəng kodu daxil edin!!! (məsələn: #FFF və ya #ff4500)</p>}
        <button
          type="button"
          onClick={addColor}
          className={`px-4 py-2 mb-4 rounded text-white ${colors.length >= 6 || !colorName || !colorCode ? 'bg-green-400 cursor-not-allowed' : 'bg-green-500'}`}
          disabled={colors.length >= 6 || !colorName || !colorCode}
        >
          Rəng əlavə et
        </button>
        <input
          type="text"
          placeholder="Rənglərin Grup Adı"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className={`p-2 w-full border ${!groupName ? 'border-red-500' : 'border-gray-300'} rounded text-black placeholder-black mb-1`}
        />
        <button
          type="submit"
          className={`mt-5 w-full rounded-md h-10 text-slate-50 ${colors.length === 6 && groupName ? 'bg-green-900 hover:bg-green-700 cursor-pointer' : 'bg-green-700 cursor-not-allowed'}`}
          disabled={colors.length < 6 || !groupName}
        >
          Yadda saxla
        </button>
      </form>
      <div className="mt-12 w-full flex flex-wrap justify-center">
        {colors.map((color, index) => (
          <div key={index} className="p-2 m-1 rounded text-white" style={{ backgroundColor: color.code }}>
            {color.name}
          </div>
        ))}
      </div>
      <Link to="/" className="self-auto mt-8">
        <button className="px-4 py-2 bg-red-700 text-white rounded font-bold">İlk səhifəyə qayıt</button>
      </Link>
    </div>
  );
};

export default SettingPage;
