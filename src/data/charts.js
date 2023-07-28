import {
  faBookmark,
  faLongArrowAltUp,
  faMoneyBillAlt,
} from '@fortawesome/free-solid-svg-icons';

const trafficShares = [
  {
    id: 1,
    label: 'Transfert',
    value: 60,
    color: 'secondary',
    icon: faLongArrowAltUp,
  },
  {
    id: 2,
    label: 'Salaire',
    value: 30,
    color: 'primary',
    icon: faMoneyBillAlt,
  },
  {
    id: 3,
    label: 'Charge fixe',
    value: 10,
    color: 'tertiary',
    icon: faBookmark,
  },
];

const totalOrders = [
  { id: 1, label: 'July', value: [1, 5, 2, 5, 4, 3], color: 'primary' },
  { id: 2, label: 'August', value: [2, 3, 4, 8, 1, 2], color: 'secondary' },
];

export { trafficShares, totalOrders };
