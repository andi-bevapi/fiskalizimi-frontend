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
        icon: 'CategoryIcon'
      },
      {
        title: "Njesite matese",
        path: "/njesite-shitjes",
        access: 'canViewSellingUnit',
        icon: 'SquareFootIcon'
      },
      {
        title: "Furnitoret",
        path: "/furnitoret",
        access: 'canViewSupplier',
        icon: 'StorefrontIcon'
      },
      {
        title: "Pikat e shitjes",
        path: "/pikat-shitjes",
        access: 'canViewBranch',
        icon: 'StoreMallDirectoryIcon'
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
