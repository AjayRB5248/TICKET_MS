'use client';

// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// components
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
//
import TourNewEditForm from '../tour-new-edit-form';

// ----------------------------------------------------------------------

export default function TourCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading='Create a new Event'
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Event',
            href: paths.dashboard.tour.root,
          },
          { name: 'New Event' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <TourNewEditForm />
    </Container>
  );
}
