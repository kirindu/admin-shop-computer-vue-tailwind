import {
  mdiMonitorDashboard ,
  mdiLaptop ,
  mdiAccountMultiple 
} from '@mdi/js'

export default [
  {
    to: '/dashboard',
    icon: mdiMonitorDashboard ,
    label: 'Dashboard'
  },
  {
    to: '/shop',
    label: 'Laptops',
    icon: mdiLaptop 
  },
  {
    to: '/user',
    label: 'Users',
    icon: mdiAccountMultiple
  },
]
