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
    to: '/forms',
    label: 'Laptops',
    icon: mdiLaptop 
  },
  {
    to: '/ui',
    label: 'Users',
    icon: mdiAccountMultiple
  },
]
