import { useMemo } from 'react';
// routes
import { paths } from 'src/routes/paths';
// locales
import { useLocales } from 'src/locales';
// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
  // OR
  // <Iconify icon="fluent:mail-24-filled" />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
);

const ICONS = {
  job: icon('ic_job'),
  blog: icon('ic_blog'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  // tour: icon('ic_tour'),
  tour: icon('ic_calendar'),
  order: icon('ic_order'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  // booking: icon('ic_booking'),
  booking: icon('ic_invoice'),
  invoice: icon('ic_invoice'),
  product: icon('ic_product'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const { t } = useLocales();

  const data = useMemo(
    () => [
      // OVERVIEW
      // ----------------------------------------------------------------------
      {
        subheader: t('overview'),
        items: [
          { title: t('booking'), path: paths.dashboard.general.booking, icon: ICONS.booking },
          {
            title: t('tour'),
            path: paths.dashboard.tour.root,
            icon: ICONS.tour,
            children: [
              { title: t('list'), path: paths.dashboard.tour.root },
              { title: t('details'), path: paths.dashboard.tour.demo.details },
              { title: t('create'), path: paths.dashboard.tour.new },
              { title: t('edit'), path: paths.dashboard.tour.demo.edit },
            ],
          },
          {
            title: t('blog'),
            path: paths.dashboard.post.root,
            icon: ICONS.blog,
            children: [
              { title: t('list'), path: paths.dashboard.post.root },
              { title: t('details'), path: paths.dashboard.post.demo.details },
              { title: t('create'), path: paths.dashboard.post.new },
              { title: t('edit'), path: paths.dashboard.post.demo.edit },
            ],
          },
        ],
      },
    ],
    [t]
  );

  return data;
}
