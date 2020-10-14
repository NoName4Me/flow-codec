import React from 'react';

const Radiobox = ({
  label,
  value,
  options,
  onChange
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };
  return (
    <div className="NodeConfigProp">
      {label}
      {options.map((item) => (
        <label key={item}>
          <input
            name={label}
            value={item}
            checked={value === item}
            onChange={handleChange}
            type="radio"
          />
          {item}
        </label>
      ))}
    </div>
  );
};

export default Radiobox;