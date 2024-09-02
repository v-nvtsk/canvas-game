import { useState } from "react";

interface RangeInputProps {
  labelName: string;
  onChange: (value: number) => void;
}

export function RangeInput({ labelName, onChange }: RangeInputProps) {
  const [value, setValue] = useState(1);

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
    onChange(Number(e.target.value));
  };

  return (
    <div>
      <label htmlFor={`${labelName}-range-input`}>
        {labelName}: {value}
      </label>
      <br />
      <input name={`${labelName}-range-input`} type="range" min="1" max="10" value={value} onChange={onValueChange} />
    </div>
  );
}
