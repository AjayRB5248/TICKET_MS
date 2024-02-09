import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
// @mui
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
// types
import { LoadingButton } from '@mui/lab';
import {
  Button,
  Card,
  Chip,
  Grid,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  useAddEventItem,
  useCreateEvent,
  useRemoveEventItem,
  useUpdateEvent,
} from 'src/api/events';
import Iconify from 'src/components/iconify';
import { useRouter } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
import { EventSchema } from 'src/schema/Event.schema';
import { IEvent, TVenue } from 'src/types/tour';
import {
  EVENT_CATEGORIES,
  EVENT_TAGS,
  EventStatusEnum,
  timeZones,
} from './utils';

type Props = {
  currentTour?: IEvent;
};

const artistDefault = { name: '', genre: '', category: '' };
const venueDefault = {
  venueName: '',
  city: '',
  timeZone: '',
  dateOfEvent: new Date(),
};
const ticketDefault = {
  venueName: '',
  type: '',
  price: 0,
  totalSeats: 0,
};
export default function TourNewEditForm({ currentTour }: Props) {
  const eventMutation = useCreateEvent();
  const eventUpdateMutation = useUpdateEvent();
  const eventRemoveItemMutation = useRemoveEventItem();
  const eventAddItemMutation = useAddEventItem();

  const [file, setFile] = useState<File[] | null>(null);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const artistsFormatted = currentTour?.artists?.map((artist) => ({
    name: artist?.artistName || '',
    genre: artist?.genre || '',
    category: artist?.category || '',
    _id: artist?._id,
  })) || [{ name: '', genre: '', category: '' }];

  const mappedImages = currentTour?.eventImages?.filter(
    (item: any) => !item?.isPrimary
  );

  const defaultPosterImage = currentTour?.eventImages?.find(
    (item: any) => item?.isPrimary
  )?.imageurl;

  const getVenueName = (venueId: string) => {
    const venue = currentTour?.venues?.find((v: any) => v._id === venueId);
    return venue ? venue.venueName : '';
  };

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
      images: mappedImages?.map((item: any) => item?.imageurl),
      tags:
        currentTour?.tags &&
        currentTour?.tags[0].split(',').filter((item) => item !== ''),
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

  const artists = useFieldArray({
    control,
    name: 'artists',
  });
  const venues = useFieldArray({
    control,
    name: 'venues',
  });
  const ticketSettings = useFieldArray({
    control,
    name: 'ticketSettings',
  });

  const venueNames = (watch('venues') ?? [])
    .filter((venue) => venue && venue.venueName)
    .map((venue) => venue.venueName);

  const formValues = watch();

  useEffect(() => {
    if (artists.fields.length === 0) {
      artists.append({ ...artistDefault });
      venues.append({ ...venueDefault });
      ticketSettings.append({ ...ticketDefault });
    }
  }, []);

  // if editing, updating the form fields value
  useEffect(() => {
    if (currentTour) {
      reset(defaultValues);
    }
  }, [currentTour, defaultValues, reset]);

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
      const files = formValues.images || [];

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setValue('images', [...files, ...newFiles], { shouldValidate: true });
    },
    [setValue, formValues.images]
  );

  const handleRemoveFile = useCallback(
    (inputFile: File | string) => {
      const filtered =
        formValues.images &&
        formValues.images?.filter((file: any) => file !== inputFile);
      setValue('images', filtered);
    },
    [setValue, formValues.images]
  );

  const handleRemoveAllFiles = useCallback(() => {
    setValue('images', []);
  }, [setValue]);

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append('eventName', data.eventName);
    formData.append('eventCategory', data.eventCategory);
    formData.append('eventDescription', data.eventDescription);
    formData.append('status', data.status);
    formData.append('tags', data.tags);
    formData.append('videoUrl', data.videoUrl);

    file && formData.append('posterImage', file[0]);

    data?.images?.forEach((image: any, index: any) => {
      if (image && image instanceof File) {
        formData.append(`images`, image, image.name);
      }
    });

    data.artists?.forEach((artist: any, index: any) => {
      formData.append(`artists[${index}][name]`, artist.name);
      formData.append(`artists[${index}][genre]`, artist.genre);
      formData.append(`artists[${index}][category]`, artist.category);
    });

    data?.venues?.forEach((venue: any, index: any) => {
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
  };

  // getting new/updated/deletd actor
  const handleChangesInActor = (newArray: any, oldArray: any) => {
    const updatedActor: any[] = [];
    const deletedActor: any = [];
    const newActor: any[] = [];

    oldArray.forEach((oldObj: any) => {
      const newObj = newArray.find(
        (newItem: any) => newItem._id === oldObj._id
      );
      if (newObj) {
        if (
          newObj?.name !== oldObj?.artistName ||
          newObj?.category !== oldObj?.category ||
          newObj?.genre !== oldObj?.genre
        ) {
          updatedActor.push({
            'artist[_id]': newObj?._id,
            'artist[artistName]': newObj?.name,
            'artist[category]': newObj?.category,
            'artist[genre]': newObj?.genre,
          });
        }
      } else {
        deletedActor.push({
          artistId: oldObj?._id,
        });
      }
    });

    newArray.forEach((newObj: any) => {
      if (!newObj._id) {
        newActor.push({
          'artist[artistName]': newObj.name,
          'artist[category]': newObj.category,
          'artist[genre]': newObj.genre,
        });
      }
    });

    return { updatedActor, deletedActor, newActor };
  };

  // getting new/deleted/updated venue
  const handleChangesInVenue = (newArray: any, oldArray: any) => {
    const updatedVenues: any = [];
    const deletedVenues: any = [];
    const newVenues: any = [];

    oldArray.forEach((oldObj: any) => {
      const newObj = newArray.find(
        (newItem: any) => newItem._id === oldObj._id
      );
      if (newObj) {
        if (
          newObj?.venueName !== oldObj?.venueName ||
          newObj?.city !== oldObj?.city ||
          newObj?.timeZone !== oldObj?.timeZone
        ) {
          updatedVenues.push({
            'venue[_id]': newObj?._id,
            'venue[name]': newObj?.venueName,
            'venue[city]': newObj?.city,
            'venue[timeZone]': newObj?.timeZone,
          });
        }
      } else {
        deletedVenues.push({
          venueId: oldObj?._id,
        });
      }
    });

    newArray.forEach((newObj: any) => {
      if (!newObj._id) {
        newVenues.push({
          'venue[venueName]': newObj.venueName,
          'venue[city]': newObj.city,
          'venue[timeZone]': newObj.timeZone,
        });
      }
    });

    return { updatedVenues, deletedVenues, newVenues };
  };

  // getting new/deleted/updated venue
  const handleChangesInTicketSetting = (
    newArray: any,
    oldArray: any,
    venues: TVenue[]
  ) => {
    const updatedTickets: any = [];
    const deletedTickets: any = [];
    const newTickets: any = [];

    oldArray.forEach((oldTicket: any) => {
      const newObj = newArray.find(
        (newTicket: any) => newTicket._id === oldTicket._id
      );
      if (newObj) {
        let venueName;
        const venue = venues.find((v) => v._id === oldTicket.venueId);
        if (venue) {
          venueName = venue.venueName;
        } else {
          console.error('Venue not found for ticket:', oldTicket._id);
          return;
        }

        if (
          newObj.venueName !== venueName ||
          newObj.type !== oldTicket.type ||
          newObj.price !== oldTicket.price ||
          newObj.totalSeats !== oldTicket.totalSeats
        ) {
          updatedTickets.push({
            'ticketType[_id]': newObj._id,
            'ticketType[venueName]': newObj.venueName,
            'ticketType[type]': newObj.type,
            'ticketType[price]': newObj.price,
            'ticketType[totalSeats]': newObj.totalSeats,
          });
        }
      } else {
        deletedTickets.push({
          ticketTypeId: oldTicket._id,
        });
      }
    });

    newArray.forEach((newTicket: any) => {
      if (!newTicket._id) {
        newTickets.push({
          'ticketType[venueName]': newTicket.venueName,
          'ticketType[type]': newTicket.type,
          'ticketType[price]': newTicket.price,
          'ticketType[totalSeats]': newTicket.totalSeats,
        });
      }
    });

    return { updatedTickets, deletedTickets, newTickets };
  };

  // getting new/deleted imaghe
  const handleChangesImage = (newArray: any, oldArray: any) => {
    const deletedImage: any = [];
    const newImage: any[] = [];

    oldArray.forEach((oldObj: any) => {
      const newObj = newArray.find(
        (newItem: any) => newItem === oldObj.imageurl
      );
      if (newObj) {
      } else {
        deletedImage.push({
          eventImageId: oldObj?._id,
        });
      }
    });

    newArray.forEach((newObj: any) => {
      if (typeof newObj !== 'string') {
        newImage.push(newObj);
      }
    });

    return { deletedImage, newImage };
  };

  const onUpdate = async (data: any) => {
    try {
      let dataToUpdate: any = [];
      let dataToDelete: any = [];
      let dataToAdd: any = [];

      const { updatedActor, deletedActor, newActor } = handleChangesInActor(
        data?.artists,
        currentTour?.artists
      );
      const { deletedImage, newImage } = handleChangesImage(
        data?.images,
        mappedImages
      );
      const { deletedVenues, updatedVenues, newVenues } = handleChangesInVenue(
        data?.venues,
        currentTour?.venues
      );
      const { deletedTickets, newTickets, updatedTickets } =
        handleChangesInTicketSetting(
          data?.ticketSettings,
          currentTour?.ticketTypes,
          currentTour?.venues || []
        );

      dataToUpdate = [
        ...dataToUpdate,
        ...updatedActor,
        ...updatedVenues,
        ...updatedTickets,
      ];
      dataToDelete = [
        ...dataToDelete,
        ...deletedActor,
        ...deletedImage,
        ...deletedVenues,
        ...deletedTickets,
      ];
      dataToAdd = [...dataToAdd, ...newActor, ...newVenues, ...newTickets];

      // updating already added items
      for (const obj of dataToUpdate) {
        const formData = new FormData();
        Object.entries(obj).forEach(([key, value]: any) => {
          formData.append(key, value);
        });
        await eventUpdateMutation.mutateAsync({
          formData,
          id: currentTour?._id,
        });
      }
      // adding new items
      for (const obj of dataToAdd) {
        const formData = new FormData();
        Object.entries(obj).forEach(([key, value]: any) => {
          formData.append(key, value);
        });

        await eventAddItemMutation.mutateAsync({
          formData,
          id: currentTour?._id,
        });
      }
      // deleting items
      for (const obj of dataToDelete) {
        const deleteFormData = new FormData();
        Object.entries(obj).map(([key, value]: any) => {
          deleteFormData.append(key, value);
        });
        await eventRemoveItemMutation.mutateAsync({
          formData: deleteFormData,
          id: currentTour?._id,
        });
      }

      // updating basic stuff
      const basicFormData = new FormData();
      basicFormData.append('eventName', data.eventName);
      basicFormData.append('eventCategory', data.eventCategory);
      basicFormData.append('eventDescription', data.eventDescription);
      basicFormData.append('status', data.status);
      basicFormData.append('tags', data.tags);
      basicFormData.append('videoUrl', data.videoUrl);
      newImage.forEach((image: any, index: any) => {
        if (image && image instanceof File) {
          basicFormData.append(`images`, image);
        }
      });
      typeof data.posterImage !== 'string' &&
        file &&
        basicFormData.append('posterImage', file[0]);

      await eventUpdateMutation.mutateAsync({
        formData: basicFormData,
        id: currentTour?._id,
      });
      enqueueSnackbar('Event Edited Succesfully', {
        variant: 'success',
      });
      reset();
      router.push(paths.dashboard.tour.root);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider
      methods={methods}
      onSubmit={handleSubmit(currentTour?._id ? onUpdate : onSubmit)}
    >
      <Stack spacing={3}>
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

        <Grid xs={12}>
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
        </Grid>

        <Grid xs={12}>
          <Typography variant='h4' sx={{ mb: 3 }}>
            Artists
          </Typography>
          {renderArtists(artists)}
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
          {renderVenues(venues, control)}
        </Grid>

        <Grid xs={12}>
          <Typography variant='h4' sx={{ mb: 3 }}>
            Ticket Settings
          </Typography>
          {renderTicketSettings(ticketSettings, venueNames)}
        </Grid>

        <Grid xs={12}>
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
        </Grid>

        <Grid xs={12}>
          <Typography variant='subtitle2'>Images</Typography>
          <RHFUpload
            multiple
            thumbnail
            name='images'
            maxSize={3145728}
            onDrop={handleDrop}
            onRemove={handleRemoveFile}
            onRemoveAll={handleRemoveAllFiles}
          />
        </Grid>
      </Stack>

      <Stack spacing={3}>
        {/* submit button */}
        <Grid xs={12}>
          <LoadingButton
            type='submit'
            variant='contained'
            color='primary'
            size='large'
            loading={isSubmitting}
            sx={{ mt: 3 }}
          >
            {currentTour?._id ? 'Update Events' : 'Submit Event'}
          </LoadingButton>
        </Grid>
      </Stack>
    </FormProvider>
  );
}

const renderArtists = (artist: any) => {
  return (
    <Stack spacing={3}>
      {artist.fields.map((item: any, index: any) => (
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
            onClick={() => artist.remove(index)}
          >
            <Iconify icon='eva:minus-outline' width={24} height={24} />
          </Button>
        </Stack>
      ))}

      <Button variant='soft' onClick={() => artist.append(artistDefault)}>
        Add Artist
      </Button>
    </Stack>
  );
};

const renderVenues = (venues: any, control: any) => {
  return (
    <Stack spacing={3}>
      {venues.fields.map((item: any, index: any) => (
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
              render={({ field }: any) => (
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
              onClick={() => venues.remove(index)}
            >
              Remove Venue
            </Button>
          </Stack>
        </Card>
      ))}
      <Button variant='soft' onClick={() => venues.append(venueDefault)}>
        Add Venue
      </Button>
    </Stack>
  );
};

const renderTicketSettings = (ticketSettings: any, venueNames: any) => {
  return (
    <Stack spacing={3}>
      {ticketSettings.fields.map((item: any, index: number) => (
        <Card key={item.id} sx={{ p: 2 }}>
          <Stack spacing={2}>
            <Typography variant='h6'>Ticket Setting {index + 1}</Typography>

            <RHFSelect
              name={`ticketSettings[${index}].venueName`}
              label='Venue Name'
              required
            >
              {venueNames.map((name: string, idx: number) => (
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
              onClick={() => ticketSettings.remove(index)}
            >
              Remove Ticket Setting
            </Button>
          </Stack>
        </Card>
      ))}
      <Button
        variant='contained'
        onClick={() => ticketSettings.append(ticketDefault)}
      >
        Add Ticket Setting
      </Button>
    </Stack>
  );
};
