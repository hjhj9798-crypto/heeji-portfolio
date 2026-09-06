interface ExtraImage {
  category: 'Beauty' | 'Clay & Zbrush' | 'Wireframe' | 'UV layout';
  url: string;
}

export interface ExtraProjectData {
  id: string;
  title: string;
  role: string;
  year: string;
  tools: string;
  duration?: string;
  description: string;
  images: ExtraImage[];
  hairVideos?: string[];
  beautyVideos?: string[];
  videoClips?: string[];
  youtubeUrl?: string;
}

export const EXTRA_PROJECTS: ExtraProjectData[] = [
  {
    id: 'extra01',
    title: 'SOL: Enchant – Extra 01',
    role: 'Character Design & Facial Modeling & Texturing',
    year: '2025',
    tools: 'Maya / ZBrush / Substance 3D Painter / Unreal Engine 5',
    duration: 'Modelling - 3 Days / Texturing - 1 Day',
    description: 'This project highlights another contribution I made to SOL: Enchant during my time as a 3D Modeler at CooT Imageworks.\n\nSupporting character facial model for the SOL: Enchant cinematic trailer. The character was designed and developed by me, with a focus on realistic anatomy, skin detail, and battle-worn surface treatment.',
    images: [
      { category: 'Beauty', url: 'https://cdna.artstation.com/p/assets/images/images/099/718/896/large/hj_w-1.jpg?1780776058' },
      { category: 'Beauty', url: 'https://cdna.artstation.com/p/assets/images/images/099/539/704/large/hj_w-sol01-butty01.jpg?1780260797' },
      { category: 'Beauty', url: 'https://cdna.artstation.com/p/assets/images/images/099/539/710/large/hj_w-sol01-butty03.jpg?1780260807' },
      { category: 'Beauty', url: 'https://cdnb.artstation.com/p/assets/images/images/099/539/799/large/hj_w-sol01-butty04.jpg?1780261073' },
      { category: 'Clay & Zbrush', url: 'https://cdna.artstation.com/p/assets/images/images/099/721/344/large/hj_w-.jpg?1780784892' },
      { category: 'Wireframe', url: 'https://cdna.artstation.com/p/assets/images/images/099/539/750/large/hj_w-sol01-wire01.jpg?1780260904' },
      { category: 'UV layout', url: 'https://cdnb.artstation.com/p/assets/images/images/099/539/747/large/hj_w-sol01-uv.jpg?1780260853' }
    ]
  },
  {
    id: 'extra02',
    title: 'SOL: Enchant – Extra 02',
    role: 'Armor & Costume Modeling',
    year: '2025',
    tools: 'Maya / ZBrush / Unreal Engine 5',
    duration: 'Modelling - 1 Week',
    description: 'This was an additional SOL: Enchant assignment I completed while working as a 3D Modeler at CooT Imageworks.\n\nArmor and costume model rebuilt from a client-provided game asset for the SOL: Enchant cinematic trailer. Focused on form refinement, secondary detail enhancement, and cinematic-quality asset development.',
    images: [
      { category: 'Beauty', url: 'https://cdnb.artstation.com/p/assets/images/images/099/718/743/large/hj_w-5.jpg?1780775568' },
      { category: 'Clay & Zbrush', url: 'https://cdna.artstation.com/p/assets/images/images/099/539/990/large/hj_w-clray.jpg?1780261576' },
      { category: 'Wireframe', url: 'https://cdnb.artstation.com/p/assets/images/images/099/539/983/large/hj_w-sol02-wire.jpg?1780261562' },
      { category: 'UV layout', url: 'https://cdnb.artstation.com/p/assets/images/images/099/539/963/large/hj_w-sol02-uv01.jpg?1780261535' },
      { category: 'UV layout', url: 'https://cdna.artstation.com/p/assets/images/images/099/539/968/large/hj_w-sol02-uv02.jpg?1780261541' },
      { category: 'UV layout', url: 'https://cdnb.artstation.com/p/assets/images/images/099/539/971/large/hj_w-sol02-uv03.jpg?1780261549' },
      { category: 'UV layout', url: 'https://cdnb.artstation.com/p/assets/images/images/099/539/975/large/hj_w-sol02-uv04.jpg?1780261556' }
    ]
  }
];

export const ADDITIONAL_WORK_EXTRA_PROJECTS: ExtraProjectData[] = [
  ...EXTRA_PROJECTS,
  {
    id: 'raven',
    title: 'Raven 2 – Deathbringer',
    role: 'Asset Modeling & Texturing',
    year: '2025',
    tools: 'Maya / Substance 3D Painter / Unreal Engine 5',
    duration: 'Modelling - 2 Days / Texturing - 1 Day',
    description: 'While working with CooT Imageworks as a 3D Modeler, I contributed to the Deathbringer cinematic for RAVEN 2, developed by Netmarble Monster and published by Netmarble.\n\nFantasy shield created for a cinematic trailer, with a focus on ornamental modeling, surface detailing, and texturing various materials.',
    images: [
      { category: 'Beauty', url: 'https://cdna.artstation.com/p/assets/images/images/099/723/176/large/hj_w-.jpg?1780794018' },
      { category: 'Beauty', url: 'https://cdna.artstation.com/p/assets/images/images/099/723/258/large/hj_w-3.jpg?1780794377' },
      { category: 'Beauty', url: 'https://cdnb.artstation.com/p/assets/images/images/099/723/253/large/hj_w-4.jpg?1780794362' },
      { category: 'Clay & Zbrush', url: '/images/raven2/clay-front.png' },
      { category: 'Clay & Zbrush', url: '/images/raven2/clay-back.png' }
    ],
    youtubeUrl: 'https://youtu.be/3cZzkhyeNJM?si=E4JO3QbJj8XDL2KN'
  },
  {
    id: 'valhalla_survival',
    title: 'Valhalla Survival',
    role: 'Ornament Modeling, Hair Simulation & Creature Sculpting, Texturing and Look Development',
    year: '2025',
    tools: 'Maya / ZBrush / Substance 3D Painter / Unreal Engine 5',
    duration: 'Modelling - 3 Days',
    description: 'At CooT Imageworks, I had the opportunity to contribute as a 3D Modeler to the cinematic production of Valhalla Survival, developed by LIONHEART STUDIO.\n\nCreated high-poly ornaments and shoes for the female cinematic character, with a focus on detailed modeling and clean topology, and contributed to parts of the hair simulation. For the monster character, I sculpted and textured the face and body and handled the look development.',
    images: [
      { category: 'Beauty', url: 'https://cdnb.artstation.com/p/assets/images/images/099/818/301/small/hj_w-4.jpg?1781054921' },
      { category: 'Beauty', url: 'https://cdna.artstation.com/p/assets/images/images/099/723/014/large/hj_w-1.jpg?1780793490' },
      { category: 'Beauty', url: 'https://cdnb.artstation.com/p/assets/images/images/099/723/013/large/hj_w-3.jpg?1780793481' },
      { category: 'Clay & Zbrush', url: 'https://cdnb.artstation.com/p/assets/images/images/099/722/993/large/hj_w-clay.jpg?1780793395' },
      { category: 'Wireframe', url: 'https://cdna.artstation.com/p/assets/images/images/099/722/992/large/hj_w-wire01.jpg?1780793386' }
    ],
    hairVideos: [
      '/video/valhalla/Hair_1.mp4',
      '/video/valhalla/Hair_2.mp4',
      '/video/valhalla/Hair_3.mp4'
    ],
    beautyVideos: ['/video/content-20260905/valhalla/Lion_04.mp4', '/video/content-20260905/valhalla/Lion_05.mp4', '/video/content-20260905/valhalla/Lion_03.mp4'],
    youtubeUrl: 'https://youtu.be/ZXod-0yUYfU?si=WS8RdCB7qCYfaFlv'
  },
  {
    id: 'architect',
    title: 'Architect',
    role: 'Book Modeling & Texturing',
    year: '2025',
    duration: '2 Days',
    tools: 'Maya / Substance 3D Painter / Unreal Engine 5',
    description: 'As a member of the 3D modeling team at CooT Imageworks, I contributed to the cinematic production of ARCHITECT, developed by AQUATREE.\n\nCreated a book asset, with a focus on modeling, textures, and small details.',
    images: [],
    beautyVideos: ['/video/architect/Book_3.mp4', '/video/architect/Book.mp4', '/video/architect/Book_2.mp4'],
    youtubeUrl: 'https://youtu.be/TMz7owMWn7I?si=YPLSORcX3p-AuGww'
  },
  {
    id: 'raven2-warlord',
    title: 'Raven 2 – Warlord',
    role: 'Hair Grooming & Simulation',
    year: '2026',
    duration: '1 Day',
    tools: 'Houdini / Unreal Engine 5',
    description: 'In my role as a 3D Modeler at CooT Imageworks, I worked on the Warlord cinematic for RAVEN 2, developed by Netmarble Monster and published by Netmarble.\n\nCreated the hair groom and simulation, with a focus on natural hair flow and movement.',
    images: [{ category: 'Beauty', url: '/images/raven2-warlord/Raven_Hair.png' }],
    hairVideos: ['/video/raven2-warlord/Hair.mp4'],
    youtubeUrl: 'https://youtu.be/5UCXGXjMLO4?si=k_-RBM49D8NlNzI3'
  },
  {
    id: 'vampir-cinematic-01',
    title: 'Vampir – Cinematic 01',
    role: 'Modeling & Texturing',
    year: '2026',
    duration: '2 Days',
    tools: 'Maya / Substance 3D Painter / Unreal Engine 5',
    description: 'While at CooT Imageworks, I worked as a 3D Modeler across multiple cinematic productions for Netmarble’s VAMPIR.\n\nModeled and textured a fantasy pillar for VAMPIR, with a focus on its shape, surface details, and worn materials.',
    images: [
      { category: 'Beauty', url: '/images/vampir-cinematic-01/beauty-01.png' },
      { category: 'Beauty', url: '/images/vampir-cinematic-01/beauty-02.png' },
      { category: 'Clay & Zbrush', url: '/images/vampir-cinematic-01/Clay.png' }
    ],
    videoClips: ['/video/vampir-cinematic-01/Pillar_2.mp4', '/video/vampir-cinematic-01/Pillar_3.mp4', '/video/vampir-cinematic-01/Pillar_4.mp4', '/video/vampir-cinematic-01/Pillar_1.mp4'],
    youtubeUrl: 'https://youtu.be/ImBzB6hcMiA?si=6gF21HjMjnq3S_Gv'
  },
  {
    id: 'vampir-cinematic-02',
    title: 'Vampir – Cinematic 02',
    role: 'Hair Grooming & Simulation',
    year: '2026',
    duration: '5 Days',
    tools: 'Houdini / Unreal Engine 5',
    description: 'At CooT Imageworks, my work as a 3D Modeler also included VAMPIR Cinematic 02, produced for Netmarble.\n\nCreated hair grooms and simulations for VAMPIR, with a focus on hair shape and natural movement.',
    images: [
      { category: 'Beauty', url: '/images/vampir-cinematic-02/Vampire_SN.png' },
      { category: 'Beauty', url: '/images/vampir-cinematic-02/Vampire_capture.png' },
      { category: 'Beauty', url: '/images/vampir-cinematic-02/Vampire_capture(1).png' }
    ],
    hairVideos: ['/video/vampir-cinematic-02/Woman_Hair_1.mp4', '/video/vampir-cinematic-02/Woman_Vampire_Hair.mp4', '/video/vampir-cinematic-02/Woman_Vampire_Hair_3.mp4', '/video/vampir-cinematic-02/Vampire_Hair.mp4'],
    youtubeUrl: 'https://youtu.be/gsYusPqwLx8?si=TioP_oTzlTiNTSrU'
  },
  {
    id: 'zeus',
    title: 'Zeus: God of Arrogance',
    role: 'Statue Modeling, Texturing, Look Development & Hair Simulation',
    year: '2026',
    tools: 'Houdini / ZBrush / Substance 3D Painter / Unreal Engine 5',
    description: 'My work at CooT Imageworks included contributing as a 3D Modeler to the cinematic production of ZEUS: God of Arrogance, developed by A Button and published by Com2uS.\n\nCreated and refined the statue assets through modeling, texturing, and look development for the cinematic production. I also contributed to hair grooming and simulation for multiple characters, focusing on natural movement and polished results for cinematic shots.',
    images: [
      { category: 'Beauty', url: '/images/zeus/beauty-01.png' },
      { category: 'Beauty', url: '/images/zeus/beauty-02.png' },
      { category: 'Beauty', url: '/images/zeus/beauty-03.png' },
      { category: 'Beauty', url: '/images/zeus/beauty-04.png' },
      { category: 'Beauty', url: '/images/zeus/beauty-05.png' }
    ],
    beautyVideos: ['/video/content-20260905/zeus/Zeus.mp4'],
    hairVideos: ['/video/zeus/Woman_Hair.mp4', '/video/zeus/Apolo_Hair.mp4', '/video/zeus/Archer_Hair_3.mp4', '/video/zeus/Man_Hair.mp4'],
    youtubeUrl: 'https://youtu.be/ZgpwqHiH5oc?si=bepKQxMQ99vb01No'
  }
];
