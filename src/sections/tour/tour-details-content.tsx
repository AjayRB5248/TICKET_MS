import { m } from 'framer-motion';
// @mui
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
// utils
import { fDate } from 'src/utils/format-time';
// _mock
import { TOUR_SERVICE_OPTIONS } from 'src/_mock';
// types
import { ITourItem } from 'src/types/tour';
// components
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import Markdown from 'src/components/markdown';
import { varTranHover } from 'src/components/animate';
import Lightbox, { useLightBox } from 'src/components/lightbox';
import { Paper } from '@mui/material';

// ----------------------------------------------------------------------

type Props = {
  tour: ITourItem;
};

export default function TourDetailsContent({ tour }: Props) {
  const {
    name,
    images,
    content,
    services,
    tourGuides,
    available,
    durations,
    destination,
    ratingNumber,
  } = tour;

  const slides = images.map((slide) => ({
    src: slide,
  }));
  const eventDetails = {
    eventName: "Sacar In Australia",
    eventDescription: "<p>Sacar is coming</p>",
    eventStatus: "Planned",
    artists: [
      {
        name: "Sacar",
        genre: "Rap"
      }
    ],
    venues: [
      {
        venueName: "Opera House",
        city: "Sydney",
        timeZone: "Australia/Sydney",
        dateOfEvent: "2024-01-30T18:32:01.650Z"
      },
      {
        venueName: " Victoria Pavilion",
        city: "Melbourne",
        timeZone: "Australia/Melbourne",
        dateOfEvent: "2024-02-21T18:32:50.000Z"
      },
      {
        venueName: "Rangasala",
        city: "Perth",
        timeZone: "Australia/Melbourne",
        dateOfEvent: "2024-02-21T18:32:50.000Z"
      },
      {
        venueName: "TU Ground",
        city: "Melbourne",
        timeZone: "Australia/Melbourne",
        dateOfEvent: "2024-02-21T18:32:50.000Z"
      }
    ],
    
    ticketSettings: [
      {
        venueName: "Opera House",
        type: "Vip",
        price: 150,
        totalSeats: 242
      },
      {
        venueName: "Opera House",
        type: "Gold",
        price: 100,
        totalSeats: 300
      },
      {
        venueName: "Rangasala",
        type: "Standard",
        price: 201,
        totalSeats: 298
      },
      {
        venueName: "TU Ground",
        type: "Standard",
        price: 201,
        totalSeats: 298
      },
      {
        venueName: " Victoria Pavilion",
        type: "Standard",
        price: 201,
        totalSeats: 298
      }

    ]
  };

  const {
    selected: selectedImage,
    open: openLightbox,
    onOpen: handleOpenLightbox,
    onClose: handleCloseLightbox,
  } = useLightBox(slides);

  const renderGallery = (
    <>
      <Box
        gap={1}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
        }}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        <m.div
          key={slides[0].src}
          whileHover="hover"
          variants={{
            hover: { opacity: 0.8 },
          }}
          transition={varTranHover()}
        >
          <Image
            alt={slides[0].src}
            src={slides[0].src}
            ratio="1/1"
            onClick={() => handleOpenLightbox(slides[0].src)}
            sx={{ borderRadius: 2, cursor: 'pointer' }}
          />
        </m.div>

        <Box gap={1} display="grid" gridTemplateColumns="repeat(2, 1fr)">
          {slides.slice(1, 5).map((slide) => (
            <m.div
              key={slide.src}
              whileHover="hover"
              variants={{
                hover: { opacity: 0.8 },
              }}
              transition={varTranHover()}
            >
              <Image
                alt={slide.src}
                src={slide.src}
                ratio="1/1"
                onClick={() => handleOpenLightbox(slide.src)}
                sx={{ borderRadius: 2, cursor: 'pointer' }}
              />
            </m.div>
          ))}
        </Box>
      </Box>

      <Lightbox
        index={selectedImage}
        slides={slides}
        open={openLightbox}
        close={handleCloseLightbox}
      />
    </>
  );

  const renderHead = (
    <>
      <Stack direction="row" sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          Sacar Australia Tour - 2024
        </Typography>
      </Stack>

      <Stack spacing={3} direction="row" flexWrap="wrap" alignItems="center">
        <Stack direction="row" alignItems="center" spacing={0.5} sx={{ typography: 'body2' }}>
          <Iconify icon="mingcute:location-fill" sx={{ color: 'error.main' }} />
          Australia
        </Stack>
      <Stack direction="row" alignItems="center" spacing={0.5} sx={{ typography: 'body2' }}>
        <Iconify icon={eventDetails?.eventStatus === 'Planned' ? "ic:baseline-event-available" : "ic:baseline-event-busy"} />
        {eventDetails?.eventStatus}
      </Stack>
      </Stack>

      <Stack direction="row" sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
         
        </Typography>
      </Stack>
    </>
  );

  

  function renderEventVenueDetails() {
    const combinedDetails = eventDetails.venues.map(venue => {
      const eventDateTime = new Date(venue.dateOfEvent);
      const ticketsForVenue = eventDetails.ticketSettings.filter(ticket => ticket.venueName === venue.venueName);
  
      return {
        venueName: venue.venueName,
        city: venue.city,
        date: eventDateTime.toLocaleDateString(),
        time: eventDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        tickets: ticketsForVenue,
        icon: <Iconify icon="solar:calendar-date-bold" />,
      };
    });
  
    return (
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Event Venues and Tickets
        </Typography>
        <Box
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
          }}
          gap={3}
        >
          {combinedDetails.map((venue, index) => (
            <Paper key={index} elevation={3} sx={{ p: 2, borderRadius: 2 }}>
              <Stack spacing={2}>
                <Stack direction="row" spacing={2} alignItems="center">
                  {venue.icon}
                  <Typography variant="subtitle1">{venue.venueName}</Typography>
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  City: {venue.city}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Date: {venue.date}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Time: {venue.time}
                </Typography>
                <Box>
                  {venue.tickets.map((ticket, idx) => (
                    <Box key={idx} p={1} mt={1} border={1} borderColor="grey.300" borderRadius={1}>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Iconify icon="ant-design:ticket-outlined" />
                        <Typography variant="body2">
                          {ticket.type} - Price: ${ticket.price}, Seats: {ticket.totalSeats}
                        </Typography>
                      </Stack>
                    </Box>
                  ))}
                </Box>
              </Stack>
            </Paper>
          ))}
        </Box>
      </Box>
    );
  }


  return (
    <>
      {renderGallery}

      <Stack sx={{ maxWidth: 720, mx: 'auto' }}>
        {renderHead}

        <Divider sx={{ borderStyle: 'dashed', my: 5 }} />

        {renderEventVenueDetails()}

        <Divider sx={{ borderStyle: 'dashed', my: 5 }} />

        <Markdown children={content} />

      </Stack>
    </>
  );
}
