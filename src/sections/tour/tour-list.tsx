import { useCallback } from 'react';
// @mui
import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';
// routes
import { paths } from 'src/routes/paths';
// types
import { ITourItem } from 'src/types/tour';
// components
import { useRouter } from 'src/routes/hook';
//
import TourItem from './tour-item';
import { useEvent, useEvents } from 'src/api/events';

// ----------------------------------------------------------------------

type Props = {
  tours: ITourItem[];
};

export default function TourList({ tours }: Props) {
  const router = useRouter();
  const {events, loading , error}=useEvents();

  const handleView = useCallback(
    (id: string) => {
      router.push(paths.dashboard.tour.details(id));
    },
    [router]
  );

  const handleEdit = useCallback(
    (id: string) => {
      router.push(paths.dashboard.tour.edit(id));
    },
    [router]
  );

  const handleDelete = useCallback((id: string) => {
    console.info('DELETE', id);
  }, []);

  return (
    <>
      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
      >
        {events?.map((event:any) => (
          <TourItem
            key={event._id}
            event={event}
            onView={() => handleView(event._id)}
            onEdit={() => handleEdit(event._id)}
            onDelete={() => handleDelete(event._id)}
          />
        ))}
      </Box>

      {events?.length > 8 && (
        <Pagination
          count={8}
          sx={{
            mt: 8,
            [`& .${paginationClasses.ul}`]: {
              justifyContent: 'center',
            },
          }}
        />
      )}
    </>
  );
}
