import { m } from "framer-motion";
// @mui
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
// utils
import { fDate } from "src/utils/format-time";
// _mock
// types
// components
import Image from "src/components/image";
import Iconify from "src/components/iconify";
import Markdown from "src/components/markdown";
import Lightbox, { useLightBox } from "src/components/lightbox";
import { Chip, Paper } from "@mui/material";
import { SplashScreen } from "src/components/loading-screen";
import CarouselThumbnail from "../_examples/extra/carousel-view/carousel-thumbnail";

type Props = {
  event: any;
  isLoading: boolean;
};

export default function TourDetailsContent({ event, isLoading }: Props) {
  const {
    _id,
    eventName,
    eventCategory,
    eventDescription,
    status,
    ticketTypes,
    artists,
    tags,
    venues,
    eventImages,
    slug,
    createdAt,
    available,
  } = event;

  const carouselData = eventImages?.map((image:any) => ({
    id: image._id,
    title: "",
    coverUrl: image.imageurl,
  }));

  const renderGallery = (
    <>
      {isLoading ? <SplashScreen /> : <CarouselThumbnail data={carouselData} />}
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
        <Stack
          direction="row"
          alignItems="center"
          spacing={0.5}
          sx={{ typography: "body2" }}
        >
          <Iconify icon="mingcute:location-fill" sx={{ color: "error.main" }} />
          Australia
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          spacing={0.5}
          sx={{ typography: "body2" }}
        >
          <Iconify
            icon={
              status === "PLANNED"
                ? "ic:baseline-event-available"
                : status === "ONGOING"
                ? "ic:baseline-event-available"
                : "ic:baseline-event-busy"
            }
            sx={{
              color:
                status === "ONGOING"
                  ? "yellow"
                  : status === "PLANNED"
                  ? "green"
                  : "red",
            }}
          />
          {status}
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          spacing={0.5}
          sx={{ typography: "body2" }}
        >
          <Iconify icon={"tabler:category"} />
          {eventCategory ? eventCategory : "Event"}
        </Stack>
      </Stack>

{  artists?.length > 0 &&  <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Featured Artists
        </Typography>
        <Stack direction="row" spacing={2} sx={{ overflowX: "auto" }}>
          {artists?.map((artist:any, index:string) => (
            <Paper key={index} elevation={3} sx={{ p: 2, borderRadius: 2 }}>
              <Stack spacing={2} alignItems="center">
                <Typography variant="subtitle1">{artist.artistName}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {artist?.genre || ""}
                </Typography>
              </Stack>
            </Paper>
          ))}
        </Stack>
      </Box>}
    </>
  );

  function renderEventVenueDetails() {
    const combinedDetails = venues?.map((venue: any) => {
      const eventDateTime = new Date(venue?.eventDate);
      const ticketsForVenue = ticketTypes?.filter(
        (ticket: any) => ticket.venueName === venue.venueName
      );

      return {
        venueId:venue?._id,
        venueName: venue.venueName,
        city: venue.city,
        date: fDate(eventDateTime),
        time: eventDateTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
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
            xs: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
          }}
          gap={3}
        >
          {combinedDetails?.map((venue: any, index: any) => (
            <Paper key={index} elevation={3} sx={{ p: 2, borderRadius: 2 }}>
              <Stack spacing={2}>
                <Stack direction="row" spacing={2} alignItems="center">
                  {venue.icon}
                  <Typography variant="subtitle1">
                    {venue?.venueName}
                  </Typography>
                </Stack>
                <Typography variant="body1" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap:'4' }}>
                  <Iconify icon="mingcute:location-fill" sx={{ color: 'error.main', }} />  {venue.city}
                </Typography>
                <Typography variant="body2" color="text.secondary" alignItems={'center'}  sx={{ display: 'flex', alignItems: 'center' }}>
                  <Iconify icon="solar:clock-circle-bold" sx={{ color: 'info.main',marginRight: '8px' }} />  {venue.date} | {venue.time} Onwards
                </Typography>
                <Box>
                  {ticketTypes?.filter((ticket:any) => ticket?.venueId === venue?.venueId).map((ticket: any, idx: any) => (
                    <Box
                      key={idx}
                      p={1}
                      mt={1}
                      border={1}
                      borderColor="grey.300"
                      borderRadius={1}
                    >
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Iconify icon="ant-design:ticket-outlined" />
                        <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap:'4' }}>
                          <Iconify icon="emojione:admission-tickets" sx={{ color: 'info.main',marginRight: '8px' }}/>  {ticket.type} - Price: ${ticket.price}, Seats: {ticket.availableSeats}
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

      <Stack sx={{ maxWidth: 720, mx: "auto" }}>
        {renderHead}

        <Divider sx={{ borderStyle: "dashed", my: 5 }} />

        {renderEventVenueDetails()}

        <Divider sx={{ borderStyle: "dashed", my: 5 }} />

        <Markdown children={eventDescription} />
        {tags?.length > 0 &&  <Box sx={{ mt: 4 }}>
         <Typography variant="h6" gutterBottom>
            Tags
          </Typography>
           <Stack direction="row" spacing={1} sx={{ overflowX: "auto" }}>
            {tags?.map((tag:any, index:any) => (
              <Chip key={index} label={tag} />
            ))}
          </Stack> 
        </Box>}
      </Stack>
    </>
  );
}
