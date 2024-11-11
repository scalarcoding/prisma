import React, { useState } from 'react';

const InputWithPrefix: React.FC = () => {
  const [value, setValue] = useState('');

  const prefix = "1 : ";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    // Ensure the prefix stays at the beginning
    if (!newValue.startsWith(prefix)) {
      setValue(prefix + newValue.replace(prefix, ''));
    } else {
      setValue(newValue);
    }
  };

  return (
    <div className="relative w-full max-w-xs">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        className="pl-8 pr-2 py-2 border border-gray-300 rounded"
        placeholder="Enter your number..." // Optional placeholder
      />
      <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500">
        {prefix}
      </span>
    </div>
  );
};

export default InputWithPrefix;
