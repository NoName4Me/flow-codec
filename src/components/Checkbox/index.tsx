import React from 'react';

const Checkbox = ({
  label,
  value,
  onChange
}: {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };
  return (
    <label className="NodeConfigProp">
      {label}
      <input type="checkbox" checked={value} onChange={handleChange} />
    </label>
  );
};

export default Checkbox;