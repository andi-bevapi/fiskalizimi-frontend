
import CategoryIcon from '@mui/icons-material/Category'; //category
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory'; //pikat e shitjes
import StorefrontIcon from '@mui/icons-material/Storefront';; //furnitoret
import SquareFootIcon from '@mui/icons-material/SquareFoot'; //njesite e shitjes

export const navItems = [
  {
    title: "Faqja kryesore",
    path: "/"
  },
  {
    title: "Produktet",
    path: "/produktet",
    access: 'canViewProduct',
    hasSubItems: true,
    subItems: [
      {
        title: "Kategorite",
        path: "/kategorite",
        access: 'canViewCategory',
        icon: (<CategoryIcon style={{color: 'white'}}/>)
      },
      {
        title: "Njesite matese",
        path: "/njesite-shitjes",
        access: 'canViewSellingUnit',
        icon: (<SquareFootIcon style={{color: 'white'}}/>)
      },
      {
        title: "Furnitoret",
        path: "/furnitoret",
        access: 'canViewSupplier',
        icon: (<StorefrontIcon style={{color: 'white'}}/>)
      },
      {
        title: "Pikat e shitjes",
        path: "/pikat-shitjes",
        access: 'canViewBranch',
        icon: (<StoreMallDirectoryIcon style={{color: 'white'}}/>)
      },
    ]
  }, 
  {
    title: "Arkat",
    path: "/arka-list",
    access: 'canViewArka'
  },
  {
    title: "Faturat",
    path: "/faturat",
  },
  {
    title: "Raportet",
    path: "/raportet",
    access: 'canViewReports'
  },
  {
    title: "Perdoruesit",
    path: "/perdoruesit",
    access: 'canViewUser'
  },
  // {
  //   title: "Arkat",
  //   path: "/arka-list",
  //   access: 'canViewArka'
  // },
  {
    title: "Konfigurime",
    path: "/konfigurime",
  },
  {
    title: "Arka",
    path: "/arka",
  }
];
