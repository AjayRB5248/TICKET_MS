import React, { useState } from "react";
import { useEventsContext } from "src/context/EventsContextProvider";
import { EVENT_CATEGORIES } from "src/sections/tour/utils";
import EventsService from "src/services/events";

const categories = EVENT_CATEGORIES.map((eachEventCategory: any) => eachEventCategory);

const WidgetCheckbox: React.FC = () => {
  const { setEvents, setFilters } = useEventsContext();
  const [checkedCategories, setCheckedCategories] = useState<string[]>([]);

  const handleCheckboxChange = async (category: string) => {
    if (checkedCategories.includes(category)) {
      setCheckedCategories(checkedCategories.filter((c) => c !== category));
    } else {
      setCheckedCategories([...checkedCategories, category]);
    }

    console.log(category, checkedCategories, "category -- checkedCategories");

    const queryData = {
      eventName: "",
      city: "",
      eventDate: "",
      venueName: "",
      category,
    };
    setFilters(queryData);
    
    const events = await EventsService.list(queryData)
      .then((res) => res.data?.events)
      .catch((err) => {
        console.log(err, "err===");
      });

    setEvents(events);
  };

  return (
    <div className="widget-1 widget-check">
      <div className="widget-header">
        <h5 className="m-title">Filter By</h5>{" "}
        <a href="#0" className="clear-check">
          Clear All
        </a>
      </div>
      <div className="widget-1-body">
        <h6 className="subtitle">categories</h6>
        <div className="check-area">
          {categories.map((eachCategory, index) => (
            <div className="form-group" key={index}>
              <input
                type="checkbox"
                name="lang"
                id={eachCategory.value}
                checked={checkedCategories.includes(eachCategory.value)}
                onChange={() => handleCheckboxChange(eachCategory.value)}
              />
              <label htmlFor={eachCategory.value}>{eachCategory.label}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WidgetCheckbox;
