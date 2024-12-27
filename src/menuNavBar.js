import {
  mdiLogout,
} from '@mdi/js'

export default [

  {
    isCurrentUser: true,
    menu: [

      {
        isDivider: true
      },
      {
        icon: mdiLogout,
        label: 'Log Out',
        isLogout: true
      }
    ]
  },
  {
    icon: mdiLogout,
    label: 'Log out',
    isDesktopNoLabel: true,
    isLogout: true
  }
]
