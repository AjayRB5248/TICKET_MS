import Image from "next/image";
import CityImg from "src/assets/frontend/images/ticket/city.png";
import DateImg from "src/assets/frontend/images/ticket/date.png";
import CinemaImg from "src/assets/frontend/images/ticket/cinema.png";
import TicketSearchBg from "src/assets/frontend/images/event3.jpg";
import withNiceSelect from "src/layouts/_common/nice-select/withNiceSelect";
import { SelectField } from "src/components/select-field";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useFetchEvents } from "src/api/events";
import { useEventsContext } from "src/context/EventsContextProvider";
import EventsService from "src/services/events";
import { EVENT_CATEGORIES } from "../tour/utils";
import MovieTicket from "src/assets/frontend/images/ticket/ticket-tab01.png";

interface Filters {
  eventName: string;
  city: string;
  eventDate: string;
  venueName: string;
  category: string;
}

const ticketTabItems = [
  {
    label: "All",
    value: "all",
    isFeatured: true,
    img: MovieTicket,
  },
  ...EVENT_CATEGORIES.filter((eachEventCategory) => eachEventCategory.isFeatured),
];

const selectFields = [
  {
    label: "city",
    imageSrc: CityImg,
    altText: "City",
    options: [
      { value: "all", label: "All" },
      { value: "Sydney", label: "Sydney" },
      { value: "Melbourne", label: "Melbourne" },
      { value: "Brisbane", label: "Brisbane" },
      { value: "Perth", label: "Perth" },
      { value: "Adelaide", label: "Adelaide" },
      { value: "Gold Coast", label: "Gold Coast" },
      { value: "Canberra", label: "Canberra" },
      { value: "Newcastle", label: "Newcastle" },
      { value: "Hobart", label: "Hobart" },
      { value: "Darwin", label: "Darwin" },
      { value: "Cairns", label: "Cairns" },
      { value: "Townsville", label: "Townsville" },
      { value: "Wollongong", label: "Wollongong" },
      { value: "Geelong", label: "Geelong" },
      { value: "Ballarat", label: "Ballarat" },
      { value: "Toowoomba", label: "Toowoomba" },
      { value: "Sunshine coast", label: "Sunshine Coast" },
      { value: "Mackay", label: "Mackay" },
      { value: "Rockhampton", label: "Rockhampton" },
      { value: "Bendigo", label: "Bendigo" },
    ],
  },
  {
    label: "date",
    imageSrc: DateImg,
    altText: "Date",
    options: [],
  },
  {
    label: "Location",
    imageSrc: CinemaImg,
    altText: "Location",
    options: [
      { value: "all", label: "All" },
      { value: "Opera House", label: "Opera House" },
      { value: "Enmore Theatre", label: "Enmore Theatre" },
      { value: "City Recital Hall", label: "City Recital Hall" },
      // Add more location options here
    ],
  },
];

const TicketSearch = () => {
  const { events, filters, setFilters, setEvents } = useEventsContext();

  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>(ticketTabItems[0].value);

  const handleSelectChange = (field: string, value: string) => {
    if (field === "city") {
      setSelectedCity(value === "all" ? "" : value);
    } else if (field === "date") {
      setSelectedDate(value);
    } else if (field === "Location") {
      setSelectedLocation(value === "all" ? "" : value);
    }
  };

  const handleSearchTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const callFilterEventsAPI = async () => {
    const queryData: Filters = {
      eventName: searchText,
      city: selectedCity,
      eventDate: selectedDate,
      venueName: selectedLocation,
      category: activeTab,
    };

    setFilters(queryData);

    // API call with the queryData above and setEvent
    const events = await EventsService.list(queryData)
      .then((res) => res.data?.events)
      .catch((err) => {
        console.log(err, "err===");
      });
    console.log(events, "events====");
    setEvents(events);
  };

  const handleSearchButtonClick = (e: FormEvent) => {
    e.preventDefault();
    callFilterEventsAPI();
  };

  useEffect(() => {
    callFilterEventsAPI();
  }, [selectedCity, selectedDate, selectedLocation, activeTab]);

  return (
    <section className="search-ticket-section padding-top pt-lg-0">
      <div className="container">
        <div className="search-tab bg_img" style={{ backgroundImage: `url(${TicketSearchBg.src})` }}>
          <div className="row align-items-center mb--20">
            <div className="col-lg-6 mb-20">
              <div className="search-ticket-header">
                <h6 className="category">welcome to Hulya Events</h6>
                <h3 className="title">what are you looking for</h3>
              </div>
            </div>
            <div className="col-lg-6 mb-20">
              <ul className="tab-menu ticket-tab-menu">
                {ticketTabItems.map((item, index) => (
                  <li
                    className={activeTab === item.value ? "active" : ""}
                    key={index}
                    onClick={() => setActiveTab(item.value)}
                  >
                    {item.img && (
                      <div className="tab-thumb">
                        <Image src={item.img} alt="ticket" />
                      </div>
                    )}
                    <span>{item?.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="tab-area">
            <div className="tab-item active">
              <form className="ticket-search-form">
                <div className="form-group large">
                  <input
                    type="text"
                    placeholder="Search for Events"
                    value={searchText}
                    onChange={handleSearchTextChange}
                  />
                  <button type="submit" onClick={handleSearchButtonClick}>
                    <i className="fas fa-search"></i>
                  </button>
                </div>
                {selectFields.map((field, index) => (
                  <SelectField
                    key={index}
                    imageSrc={field.imageSrc}
                    altText={field.altText}
                    label={field.label}
                    options={field.options}
                    onSelectChange={(label: string, value: string) => handleSelectChange(label, value)}
                  />
                ))}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default withNiceSelect(TicketSearch);
