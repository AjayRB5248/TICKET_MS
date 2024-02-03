import * as Yup from "yup";
import { useCallback, useMemo, useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller, useFieldArray } from "react-hook-form";
// @mui
import LoadingButton from "@mui/lab/LoadingButton";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
// hooks
import { useResponsive } from "src/hooks/use-responsive";
// _mock
import { _tourGuides, TOUR_SERVICE_OPTIONS, _tags } from "src/_mock";
// components
import Iconify from "src/components/iconify";
import FormProvider, {
  RHFEditor,
  RHFUpload,
  RHFTextField,
  RHFSelect,
  RHFAutocomplete,
} from "src/components/hook-form";
// types
import {  EventFormSchema } from "src/types/tour";
import { Button, Chip, MenuItem } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { useCreateEvent } from "src/api/events";
import { EVENT_CATEGORIES, EVENT_TAGS, EventStatusEnum,timeZones } from "./utils";

// ----------------------------------------------------------------------

type Props = {
  currentTour?: EventFormSchema;
};



export default function TourNewEditForm({ currentTour }: Props) {
  const mdUp = useResponsive("up", "md");

  const eventMutation = useCreateEvent()

  const NewTourSchema = Yup.object().shape({
    eventName: Yup.string().required("Event name is required"),
    eventDescription: Yup.string().required("Event description is required"),
    eventCategory: Yup.string().required('Event Category is required'),
    status:Yup.string().required('Event Status is Required').oneOf(Object.values(EventStatusEnum), 'Invalid event status'),
    posterImage: Yup.mixed<any>()
      .nullable()
      .required("Poster image is required")
      .test("fileType", "Invalid file format", (value: any) => {
        if (!value) return true;
        return ["image/jpeg", "image/jpg", "image/png"].includes(value.type);
      }),
    artists: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required("Artist name is required"),
        genre: Yup.string().optional(),
        category:Yup.string().required("Artist cateogry is required"),
      })
    ),
    venues: Yup.array().of(
      Yup.object().shape({
        venueName: Yup.string().required("Venue name is required"),
        city: Yup.string().required("City is required"),
        timeZone: Yup.string().required("Time zone is required"),
        dateOfEvent: Yup.date().required("Date of event is required"),
      })
    ),
    ticketSettings: Yup.array().of(
      Yup.object().shape({
        venueName: Yup.string().required("Venue name is required"),
        type: Yup.string().required("Ticket type is required"),
        price: Yup.number()
          .positive("Price must be positive")
          .required("Price is required"),
        totalSeats: Yup.number()
          .integer()
          .positive("Total seats must be a positive integer")
          .required("Total seats are required"),
      })
    ),
    images: Yup.array().optional(),
    tags: Yup.array()
    .of(Yup.string())
    .required("At least one tag is required")
  });

  const defaultValues = useMemo(() => ({
    eventName: currentTour?.eventName || "",
    eventCategory:currentTour?.eventCategory || "",
    eventDescription: currentTour?.eventDescription || "",
    status:currentTour?.status || "",
    artists: currentTour?.artists || [{ name: "", genre:"",category:""}],
    venues: currentTour?.venues || [{ venueName: "", city: "", timeZone: "", dateOfEvent: new Date() }],
    ticketSettings: currentTour?.ticketSettings || [{ venueName: "", type: "", price: 0, totalSeats: 0 }],
    posterImage: currentTour?.posterImage || null,
    images: currentTour?.images || [],
    tags:currentTour?.tags || [],
  }), [currentTour]);
  

  const methods = useForm({
    resolver: yupResolver(NewTourSchema),
    defaultValues,
  });
  
  const {
    control,
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
    setValue,
    watch,
    reset
  } = methods;

  const venueNames = watch("venues").map((venue) => venue.venueName).filter(Boolean);


  const artistsArray = useFieldArray({ control, name: "artists" });
  const venuesArray = useFieldArray({ control, name: "venues" });
  const ticketSettingsArray = useFieldArray({
    control,
    name: "ticketSettings",
  });

  const values = watch();

  useEffect(() => {
    if (currentTour) {
      reset(defaultValues);
    }
  }, [currentTour, defaultValues, reset]);


  const onSubmit = handleSubmit(async (data:any) => {
    const formData = new FormData();

    formData.append('eventName', data.eventName);
    formData.append('eventCategory', data.eventCategory);
    formData.append('eventDescription', data.eventDescription);
    formData.append('status',data.status)
    formData.append('tags', data.tags);
    if (data.posterImage && data.posterImage instanceof File) {
      formData.append('posterImage', data.posterImage, data.posterImage.name);
    }
  
    data?.images.forEach((image:any, index:any) => {
      if (image && image instanceof File) {
        formData.append(`images`, image, image.name);
      }
    });
  
    data.artists.forEach((artist:any, index:any) => {
      formData.append(`artists[${index}][name]`, artist.name);
      formData.append(`artists[${index}][genre]`, artist.genre);
      formData.append(`artists[${index}][category]`, artist.category);
    });
  
    data?.venues.forEach((venue:any, index:any) => {
      formData.append(`venues[${index}][venueName]`, venue.venueName);
      formData.append(`venues[${index}][city]`, venue.city);
      formData.append(`venues[${index}][timeZone]`, venue.timeZone);
      formData.append(`venues[${index}][dateOfEvent]`, venue.dateOfEvent.toISOString());
    });
  
    data?.ticketSettings.forEach((ticket:any, index:any) => {
      formData.append(`ticketSettings[${index}][venueName]`, ticket.venueName);
      formData.append(`ticketSettings[${index}][type]`, ticket.type);
      formData.append(`ticketSettings[${index}][price]`, ticket.price.toString());
      formData.append(`ticketSettings[${index}][totalSeats]`, ticket.totalSeats.toString());
    });
  
    try {
      await eventMutation.mutateAsync(formData);
      reset();
    } catch (error) {
      console.error(error);
    }
  });
  
  const handleDropSingleFile = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (newFile) {
        setValue("posterImage", newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const files = values.images || [];

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setValue("images", [...files, ...newFiles], { shouldValidate: true });
    },
    [setValue, values.images]
  );

  const handleRemoveFile = useCallback(
    (inputFile: File | string) => {
      const filtered =
        values.images && values.images?.filter((file) => file !== inputFile);
      setValue("images", filtered);
    },
    [setValue, values.images]
  );

  const handleRemoveAllFiles = useCallback(() => {
    setValue("images", []);
  }, [setValue]);

  const renderArtists = () => {
    return (
      <Stack spacing={3}>
        {artistsArray.fields.map((item, index) => (
          <Stack key={item.id} direction="row" spacing={2} alignItems="center">
            <RHFTextField
              name={`artists[${index}].name`}
              label="Artist Name"
              required
            />
            <RHFTextField
              name={`artists[${index}].genre`}
              label="Artist Genre"
              required
            />
            <RHFTextField
              name={`artists[${index}].category`}
              label="Artist Category"
              required
            />
            <Button
              variant="outlined"
              color="error"
              onClick={() => artistsArray.remove(index)}
            >
              <Iconify icon="eva:minus-outline" width={24} height={24} />
            </Button>
          </Stack>
        ))}
        <Button onClick={() => artistsArray.append({ name: '', genre:'' })}>
          Add Artist
        </Button>
      </Stack>
    );
  };

  const renderVenues = () => {
    return (
      <Stack spacing={3}>
        {venuesArray.fields.map((item, index) => (
          <Card key={item.id} sx={{ p: 2 }}>
            <Stack spacing={2}>
              <Typography variant="h6">Venue {index + 1}</Typography>

              <RHFTextField
                name={`venues[${index}].venueName`}
                label="Venue Name"
                required
              />
              <RHFTextField
                name={`venues[${index}].city`}
                label="City"
                required
              />
              <RHFSelect name={`venues[${index}].timeZone`} label="Time Zone">
                {timeZones.map((timeZone) => (
                  <MenuItem key={timeZone.value} value={timeZone.value}>
                    {timeZone.label}
                  </MenuItem>
                ))}
              </RHFSelect>

              <Controller
                name={`venues[${index}].dateOfEvent`}
                control={control}
                render={({ field }) => (
                  <DateTimePicker
                    label="Date of Event"
                    inputFormat="yyyy-MM-dd HH:mm"
                    {...field}
                    renderInput={(params: any) => <RHFTextField {...params} />}
                  />
                )}
              />
              <Button
                variant="outlined"
                color="error"
                onClick={() => venuesArray.remove(index)}
              >
                Remove Venue
              </Button>
            </Stack>
          </Card>
        ))}
        <Button
          variant="contained"
          onClick={() =>
            venuesArray.append({
              venueName: "",
              city: "",
              timeZone: "",
              dateOfEvent: new Date(),
            })
          }
        >
          Add Venue
        </Button>
      </Stack>
    );
  };

  const renderTicketSettings = () => {
    return (
      <Stack spacing={3}>
        {ticketSettingsArray.fields.map((item, index) => (
          <Card key={item.id} sx={{ p: 2 }}>
            <Stack spacing={2}>
              <Typography variant="h6">Ticket Setting {index + 1}</Typography>

              <RHFSelect name={`ticketSettings[${index}].venueName`} label="Venue Name" required>
              {venueNames.map((name, idx) => (
                <MenuItem key={idx} value={name}>
                  {name}
                </MenuItem>
              ))}
            </RHFSelect>
              <RHFTextField
                name={`ticketSettings[${index}].type`}
                label="Ticket Type"
                required
              />
              <RHFTextField
                name={`ticketSettings[${index}].price`}
                label="Price"
                type="number"
                required
              />
              <RHFTextField
                name={`ticketSettings[${index}].totalSeats`}
                label="Total Seats"
                type="number"
                required
              />
              <Button
                variant="outlined"
                color="error"
                onClick={() => ticketSettingsArray.remove(index)}
              >
                Remove Ticket Setting
              </Button>
            </Stack>
          </Card>
        ))}
        <Button
          variant="contained"
          onClick={() =>
            ticketSettingsArray.append({
              venueName: "",
              type: "",
              price: 0,
              totalSeats: 0,
            })
          }
        >
          Add Ticket Setting
        </Button>
      </Stack>
    );
  };

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12}>
          <RHFTextField name="eventName" label="Event Name" required />
        </Grid>
        <Grid xs={12}>
        <RHFSelect name='eventCategory' label='Event Category'>
           {EVENT_CATEGORIES.map((category) => (
              <MenuItem key={category.value} value={category.value}>
                {category.label}
               </MenuItem>
           ))}
              </RHFSelect>
        </Grid>
              
        <Grid xs={12}>
          <Stack spacing={1.5}>
            <Typography variant="subtitle2">Event Description</Typography>
            <RHFEditor simple name="eventDescription" />
          </Stack>
        </Grid>
        <Grid xs={12}>
        <RHFSelect name="status" label="Event Status" required>
          {Object.entries(EventStatusEnum).map(([key, value]) => (
            <MenuItem key={key} value={key}>
              {value}
            </MenuItem>
          ))}
        </RHFSelect>
      </Grid>
      </Grid>
      <Grid xs={12}>
        <Stack spacing={2}>
          <Typography variant="subtitle2">Event Poster</Typography>
          <RHFUpload
            name="posterImage"
            maxSize={3145728}
            onDrop={handleDropSingleFile}
            useFsAccessApi
            disableMultiple
            onDelete={() =>
              setValue("posterImage", null, { shouldValidate: true })
            }
          />
        </Stack>
      </Grid>
      <Grid container spacing={3}>
        <Grid xs={12}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Artists
          </Typography>
          {renderArtists()}
        </Grid>
        <Grid xs={12}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Venues
          </Typography>
          {renderVenues()}
        </Grid>
        <Grid xs={12}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Ticket Settings
          </Typography>
          {renderTicketSettings()}
        </Grid>

        <Grid xs={12}>
        <Stack spacing={1.5}>
              <Typography variant="subtitle2">Tags</Typography>
                        <RHFAutocomplete
            name="tags"
            placeholder="+ Tags"
            multiple
            freeSolo
            options={EVENT_TAGS}
            getOptionLabel={(option) => option ? option : ''}
            renderTags={(selected, getTagProps) =>
              selected.map((option, index) => (
                <Chip
                  {...getTagProps({ index })}
                  key={option}
                  label={option}
                  size="small"
                  color="info"
                  variant="soft"
                />
              ))
            }
          />


            </Stack>
          <Stack spacing={1.5}>
            <Typography variant="subtitle2">Images</Typography>
            <RHFUpload
              multiple
              thumbnail
              name="images"
              maxSize={3145728}
              onDrop={handleDrop}
              onRemove={handleRemoveFile}
              onRemoveAll={handleRemoveAllFiles}
              onUpload={() => console.info("ON UPLOAD")}
            />
          </Stack>
        </Grid>


        <Grid xs={12}>
          <LoadingButton
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            loading={isSubmitting}
            sx={{ mt: 3 }}
          >
            Submit Event
          </LoadingButton>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
