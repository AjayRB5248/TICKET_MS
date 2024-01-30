import * as Yup from "yup";
import { useCallback, useMemo, useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller, useFieldArray } from "react-hook-form";
// @mui
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import LoadingButton from "@mui/lab/LoadingButton";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Unstable_Grid2";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
// hooks
import { useResponsive } from "src/hooks/use-responsive";
// routes
import { paths } from "src/routes/paths";
import { useRouter } from "src/routes/hook";
// assets
import { countries } from "src/assets/data";
// _mock
import { _tourGuides, TOUR_SERVICE_OPTIONS, _tags } from "src/_mock";
// components
import Iconify from "src/components/iconify";
import { useSnackbar } from "src/components/snackbar";
import FormProvider, {
  RHFEditor,
  RHFUpload,
  RHFTextField,
  RHFAutocomplete,
  RHFMultiCheckbox,
  RHFSelect,
} from "src/components/hook-form";
// types
import { ITourGuide, ITourItem, EventFormSchema } from "src/types/tour";
import { Button, Divider, MenuItem } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";

// ----------------------------------------------------------------------

type Props = {
  currentTour?: EventFormSchema;
};

const timeZones = [
  { label: "ACT", value: "Australia/ACT" },
  { label: "Adelaide", value: "Australia/Adelaide" },
  { label: "Brisbane", value: "Australia/Brisbane" },
  { label: "Broken Hill", value: "Australia/Broken_Hill" },
  { label: "Canberra", value: "Australia/Canberra" },
  { label: "Currie", value: "Australia/Currie" },
  { label: "Darwin", value: "Australia/Darwin" },
  { label: "Eucla", value: "Australia/Eucla" },
  { label: "Hobart", value: "Australia/Hobart" },
  { label: "LHI", value: "Australia/LHI" },
  { label: "Lindeman", value: "Australia/Lindeman" },
  { label: "Lord Howe", value: "Australia/Lord_Howe" },
  { label: "Melbourne", value: "Australia/Melbourne" },
  { label: "NSW", value: "Australia/NSW" },
  { label: "North", value: "Australia/North" },
  { label: "Perth", value: "Australia/Perth" },
  { label: "Queensland", value: "Australia/Queensland" },
  { label: "South", value: "Australia/South" },
  { label: "Sydney", value: "Australia/Sydney" },
  { label: "Tasmania", value: "Australia/Tasmania" },
  { label: "Victoria", value: "Australia/Victoria" },
  { label: "West", value: "Australia/West" },
  { label: "Yancowinna", value: "Australia/Yancowinna" },
];

export default function TourNewEditForm({ currentTour }: Props) {
  const router = useRouter();

  const mdUp = useResponsive("up", "md");

  const { enqueueSnackbar } = useSnackbar();

  const NewTourSchema = Yup.object().shape({
    eventName: Yup.string().required("Event name is required"),
    eventDescription: Yup.string().required("Event description is required"),
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
        genre: Yup.string().required("Genre is required"),
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
    images: Yup.array().min(1, "At least one image is required"),
  });

  const defaultValues = useMemo(() => ({
    eventName: currentTour?.eventName || "",
    eventDescription: currentTour?.eventDescription || "",
    artists: currentTour?.artists || [{ name: "", genre: "" }],
    venues: currentTour?.venues || [{ venueName: "", city: "", timeZone: "", dateOfEvent: new Date() }],
    ticketSettings: currentTour?.ticketSettings || [{ venueName: "", type: "", price: 0, totalSeats: 0 }],
    posterImage: currentTour?.posterImage || null,
    images: currentTour?.images || [],
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

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      enqueueSnackbar("Create success!");
      console.info("DATA", data);
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
            <Button
              variant="outlined"
              color="error"
              onClick={() => artistsArray.remove(index)}
            >
              <Iconify icon="eva:minus-outline" width={24} height={24} />
            </Button>
          </Stack>
        ))}
        <Button onClick={() => artistsArray.append({ name: "", genre: "" })}>
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
          <Stack spacing={1.5}>
            <Typography variant="subtitle2">Event Description</Typography>
            <RHFEditor simple name="eventDescription" />
          </Stack>
        </Grid>
      </Grid>
      <Grid xs={12}>
        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Event Poster</Typography>
          <RHFUpload
            name="posterImage"
            maxSize={3145728}
            onDrop={handleDropSingleFile}
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
