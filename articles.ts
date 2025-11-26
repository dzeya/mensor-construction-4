import articleOneRaw from './mensor_article_1_geodeziya.txt?raw';
import articleTwoRaw from './mensor_article_2_toposemka.txt?raw';
import articleThreeRaw from './mensor_article_3_BIM.txt?raw';
import articleFourRaw from './mensor_article_4_vynos_granits.txt?raw';

export type Article = {
  order: string;
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  readingTime: string;
  meta: string[];
  focus: string;
  content: string;
  images: { src: string; caption: string }[];
};

const stripIntroBlocks = (raw: string) => raw.trim().split(/\n{2,}/).slice(2).join('\n\n').trim();

export const articles: Article[] = [
  {
    order: '01',
    slug: 'geodeziya',
    title: 'Зачем нужна геодезия?',
    subtitle: 'Когда без топосъемки не дадут газ и зачем проверять границы перед покупкой земли',
    summary: 'Когда без топосъемки не дадут газ, и зачем проверять границы перед покупкой земли.',
    readingTime: '4 минуты',
    meta: ['Регион: Минск и вся Беларусь'],
    focus: 'Инженерные изыскания',
    content: stripIntroBlocks(articleOneRaw),
    images: [
      { src: '/illustrations/geo-lot-wireframe.jpg', caption: 'Изометрия участка с вайрфреймом дома и подсвеченными границами.' },
      { src: '/illustrations/geo-fence-overlap.jpg', caption: 'Ошибка наложения забора на соседний участок — зона перекрытия подсвечена.' },
    ],
  },
  {
    order: '02',
    slug: 'toposemka',
    title: 'Топосъемка: Цены и сроки',
    subtitle: 'От чего зависит смета и какие документы нужны для старта.',
    summary: 'От чего зависит смета и какие документы нужны для старта.',
    readingTime: '5 минут',
    meta: ['Услуга: топографическая съемка в Минске и Минской области'],
    focus: 'Топографическая съемка',
    content: stripIntroBlocks(articleTwoRaw),
    images: [
      { src: '/illustrations/topo-underground.jpg', caption: '3D-срез земли с коммуникациями: подземные сети в неоновой подсветке.' },
      { src: '/illustrations/topo-contours.jpg', caption: 'Цифровая топографическая карта с изолиниями на темном фоне.' },
    ],
  },
  {
    order: '03',
    slug: 'bim-3d',
    title: 'BIM: Зачем платить за 3D?',
    subtitle: 'Почему 3D-модель выгоднее 2D-чертежа на этапе стройки.',
    summary: 'Почему 3D-модель выгоднее 2D-чертежа на этапе стройки.',
    readingTime: '5 минут',
    meta: ['Для кого: инвесторы, генподрядчики, собственники зданий'],
    focus: 'Scan-to-BIM',
    content: stripIntroBlocks(articleThreeRaw),
    images: [
      { src: '/illustrations/bim-scanner.jpg', caption: 'Лазерный сканер создает облако точек — цифровой двойник пространства.' },
      { src: '/illustrations/bim-column-mesh.jpg', caption: 'Переход реальности в цифровую модель: колонна превращается в полигональную сетку.' },
    ],
  },
  {
    order: '04',
    slug: 'vynos-granits',
    title: 'Споры с соседями',
    subtitle: 'Как вынос границ в натуру бережет нервы и деньги. Инструкция владельцу.',
    summary: 'Как вынос границ в натуру бережет нервы и деньги. Инструкция владельцу.',
    readingTime: '4 минуты',
    meta: ['Тема: земельные споры и их решение'],
    focus: 'Восстановление границ',
    content: stripIntroBlocks(articleFourRaw),
    images: [
      { src: '/illustrations/boundary-stake.jpg', caption: 'Межевой знак с лазерным лучом и геометрической разметкой.' },
      { src: '/illustrations/boundary-wall.jpg', caption: 'Абстрактная светящаяся стена, разделяющая территории — юридическая граница.' },
    ],
  },
];
