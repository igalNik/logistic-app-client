import { lazy } from 'react';

const Icons = {
  Menu: lazy(() => import('@mui/icons-material/Menu')),
  CloseMenu: lazy(() => import('@mui/icons-material/RemoveOutlined')),
  People: lazy(() => import('@mui/icons-material/People')),
  Paragliding: lazy(() => import('@mui/icons-material/Paragliding')),
  Inventory: lazy(() => import('@mui/icons-material/Inventory')),
  Signature: lazy(() => import('@mui/icons-material/Draw')),
  ArrowLeft: lazy(() => import('@mui/icons-material/ArrowBackIosNewOutlined')),
  ArrowRight: lazy(() => import('@mui/icons-material/ArrowForwardIosOutlined')),
  Gift: lazy(() => import('@mui/icons-material/RedeemOutlined')),
  User: lazy(() => import('@mui/icons-material/AccountCircle')),
  Logout: lazy(() => import('@mui/icons-material/PowerSettingsNew')),
  Profile: lazy(() => import('@mui/icons-material/PermIdentity')),
  Search: lazy(() => import('@mui/icons-material/Search')),
  Sort: lazy(() => import('@mui/icons-material/SortRounded')),
  Add: lazy(() => import('@mui/icons-material/Add')),
  Department: lazy(() => import('@mui/icons-material/CorporateFare')),
  Home: lazy(() => import('@mui/icons-material/HomeRounded')),
  Close: lazy(() => import('@mui/icons-material/Close')),
};

export default Icons;
