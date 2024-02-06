import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
// hooks
// _mock
// components
import FormProvider, {
  RHFAutocomplete,
  RHFEditor,
  RHFSelect,
  RHFTextField,
  RHFUpload,
} from 'src/components/hook-form';
import Iconify from 'src/components/iconify';
// types
import { Button, Chip, MenuItem } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { useCreateEvent } from 'src/api/events';
import { EventSchema } from 'src/schema/Event.schema';
import { EventFormSchema } from 'src/types/tour';
import {
  EVENT_CATEGORIES,
  EVENT_TAGS,
  EventStatusEnum,
  timeZones,
} from './utils';

// ----------------------------------------------------------------------

type Props = {
  currentTour?: EventFormSchema;
};

export default function TourNewEditForm({ currentTour }: Props) {
  const eventMutation = useCreateEvent();
  const [file, setFile] = useState<any>(null);
  const getVenueName = (venueId: string) => {
    const venue = currentTour?.venues?.find((v) => v._id === venueId);
    return venue ? venue.venueName : '';
  };
  const artistsFormatted = currentTour?.artists?.map((artist) => ({
    name: artist?.artistName || '',
    genre: artist?.genre || '',
    category: artist?.category || '',
  })) || [{ name: '', genre: '', category: '' }];

  const mappedImages =
    currentTour?.eventImages?.map((image) => ({
      ...image,
      preview: image.imageurl,
    })) || [];

  const defaultPosterImage = currentTour?.posterImage
    ? {
        preview: currentTour.posterImage,
      }
    : null;

  const defaultValues = useMemo(
    () => ({
      eventName: currentTour?.eventName || '',
      eventCategory: currentTour?.eventCategory || '',
      eventDescription: currentTour?.eventDescription || '',
      status: currentTour?.status || '',
      artists: artistsFormatted,
      videoUrl: currentTour?.videoUrl || '',
      venues: currentTour?.venues
        ? currentTour.venues.map((venue) => ({
            ...venue,
            dateOfEvent: new Date(venue.eventDate) || new Date(),
          }))
        : [{ venueName: '', city: '', timeZone: '', dateOfEvent: new Date() }],
      ticketSettings: currentTour?.ticketTypes
        ? currentTour?.ticketTypes.map((ticketType) => ({
            ...ticketType,
            venueName: getVenueName(ticketType.venueId),
            type: ticketType.type,
            price: ticketType.price,
            totalSeats: ticketType.totalSeats,
          }))
        : [{ venueName: '', type: '', price: 0, totalSeats: 0 }],
      posterImage: defaultPosterImage,
      images: mappedImages,
      tags:
        currentTour?.tags?.length > 0 ? currentTour?.tags[0].split(',') : [],
    }),
    [currentTour]
  );

  const methods = useForm({
    resolver: yupResolver(EventSchema),
    defaultValues,
  });

  const {
    control,
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
    setValue,
    watch,
    reset,
  } = methods;

  const venueNames = watch('venues')
    .map((venue) => venue.venueName)
    .filter(Boolean);

  const artistsArray = useFieldArray({ control, name: 'artists' });
  const venuesArray = useFieldArray({ control, name: 'venues' });
  const ticketSettingsArray = useFieldArray({
    control,
    name: 'ticketSettings',
  });

  const values = watch();

  useEffect(() => {
    if (currentTour) {
      reset(defaultValues);
    }
  }, [currentTour, defaultValues, reset]);

  const eventName = watch('eventName');

  const onSubmit = handleSubmit(async (data: any) => {
    const formData = new FormData();
    formData.append('eventName', data.eventName);
    formData.append('eventCategory', data.eventCategory);
    formData.append('eventDescription', data.eventDescription);
    formData.append('status', data.status);
    formData.append('tags', data.tags);
    formData.append('videoUrl', data.videoUrl);

    console.log('this is data file', file[0]);

    formData.append('posterImage', file[0]);

    data?.images.forEach((image: any, index: any) => {
      if (image && image instanceof File) {
        formData.append(`images`, image, image.name);
      }
    });

    data.artists.forEach((artist: any, index: any) => {
      formData.append(`artists[${index}][name]`, artist.name);
      formData.append(`artists[${index}][genre]`, artist.genre);
      formData.append(`artists[${index}][category]`, artist.category);
    });

    data?.venues.forEach((venue: any, index: any) => {
      formData.append(`venues[${index}][venueName]`, venue.venueName);
      formData.append(`venues[${index}][city]`, venue.city);
      formData.append(`venues[${index}][timeZone]`, venue.timeZone);
      formData.append(
        `venues[${index}][dateOfEvent]`,
        venue.dateOfEvent.toISOString()
      );
    });

    data?.ticketSettings.forEach((ticket: any, index: any) => {
      formData.append(`ticketSettings[${index}][venueName]`, ticket.venueName);
      formData.append(`ticketSettings[${index}][type]`, ticket.type);
      formData.append(
        `ticketSettings[${index}][price]`,
        ticket.price.toString()
      );
      formData.append(
        `ticketSettings[${index}][totalSeats]`,
        ticket.totalSeats.toString()
      );
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
      setFile(acceptedFiles);
      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (newFile) {
        setValue('posterImage', newFile, { shouldValidate: true });
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

      setValue('images', [...files, ...newFiles], { shouldValidate: true });
    },
    [setValue, values.images]
  );

  const handleRemoveFile = useCallback(
    (inputFile: File | string) => {
      const filtered =
        values.images &&
        values.images?.filter((file: any) => file !== inputFile);
      setValue('images', filtered);
    },
    [setValue, values.images]
  );

  const handleRemoveAllFiles = useCallback(() => {
    setValue('images', []);
  }, [setValue]);

  const renderArtists = () => {
    return (
      <Stack spacing={3}>
        {artistsArray.fields.map((item, index) => (
          <Stack key={item.id} direction='row' spacing={2} alignItems='center'>
            <RHFTextField
              name={`artists[${index}].name`}
              label='Artist Name'
              required
            />
            <RHFTextField
              name={`artists[${index}].genre`}
              label='Artist Genre'
              required
            />
            <RHFTextField
              name={`artists[${index}].category`}
              label='Artist Category'
              required
            />
            <Button
              variant='outlined'
              color='error'
              onClick={() => artistsArray.remove(index)}
            >
              <Iconify icon='eva:minus-outline' width={24} height={24} />
            </Button>
          </Stack>
        ))}
        <Button
          onClick={() =>
            artistsArray.append({ name: '', genre: '', category: '' })
          }
        >
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
              <Typography variant='h6'>Venue {index + 1}</Typography>

              <RHFTextField
                name={`venues[${index}].venueName`}
                label='Venue Name'
                required
              />
              <RHFTextField
                name={`venues[${index}].city`}
                label='City'
                required
              />
              <RHFSelect name={`venues[${index}].timeZone`} label='Time Zone'>
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
                    label='Date of Event'
                    inputFormat='yyyy-MM-dd HH:mm'
                    {...field}
                    renderInput={(params: any) => <RHFTextField {...params} />}
                  />
                )}
              />
              <Button
                variant='outlined'
                color='error'
                onClick={() => venuesArray.remove(index)}
              >
                Remove Venue
              </Button>
            </Stack>
          </Card>
        ))}
        <Button
          variant='contained'
          onClick={() =>
            venuesArray.append({
              venueName: '',
              city: '',
              timeZone: '',
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
              <Typography variant='h6'>Ticket Setting {index + 1}</Typography>

              <RHFSelect
                name={`ticketSettings[${index}].venueName`}
                label='Venue Name'
                required
              >
                {venueNames.map((name, idx) => (
                  <MenuItem key={idx} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </RHFSelect>
              <RHFTextField
                name={`ticketSettings[${index}].type`}
                label='Ticket Type'
                required
              />
              <RHFTextField
                name={`ticketSettings[${index}].price`}
                label='Price'
                type='number'
                required
              />
              <RHFTextField
                name={`ticketSettings[${index}].totalSeats`}
                label='Total Seats'
                type='number'
                required
              />
              <Button
                variant='outlined'
                color='error'
                onClick={() => ticketSettingsArray.remove(index)}
              >
                Remove Ticket Setting
              </Button>
            </Stack>
          </Card>
        ))}
        <Button
          variant='contained'
          onClick={() =>
            ticketSettingsArray.append({
              venueName: '',
              type: '',
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
          <RHFTextField name='eventName' label='Event Name' required />
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
            <Typography variant='subtitle2'>Event Description</Typography>
            <RHFEditor simple name='eventDescription' />
          </Stack>
        </Grid>
        <Grid xs={12}>
          <RHFSelect name='status' label='Event Status' required>
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
          <Typography variant='subtitle2'>Event Poster</Typography>
          <RHFUpload
            name='posterImage'
            maxSize={3145728}
            onDrop={handleDropSingleFile}
            useFsAccessApi
            disableMultiple
            onDelete={() =>
              setValue('posterImage', null, { shouldValidate: true })
            }
          />
        </Stack>
      </Grid>
      <Grid container spacing={3}>
        <Grid xs={12}>
          <Typography variant='h4' sx={{ mb: 3 }}>
            Artists
          </Typography>
          {renderArtists()}
        </Grid>
        <Grid xs={12}>
          <Typography variant='h4' sx={{ mb: 3 }}>
            Video Url
          </Typography>
          <RHFTextField name='videoUrl' label='Artist Youtube Video URL' />
        </Grid>
        <Grid xs={12}>
          <Typography variant='h4' sx={{ mb: 3 }}>
            Venues
          </Typography>
          {renderVenues()}
        </Grid>
        <Grid xs={12}>
          <Typography variant='h4' sx={{ mb: 3 }}>
            Ticket Settings
          </Typography>
          {renderTicketSettings()}
        </Grid>

        <Grid xs={12}>
          <Stack spacing={1.5}>
            <Typography variant='subtitle2'>Tags</Typography>
            <RHFAutocomplete
              name='tags'
              placeholder='+ Tags'
              multiple
              freeSolo
              options={EVENT_TAGS}
              defaultValue={defaultValues?.tags}
              getOptionLabel={(option) => (option ? option : '')}
              renderTags={(selected, getTagProps) =>
                selected.map((option, index) => (
                  <Chip
                    {...getTagProps({ index })}
                    key={option}
                    label={option}
                    size='small'
                    color='info'
                    variant='soft'
                  />
                ))
              }
            />
          </Stack>
          <Stack spacing={1.5}>
            <Typography variant='subtitle2'>Images</Typography>
            <RHFUpload
              multiple
              thumbnail
              name='images'
              maxSize={3145728}
              onDrop={handleDrop}
              onRemove={handleRemoveFile}
              onRemoveAll={handleRemoveAllFiles}
              onUpload={() => console.info('ON UPLOAD')}
            />
          </Stack>
        </Grid>

        <Grid xs={12}>
          <LoadingButton
            type='submit'
            variant='contained'
            color='primary'
            size='large'
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
