import groupBy from 'ramda/src/groupBy';

const perms = [
  {
    name: ' ',
    permissions: 'USR',
    description:
      'Το Lorem Ipsum είναι απλά ένα κείμενο χωρίς νόημα για τους επαγγελματίες ',
    viewOnMenu: true,
    path: ['/'],
    group: 'Text Mining',
  },

  {
    name: 'Reports Read',
    permissions: 'RER',
    description:
      'Το Lorem Ipsum είναι απλά ένα κείμενο χωρίς νόημα για τους επαγγελματίες ',
    viewOnMenu: true,
    path: ['reports'],
    group: 'Reports',
  },

  {
    name: 'Models Read',
    permissions: 'MCR',
    description:
      'Το Lorem Ipsum είναι απλά ένα κείμενο χωρίς νόημα για τους επαγγελματίες ',
    viewOnMenu: true,
    path: ['models'],
    group: 'Models Comparison',
  },
];

const filteredPerms = perms.filter(({group}) => group);

const groupedPerms = groupBy(({group}) => group, filteredPerms);
// const allPerms = pluck('permissions', perms);
// console.log(allPerms)
const menuItems = groupBy(
  ({section}) => section,
  perms.filter(({viewOnMenu}) => viewOnMenu)
);

export {groupedPerms, menuItems};
