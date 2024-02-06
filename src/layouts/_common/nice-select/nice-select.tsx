// components/NiceSelect.tsx
import React, { useEffect } from "react";
import "jquery";
import "jquery-nice-select/css/nice-select.css";
import "jquery-nice-select/js/jquery.nice-select";

interface NiceSelectProps {
  onSelectChange: (label: string, value: string) => void;
}

const NiceSelect: React.FC<NiceSelectProps> = ({ onSelectChange }) => {
  useEffect(() => {
    const $select = $("select");
    $select.niceSelect();

    $select.on("change", (e) => {
      const selectedValue = $(e.target).val() as string;

      const fieldLabel = $(e.target).siblings(".type").text();

      onSelectChange(fieldLabel, selectedValue);
    });

    return () => {
      $select.niceSelect("destroy");
      $select.off("change");
    };
  }, [onSelectChange]);

  return null;
};

export default NiceSelect;
