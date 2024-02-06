'use client';

// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// _mock
import { _tours } from 'src/_mock';
// components
import { useParams } from 'src/routes/hook';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
import TourNewEditForm from '../tour-new-edit-form';
import { useEvent } from 'src/api/events';

// ----------------------------------------------------------------------

export default function TourEditView() {
  const settings = useSettingsContext();

  const params = useParams();

  const { id } = params;
  const { event, isLoading} = useEvent(id)

  const currentTour = _tours.find((tour) => tour.id === id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Event',
            href: paths.dashboard.tour.root,
          },
          { name: currentTour?.name },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <TourNewEditForm currentTour={event} />
    </Container>
  );
}
