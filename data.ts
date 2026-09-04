
import { Project, AboutData, HomeData, ContactData } from './types';

export const INITIAL_HOME: HomeData = {
  name: 'Heeji Woo',
  professionalTitle: '',
  description: '',
  heroVideoUrl: 'https://player.vimeo.com/video/1210744531',
  portfolioPdfUrl: '/pdf/Portfolio.pdf',
  resumePdfUrl: '/pdf/Resume.pdf',
  backgroundGifUrl: '/video/Home_Background.mp4'
};

export const INITIAL_PROJECTS: Project[] = [
  {
    id: '5',
    title: 'SOL: Enchant',
    role: 'Armor Modeling & Texturing',
    year: '2025',
    workTime: 'Modelling - 1 Month\nTexturing - 1 Week',
    projectType: 'Production Work',
    toolsUsed: ['Maya', 'ZBrush', 'Substance 3D Painter', 'Unreal Engine 5'],
    thumbnail: 'https://cdna.artstation.com/p/assets/images/images/097/396/300/large/hj_w-cinematic-2.jpg?1774035114',
    description: 'High-resolution character rebuilt from the original game model, with improved form and more defined anatomical structure.\nCreated for Netmarble’s SOL: Enchant cinematic, the costume focuses on complex ornamentation and rich surface detail. All elements were fully modeled in geometry, with subtle depth variation to enhance dimensionality and avoid flatness.',
    detailRenders: [
      'https://cdna.artstation.com/p/assets/images/images/097/396/318/large/hj_w-cinematic-6.jpg?1774035157',
      'https://cdna.artstation.com/p/assets/images/images/097/396/300/large/hj_w-cinematic-2.jpg?1774035114',
      'https://cdnb.artstation.com/p/assets/images/images/097/396/323/large/hj_w-cinematic-7.jpg?1774035167',
      'https://cdna.artstation.com/p/assets/images/images/097/396/296/large/hj_w-cinematic-1.jpg?1774035104',
      'https://cdnb.artstation.com/p/assets/images/images/097/396/295/large/hj_w-cinematic.jpg?1774035093',
      'https://cdna.artstation.com/p/assets/images/images/097/396/326/large/hj_w-cinematic-8.jpg?1774035178',
      '/images/sol/beauty-cinematic-01.png',
      '/images/sol/beauty-cinematic-02.png',
      '/images/sol/beauty-cinematic-03.png'
    ],
    clayRenders: [
      '/images/sol/clay-20260903/ScreenShot00009.png',
      '/images/sol/clay-20260903/ScreenShot00005.png',
      '/images/sol/clay-20260903/ScreenShot00001.png',
      '/images/sol/clay-20260903/ScreenShot00004.png',
      '/images/sol/clay-20260903/ScreenShot00002.png'
    ],
    wireframes: [
      'https://cdna.artstation.com/p/assets/images/images/099/540/170/large/hj_w-sol-main-wire01.jpg?1780262015',
      'https://cdna.artstation.com/p/assets/images/images/099/540/160/large/hj_w-sol-main-wire03.jpg?1780262001',
      'https://cdna.artstation.com/p/assets/images/images/099/540/162/large/hj_w-sol-main-wire04.jpg?1780262004',
      'https://cdna.artstation.com/p/assets/images/images/099/540/164/large/hj_w-sol-main-wire05.jpg?1780262007'
    ],
    uvLayouts: [
      'https://cdna.artstation.com/p/assets/images/images/099/540/184/large/hj_w-sol-main-uv01.jpg?1780262029',
      'https://cdna.artstation.com/p/assets/images/images/099/540/188/large/hj_w-sol-main-uv02.jpg?1780262040',
      'https://cdna.artstation.com/p/assets/images/images/099/540/190/large/hj_w-sol-main-uv03.jpg?1780262047',
      'https://cdnb.artstation.com/p/assets/images/images/099/540/193/large/hj_w-sol-main-uv04.jpg?1780262052',
      'https://cdnb.artstation.com/p/assets/images/images/099/540/195/large/hj_w-sol-main-uv05.jpg?1780262058',
      'https://cdnb.artstation.com/p/assets/images/images/099/540/199/large/hj_w-sol-main-uv06.jpg?1780262064',
      'https://cdnb.artstation.com/p/assets/images/images/099/540/203/large/hj_w-sol-main-uv07.jpg?1780262071',
      'https://cdnb.artstation.com/p/assets/images/images/099/540/209/large/hj_w-sol-main-uv08.jpg?1780262077',
      'https://cdnb.artstation.com/p/assets/images/images/099/540/213/large/hj_w-sol-main-uv09.jpg?1780262084',
      'https://cdnb.artstation.com/p/assets/images/images/099/540/215/large/hj_w-sol-main-uv10.jpg?1780262092',
      'https://cdna.artstation.com/p/assets/images/images/099/540/224/large/hj_w-sol-main-uv11.jpg?1780262098',
      'https://cdnb.artstation.com/p/assets/images/images/099/540/229/large/hj_w-sol-main-uv12.jpg?1780262112',
      'https://cdna.artstation.com/p/assets/images/images/099/540/232/large/hj_w-sol-main-uv13.jpg?1780262119',
      'https://cdna.artstation.com/p/assets/images/images/099/540/234/large/hj_w-sol-main-uv14.jpg?1780262125'
    ],
    references: [],
    mainVideoUrl: 'https://www.youtube.com/embed/jRykO-HJfYM',
    additionalVideoUrls: [
      'https://www.youtube.com/embed/zXLYcIOoPEQ',
      'https://www.youtube.com/embed/nUynsG89Y3Q'
    ],
    turntableVideoUrl: '',
    technicalBreakdown: ''
  },
  {
    id: '4',
    title: 'Chosun Classic',
    role: 'Costume Modeling & Texturing',
    year: '2025',
    workTime: 'Modelling - 1 Week\nTexturing - 1 Week',
    projectType: 'Production Work',
    toolsUsed: ['Maya', 'Marvelous Designer', 'Substance 3D Painter', 'Unreal Engine'],
    thumbnail: 'https://cdna.artstation.com/p/assets/images/images/097/420/870/large/hj_w-js-thumnail.jpg?1774129584',
    description: 'Designed and developed a character costume based on traditional Korean Hanbok for a cinematic project. Responsible for modeling and texturing, with a focus on material accuracy and realistic detail.',
    detailRenders: [
      'https://cdna.artstation.com/p/assets/images/images/097/420/870/large/hj_w-js-thumnail.jpg?1774129584',
      'https://cdnb.artstation.com/p/assets/images/images/099/722/211/large/hj_w-1.jpg?1780789406',
      'https://cdna.artstation.com/p/assets/images/images/099/722/214/large/hj_w-.jpg?1780789416'
    ],
    clayRenders: [
      'https://cdna.artstation.com/p/assets/images/images/099/721/836/large/hj_w-clay-a.jpg?1780787323'
    ],
    wireframes: [
      'https://cdnb.artstation.com/p/assets/images/images/099/721/831/large/hj_w-wire-a.jpg?1780787314'
    ],
    uvLayouts: [
      'https://cdna.artstation.com/p/assets/images/images/099/721/838/large/hj_w-uv-u1-v1.jpg?1780787331',
      'https://cdnb.artstation.com/p/assets/images/images/099/721/839/large/hj_w-uv-u2-v1.jpg?1780787338',
      'https://cdna.artstation.com/p/assets/images/images/099/721/840/large/hj_w-uv-u3-v1.jpg?1780787344',
      'https://cdnb.artstation.com/p/assets/images/images/099/721/841/large/hj_w-uv-u4-v1.jpg?1780787350',
      'https://cdna.artstation.com/p/assets/images/images/099/721/842/large/hj_w-uv-u5-v1.jpg?1780787355',
      'https://cdnb.artstation.com/p/assets/images/images/099/721/843/large/hj_w-uv-u6-v1.jpg?1780787361',
      'https://cdna.artstation.com/p/assets/images/images/099/721/844/large/hj_w-uv-u7-v1.jpg?1780787367',
      'https://cdnb.artstation.com/p/assets/images/images/099/721/845/large/hj_w-uv-u8-v1.jpg?1780787373'
    ],
    references: [],
    mainVideoUrl: 'https://www.youtube.com/embed/TvPRQo9aEEk',
    turntableVideoUrl: '',
    technicalBreakdown: ''
  },
  {
    id: '3',
    title: 'STYLISH BEAST',
    role: 'Creature Modeling & Grooming & Texturing',
    year: '2024',
    workTime: 'Modelling - 2 Weeks\nTexturing - 3 Days\nFur - 3 Days',
    projectType: 'Personal Work',
    toolsUsed: ['Maya', 'Zbrush', 'Substance 3D Painter', 'knald', 'Photoshop', 'Illustrator', 'Autodesk Arnold'],
    thumbnail: 'https://cdna.artstation.com/p/assets/images/images/080/598/110/large/hj_w-gorilla.jpg?1727982190',
    description: 'A character based on an existing artist’s original ape creature design, reinterpreted with a fashion forward concept. Focus was placed on integrating surface details such as tattoos, grooming, and accessories to enhance character identity.',
    detailRenders: [
      'https://cdnb.artstation.com/p/assets/images/images/080/598/079/large/hj_w-gorilla-1.jpg?1727982134',
      'https://cdna.artstation.com/p/assets/images/images/080/598/084/large/hj_w-gorilla-3.jpg?1727982144',
      'https://cdna.artstation.com/p/assets/images/images/080/598/092/large/hj_w-gorilla-2.jpg?1727982164',
      'https://cdnb.artstation.com/p/assets/images/images/080/598/103/large/hj_w-gorilla-4.jpg?1727982175',
      'https://cdna.artstation.com/p/assets/images/images/080/598/110/large/hj_w-gorilla.jpg?1727982190'
    ],
    clayRenders: [
      'https://cdnb.artstation.com/p/assets/images/images/080/598/113/large/hj_w-gg1.jpg?1727982206',
      'https://cdna.artstation.com/p/assets/images/images/080/598/114/large/hj_w-gg2.jpg?1727982211',
      'https://cdnb.artstation.com/p/assets/images/images/080/598/117/large/hj_w-gg3.jpg?1727982215',
      'https://cdna.artstation.com/p/assets/images/images/080/598/120/large/hj_w-gg5.jpg?1727982227',
      'https://cdnb.artstation.com/p/assets/images/images/080/598/125/large/hj_w-gg6.jpg?1727982233',
      'https://cdna.artstation.com/p/assets/images/images/080/598/132/large/hj_w-gg8.jpg?1727982239',
      'https://cdna.artstation.com/p/assets/images/images/080/598/136/large/hj_w-gg9.jpg?1727982246'
    ],
    wireframes: [
      'https://cdnb.artstation.com/p/assets/images/images/097/426/087/large/hj_w-ape-wire-3.jpg?1774158165',
      'https://cdnb.artstation.com/p/assets/images/images/097/426/089/large/hj_w-ape-wire-1.jpg?1774158174',
      'https://cdna.artstation.com/p/assets/images/images/097/426/090/large/hj_w-ape-wire-2.jpg?1774158182'
    ],
    uvLayouts: [
      'https://cdna.artstation.com/p/assets/images/images/097/420/778/large/hj_w-ape-uv01.jpg?1774129260',
      'https://cdna.artstation.com/p/assets/images/images/097/420/790/large/hj_w-ape-uv02.jpg?1774129286',
      'https://cdnb.artstation.com/p/assets/images/images/097/420/797/large/hj_w-ape-uv03.jpg?1774129312',
      'https://cdna.artstation.com/p/assets/images/images/097/420/804/large/hj_w-ape-uv04.jpg?1774129333',
      'https://cdna.artstation.com/p/assets/images/images/097/420/812/large/hj_w-ape-uv05.jpg?1774129365',
      'https://cdna.artstation.com/p/assets/images/images/097/420/816/large/hj_w-ape-uv06.jpg?1774129392',
      'https://cdna.artstation.com/p/assets/images/images/097/420/822/large/hj_w-ape-uv07.jpg?1774129416',
      'https://cdnb.artstation.com/p/assets/images/images/097/420/827/large/hj_w-ape-uv08.jpg?1774129441'
    ],
    references: [
      'https://cdnb.artstation.com/p/assets/images/images/097/421/061/large/hj_w-rf.jpg?1774130221'
    ],
    mainVideoUrl: 'https://player.vimeo.com/video/1178017692',
    turntableVideoUrl: 'https://player.vimeo.com/video/1175810875',
    technicalBreakdown: ''
  },
  {
    id: '2',
    title: 'Carey Mulligan',
    role: 'Character Modeling & Grooming & Texturing',
    year: '2023-2024',
    workTime: 'Modelling - 2 Months\nTexturing - 1 Month',
    projectType: 'Personal Work',
    toolsUsed: ['Maya', 'Zbrush', 'Substance 3D Painter', 'Marvelous Designer', 'knald', 'Illustrator', 'Photoshop', 'Autodesk Arnold'],
    thumbnail: 'https://cdna.artstation.com/p/assets/images/images/080/597/320/large/hj_w-outputoutput-srgb.jpg?1727980772',
    description: 'A realistic character inspired by Carey Mulligan, developed with a focus on natural facial features and overall believability. Designed with an officer concept, with detailed costume work and surface development to support a refined and cohesive look.',
    detailRenders: [
      'https://cdna.artstation.com/p/assets/images/images/080/597/320/large/hj_w-outputoutput-srgb.jpg?1727980772',
      'https://cdna.artstation.com/p/assets/images/images/080/597/328/large/hj_w-careym-3.jpg?1727980781',
      'https://cdna.artstation.com/p/assets/images/images/080/597/338/large/hj_w-careym-1.jpg?1727980794',
      'https://cdna.artstation.com/p/assets/images/images/080/597/348/large/hj_w-careym-2.jpg?1727980810'
    ],
    clayRenders: [
      'https://cdnb.artstation.com/p/assets/images/images/080/597/693/large/hj_w-artboard-1.jpg?1727981448',
      'https://cdnb.artstation.com/p/assets/images/images/080/597/707/large/hj_w-careym5.jpg?1727981473',
      'https://cdnb.artstation.com/p/assets/images/images/080/597/709/large/hj_w-careym6.jpg?1727981480',
      'https://cdnb.artstation.com/p/assets/images/images/080/597/711/large/hj_w-careym7.jpg?1727981484'
    ],
    wireframes: [
      'https://cdna.artstation.com/p/assets/images/images/097/426/100/large/hj_w-careym-wire.jpg?1774158280'
    ],
    uvLayouts: [
      'https://cdna.artstation.com/p/assets/images/images/097/432/376/large/hj_w-uv01.jpg?1774183849',
      'https://cdna.artstation.com/p/assets/images/images/097/432/384/large/hj_w-uv02.jpg?1774183887',
      'https://cdnb.artstation.com/p/assets/images/images/097/432/385/large/hj_w-uv03.jpg?1774183919',
      'https://cdna.artstation.com/p/assets/images/images/097/432/400/large/hj_w-uv04.jpg?1774183940',
      'https://cdna.artstation.com/p/assets/images/images/097/432/414/large/hj_w-uv05.jpg?1774183972',
      'https://cdnb.artstation.com/p/assets/images/images/097/432/431/large/hj_w-uv06.jpg?1774184004',
      'https://cdna.artstation.com/p/assets/images/images/097/432/760/large/hj_w-uv07.jpg?1774185011',
      'https://cdnb.artstation.com/p/assets/images/images/097/432/689/large/hj_w-uv08.jpg?1774184835',
      'https://cdna.artstation.com/p/assets/images/images/097/432/696/large/hj_w-uv09.jpg?1774184863',
      'https://cdna.artstation.com/p/assets/images/images/097/432/704/large/hj_w-uv10.jpg?1774184890'
    ],
    references: [
      'https://cdnb.artstation.com/p/assets/images/images/097/421/081/large/hj_w-rf.jpg?1774130457'
    ],
    mainVideoUrl: 'https://player.vimeo.com/video/1178017734',
    turntableVideoUrl: 'https://player.vimeo.com/video/1175810906',
    technicalBreakdown: ''
  },
  {
    id: '1',
    title: 'EVANGELION Unit-01',
    role: 'Hard Surface & Environment Art',
    year: '2023',
    workTime: 'Modelling - 1 Month and 1 Week\nTexturing - 1 Month',
    projectType: 'Personal Work',
    toolsUsed: ['Maya', 'Zbrush', 'Substance 3D Painter', 'Illustrator', 'Vray'],
    thumbnail: 'https://cdna.artstation.com/p/assets/images/images/080/582/824/large/hj_w-eva-01.jpg?1727954201',
    description: 'Inspired by Neon Genesis Evangelion and the work of MILITELLO Florian, this scene reinterprets Unit-01 within a post apocalyptic setting. It presents an alternate outcome where the unit remains abandoned, focusing on environmental storytelling, lighting, and cinematic mood.',
    descriptionCredit: { name: 'MILITELLO Florian', url: 'https://www.artstation.com/artwork/XnYrPl' },
    detailRenders: [
      'https://cdna.artstation.com/p/assets/images/images/080/582/824/large/hj_w-eva-01.jpg?1727954201',
      'https://cdna.artstation.com/p/assets/images/images/080/582/828/large/hj_w-eva-01-1.jpg?1727954225',
      'https://cdna.artstation.com/p/assets/images/images/080/582/938/large/hj_w-eva-01-2.jpg?1727954502',
      'https://cdnb.artstation.com/p/assets/images/images/080/582/945/large/hj_w-eva-01-3.jpg?1727954516',
      'https://cdnb.artstation.com/p/assets/images/images/080/582/973/large/hj_w-eva-01-4.jpg?1727954584'
    ],
    clayRenders: [
      'https://cdnb.artstation.com/p/assets/images/images/096/450/231/large/hj_w-eva-ao-wire-2.webp?1771366517',
      'https://cdna.artstation.com/p/assets/images/images/096/450/234/large/hj_w-eva-ao-wire-4.webp?1771366527',
      'https://cdnb.artstation.com/p/assets/images/images/096/450/243/large/hj_w-eva-ao-wire-6.webp?1771366539',
      'https://cdnb.artstation.com/p/assets/images/images/096/450/251/large/hj_w-eva-ao-wire.webp?1771366559'
    ],
    wireframes: [
      'https://cdnb.artstation.com/p/assets/images/images/096/450/211/large/hj_w-eva-ao-wire-1.webp?1771366470',
      'https://cdnb.artstation.com/p/assets/images/images/096/450/217/large/hj_w-eva-ao-wire-3.webp?1771366482',
      'https://cdnb.artstation.com/p/assets/images/images/096/450/219/large/hj_w-eva-ao-wire-5.webp?1771366493',
      'https://cdnb.artstation.com/p/assets/images/images/096/450/227/large/hj_w-eva-ao-wire-7.webp?1771366505'
    ],
    uvLayouts: [
      'https://cdna.artstation.com/p/assets/images/images/097/421/618/large/hj_w-uv01.jpg?1774132720',
      'https://cdnb.artstation.com/p/assets/images/images/097/421/621/large/hj_w-uv02.jpg?1774132742',
      'https://cdna.artstation.com/p/assets/images/images/097/421/624/large/hj_w-uv03.jpg?1774132763',
      'https://cdnb.artstation.com/p/assets/images/images/097/421/627/large/hj_w-uv04.jpg?1774132787',
      'https://cdna.artstation.com/p/assets/images/images/097/421/628/large/hj_w-uv05.jpg?1774132809',
      'https://cdnb.artstation.com/p/assets/images/images/097/421/633/large/hj_w-uv06.jpg?1774132829',
      'https://cdna.artstation.com/p/assets/images/images/097/421/636/large/hj_w-uv07.jpg?1774132853',
      'https://cdnb.artstation.com/p/assets/images/images/097/421/641/large/hj_w-uv08.jpg?1774132878',
      'https://cdnb.artstation.com/p/assets/images/images/097/421/643/large/hj_w-uv09.jpg?1774132902',
      'https://cdnb.artstation.com/p/assets/images/images/097/421/647/large/hj_w-uv10.jpg?1774132931',
      'https://cdna.artstation.com/p/assets/images/images/097/421/652/large/hj_w-uv11.jpg?1774132952',
      'https://cdnb.artstation.com/p/assets/images/images/097/421/655/large/hj_w-uv12.jpg?1774132977',
      'https://cdna.artstation.com/p/assets/images/images/097/421/658/large/hj_w-uv13.jpg?1774133001',
      'https://cdna.artstation.com/p/assets/images/images/097/421/664/large/hj_w-uv14.jpg?1774133025',
      'https://cdnb.artstation.com/p/assets/images/images/097/421/667/large/hj_w-uv15.jpg?1774133048',
      'https://cdna.artstation.com/p/assets/images/images/097/421/670/large/hj_w-uv16.jpg?1774133069',
      'https://cdna.artstation.com/p/assets/images/images/097/421/674/large/hj_w-uv17.jpg?1774133091',
      'https://cdnb.artstation.com/p/assets/images/images/097/421/677/large/hj_w-uv18.jpg?1774133117',
      'https://cdnb.artstation.com/p/assets/images/images/097/421/683/large/hj_w-uv19.jpg?1774133139',
      'https://cdnb.artstation.com/p/assets/images/images/097/421/687/large/hj_w-uv20.jpg?1774133161',
      'https://cdna.artstation.com/p/assets/images/images/097/421/694/large/hj_w-uv21.jpg?1774133185',
      'https://cdnb.artstation.com/p/assets/images/images/097/421/701/large/hj_w-uv22.jpg?1774133208',
      'https://cdna.artstation.com/p/assets/images/images/097/421/716/large/hj_w-uv23.jpg?1774133235',
      'https://cdnb.artstation.com/p/assets/images/images/097/421/729/large/hj_w-uv24.jpg?1774133261',
      'https://cdna.artstation.com/p/assets/images/images/097/421/738/large/hj_w-uv25.jpg?1774133287',
      'https://cdna.artstation.com/p/assets/images/images/097/421/748/large/hj_w-uv26.jpg?1774133314',
      'https://cdna.artstation.com/p/assets/images/images/097/421/760/large/hj_w-uv27.jpg?1774133339',
      'https://cdnb.artstation.com/p/assets/images/images/097/421/769/large/hj_w-uv28.jpg?1774133360',
      'https://cdna.artstation.com/p/assets/images/images/097/421/774/large/hj_w-uv29.jpg?1774133391'
    ],
    references: [
      'https://cdnb.artstation.com/p/assets/images/images/097/421/057/large/hj_w-rf.jpg?1774130179'
    ],
    mainVideoUrl: 'https://player.vimeo.com/video/1178017778',
    turntableVideoUrl: 'https://player.vimeo.com/video/1165819719',
    technicalBreakdown: ''
  },
  {
    id: 'additional-work',
    title: 'Additional Work',
    role: 'Asset & Ornament Modeling',
    year: '2025',
    workTime: 'Modelling - 2-3 Days per asset\nTexturing - 1 Day',
    projectType: 'Personal & Cinematic Assets',
    toolsUsed: ['Maya', 'Substance 3D Painter', 'Unreal Engine 5'],
    thumbnail: 'https://cdna.artstation.com/p/assets/images/images/099/723/176/large/hj_w-.jpg?1780794018',
    description: 'Fantasy shield (Raven) and cinematic character accessories (Valhalla survival) created with a focus on ornamental modeling, surface detailing, and material readability.',
    detailRenders: [],
    clayRenders: [],
    wireframes: [],
    uvLayouts: [],
    references: []
  }
];

export const INITIAL_ABOUT: AboutData = {
  intro: "3D Modeler with production experience in game cinematics and VFX, creating characters, creatures, hard-surface assets, props, and costumes.\nSkilled in modeling, sculpting, texturing, grooming, and look development, delivering hero characters and key assets from modeling to final look.\nExperienced in rebuilding assets from game models, scan data, and concept images while preserving the original design.\nFocused on strong forms, clean topology, and production-ready assets for animation and close-up shots.",
  profileImage: '',
  skills: ['3D Modeling', 'Hard Surface Modeling', 'Character Modeling', 'Creature Modeling', 'Prop Modeling', 'Costume Modeling', 'Digital Sculpting', 'Texturing', 'Look Development', 'Hair Grooming', 'Hair Simulation'],
  tools: [
    { 
      category: 'Sculpting & Modeling', 
      items: ['Maya', 'ZBrush', 'Marvelous Designer', 'Houdini (Groom)'] 
    },
    { 
      category: 'Lookdev & Texturing', 
      items: ['Substance 3D Painter', 'Autodesk Arnold', 'Unreal Engine', 'Photoshop'] 
    },
    { 
      category: 'Additional', 
      items: ['Adobe After Effects', 'Adobe Premiere Pro', 'Adobe Illustrator'] 
    }
  ],
  experience: [
    {
      id: 'exp2',
      company: 'Coot Imageworks',
      role: '3D Modeler',
      period: '2025 - 2026',
      description: 'Worked on character and asset modeling, costume creation, texturing, and hair grooming for game cinematic projects.',
      location: 'Bucheon, South Korea'
    },
    {
      id: 'exp1',
      company: 'Westworld',
      role: '3D Modeler',
      period: '2024 - 2025',
      description: 'Worked on mechanical models, environment assets, and props for feature film VFX production.',
      location: 'Goyang, South Korea'
    }
  ],
  education: [
    {
      degree: '3D Modeling Professional Program',
      institution: 'CG5 Academy',
      year: '2022 - 2024',
      location: 'Seoul, South Korea'
    },
    {
      degree: 'BFA | Industrial Design',
      institution: 'Sungshin Women’s University',
      year: '2018 - 2023',
      location: 'Seoul, South Korea'
    }
  ]
};

export const INITIAL_CONTACT: ContactData = {
  email: 'woohj2325@gmail.com',
  artstationUrl: 'https://www.artstation.com/hjhj9798',
  linkedinUrl: 'https://www.linkedin.com/in/heeji-woo/'
};
