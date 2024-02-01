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
// types
import { ITourItem } from 'src/types/tour';
// components
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import Markdown from 'src/components/markdown';
import { varTranHover } from 'src/components/animate';
import Lightbox, { useLightBox } from 'src/components/lightbox';
import { Paper } from '@mui/material';


type Props = {
  event: any;
};

export default function TourDetailsContent({ event }: Props) {
  const {
    _id,
    eventName,
    eventDescription,
    status,
    ticketTypes,
    artists,
    venues,
    eventImages,
    slug,
    createdAt,
    available,
  } = event;

  const slides = eventImages?.map((slide:any) => ({
    src: slide,
  }));

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
          key={slides?.[0].src}
          whileHover="hover"
          variants={{
            hover: { opacity: 0.8 },
          }}
          transition={varTranHover()}
        >
          <Image
            alt={slides?.[0]?.src}
            src={slides?.[0]?.src}
            ratio="1/1"
            onClick={() => handleOpenLightbox(slides?.[0].src)}
            sx={{ borderRadius: 2, cursor: 'pointer' }}
          />
        </m.div>

        <Box gap={1} display="grid" gridTemplateColumns="repeat(2, 1fr)">
          {slides?.slice(1, 5).map((slide:any) => (
            <m.div
              key={slide?.src}
              whileHover="hover"
              variants={{
                hover: { opacity: 0.8 },
              }}
              transition={varTranHover()}
            >
              <Image
                alt={slide?.src}
                src={slide?.src}
                ratio="1/1"
                onClick={() => handleOpenLightbox(slide?.src)}
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
          {eventName}
        </Typography>
      </Stack>

      <Stack spacing={3} direction="row" flexWrap="wrap" alignItems="center">
        <Stack direction="row" alignItems="center" spacing={0.5} sx={{ typography: 'body2' }}>
          <Iconify icon="mingcute:location-fill" sx={{ color: 'error.main' }} />
          Australia
        </Stack>
      <Stack direction="row" alignItems="center" spacing={0.5} sx={{ typography: 'body2' }}>
        <Iconify icon={status === 'Planned' ? "ic:baseline-event-available" : "ic:baseline-event-busy"} />
        {status}
      </Stack>
      </Stack>

      <Stack direction="row" sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
         
        </Typography>
      </Stack>
    </>
  );

  

  function renderEventVenueDetails() {
    const combinedDetails = venues?.map((venue:any) => {
      const eventDateTime = new Date(venue.dateOfEvent);
      const ticketsForVenue = ticketTypes?.filter((ticket:any) => ticket.venueName === venue.venueName);
  
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
          {combinedDetails.map((venue:any, index:any) => (
            <Paper key={index} elevation={3} sx={{ p: 2, borderRadius: 2 }}>
              <Stack spacing={2}>
                <Stack direction="row" spacing={2} alignItems="center">
                  {venue.icon}
                  <Typography variant="subtitle1">{venue?.venueName}</Typography>
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
                  {venue.tickets.map((ticket:any, idx:any) => (
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

        <Markdown children={eventDescription} />

      </Stack>
    </>
  );
}
