// components/NiceSelect.tsx
import React, { useEffect } from "react";
import "jquery";
import "jquery-nice-select/css/nice-select.css";
import "jquery-nice-select/js/jquery.nice-select";

const NiceSelect: React.FC = () => {
  useEffect(() => {
    // Initialize Nice Select when the component mounts
    $("select").niceSelect();

    // Clean up Nice Select when the component unmounts
    return () => {
      $("select").niceSelect("destroy");
    };
  }, []);

  return null;
};

export default NiceSelect;
