import React, { ChangeEvent } from "react";
import Image, { StaticImageData } from "next/image";
import withNiceSelect from "src/layouts/_common/nice-select/withNiceSelect";

interface SelectFieldProps {
  imageSrc: StaticImageData;
  altText: string;
  label: string;
  options: { value: string; label: string }[];
  onSelectChange: (value: string) => void;
}

const SelectField: React.FC<SelectFieldProps> = ({ imageSrc, altText, label, options, onSelectChange }) => {
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onSelectChange(e.target.value);
  };

  return (
    <div className="form-group">
      <div className="thumb">
        <Image src={imageSrc} alt={altText} />
      </div>
      <span className="type">{label}</span>
      <select className="select-bar" onChange={handleSelectChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default withNiceSelect(SelectField);
