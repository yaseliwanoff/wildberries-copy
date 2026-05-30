const productsMock = [
  {
    id: 1001,
    nmId: 45218965,
    name: "Платье женское трикотажное миди с поясом, рубашечный крой",
    brand: "LoVe Republic",
    category: {
      id: 5572,
      name: "Платья",
      path: "Женщинам / Одежда / Платья",
    },
    price: {
      base: 5690,
      discount: 2499,
      promoPercent: 56,
      clubPrice: 2199,
      currency: "RUB",
    },
    rating: {
      average: 4.8,
      count: 2341,
      questionCount: 15,
    },
    media: {
      images: [
        "https://moqimg.ru/217x289.webp",
        // "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600",
        // "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600",
        // "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=600",
      ],
      video: null,
      colorSwatches: [
        {
          colorName: "черный",
          imageUrl:
            "https://images.unsplash.com/photo-1551489186-cf8726f514f8?w=200",
        },
        {
          colorName: "бежевый",
          imageUrl:
            "https://images.unsplash.com/photo-1565084888275-a1fc670e2e1b?w=200",
        },
        {
          colorName: "изумрудный",
          imageUrl:
            "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200",
        },
      ],
    },
    options: {
      sizes: [
        { size: "42", available: true },
        { size: "44", available: true },
        { size: "46", available: false },
        { size: "48", available: true },
        { size: "50", available: true },
        { size: "52", available: false },
      ],
      colors: ["черный", "бежевый", "изумрудный"],
    },
    details: {
      description:
        "Стильное платье миди свободного кроя. Пояс в комплекте. Отложной воротник и планка на пуговицах создают элегантный рубашечный фасон. Идеально подходит как для офиса, так и для повседневных выходов.",
      composition: "Вискоза 65%, Полиэстер 30%, Эластан 5%",
      country: "Россия",
      careInstructions: [
        "Деликатная стирка при 30°C",
        "Не отбеливать",
        "Утюжить при температуре до 110°C",
        "Химчистка запрещена",
      ],
      params: [
        { key: "Длина рукава", value: "Длинный" },
        { key: "Сезон", value: "Демисезон" },
        { key: "Застежка", value: "Пуговицы" },
        { key: "Карманы", value: "Нет" },
        { key: "Длина изделия", value: "120 см (для размера 46)" },
        { key: "Рост модели", value: "175 см" },
        { key: "Размер на модели", value: "44" },
      ],
    },
    seller: {
      name: 'ООО "Мода Трейд"',
      ogrn: "1217700123456",
      rating: 4.9,
    },
    logistics: {
      deliveryDate: "Завтра, от 299 ₽",
      warehouse: "Коледино (Москва)",
      pickupAvailable: true,
      courierAvailable: true,
      freeReturn: true,
    },
    stats: {
      ordersCount: 12453,
      inCartCount: 89,
    },
    tags: ["Хит продаж", "Бесплатная примерка", "Экспресс-доставка"],
  },
  {
    id: 2002,
    nmId: 98765432,
    name: "Наушники беспроводные внутриканальные NoiseX Pro с активным шумоподавлением (ANC)",
    brand: "TechSound",
    category: {
      id: 6745,
      name: "Наушники и гарнитуры",
      path: "Электроника / Аудиотехника / Наушники",
    },
    price: {
      base: 8490,
      discount: 4990,
      promoPercent: 41,
      currency: "RUB",
    },
    rating: {
      average: 4.5,
      count: 567,
      questionCount: 23,
    },
    media: {
      images: [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
        "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600",
        "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=600",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600",
      ],
      video: "https://example.com/video/noisex_unbox.mp4",
      colorSwatches: [
        {
          colorName: "черный",
          imageUrl:
            "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=200",
        },
        {
          colorName: "белый",
          imageUrl:
            "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=200",
        },
      ],
    },
    options: {
      sizes: [],
      colors: ["черный", "белый"],
    },
    details: {
      description:
        "Флагманская модель TWS-наушников с гибридным активным шумоподавлением до 42 дБ. Сенсорное управление, прозрачный режим и поддержка кодека LDAC.",
      composition: "Пластик, силикон, аккумулятор Li-Po",
      country: "Китай",
      params: [
        { key: "Тип подключения", value: "Bluetooth 5.3" },
        { key: "Время работы", value: "8 ч (с ANC), 12 ч (без ANC)" },
        { key: "Время зарядки", value: "1.5 часа" },
        { key: "Емкость кейса", value: "500 мАч" },
        { key: "Защита от воды", value: "IPX5" },
        { key: "Радиус действия", value: "10 м" },
        { key: "Вес (один наушник)", value: "5.4 г" },
      ],
    },
    seller: {
      name: "ИП Иванов А.С.",
      ogrn: "313774628100224",
      rating: 4.7,
    },
    logistics: {
      deliveryDate: "от 3 дней, платно",
      warehouse: "Казань",
      pickupAvailable: true,
      courierAvailable: false,
      freeReturn: false,
    },
    stats: {
      ordersCount: 4521,
      inCartCount: 34,
    },
    tags: ["Новинка", "Рекомендуемое", "Рассрочка 0-0-6"],
  },
  {
    id: 3003,
    nmId: 11223344,
    name: "Матрас ортопедический Memory Dream 180x200 см, высота 25 см",
    brand: "SleepWell",
    category: {
      id: 8821,
      name: "Матрасы",
      path: "Дом / Мебель / Матрасы",
    },
    price: {
      base: 45800,
      discount: 21990,
      promoPercent: 52,
      clubPrice: 20450,
      currency: "RUB",
    },
    rating: {
      average: 4.9,
      count: 89,
      questionCount: 7,
    },
    media: {
      images: [
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600",
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600",
        "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600",
      ],
      video: null,
      colorSwatches: [],
    },
    options: {
      sizes: [
        { size: "90x200", available: false },
        { size: "120x200", available: true },
        { size: "140x200", available: true },
        { size: "160x200", available: true },
        { size: "180x200", available: true },
      ],
      colors: null,
    },
    details: {
      description:
        "Многослойный матрас с эффектом памяти. Независимый пружинный блок Pocket Spring (1000 пружин на кв.м.). Чехол из жаккарда с простежкой на холконе.",
      composition: "Пена Memory Foam, кокосовая койра, войлок, спанбонд",
      country: "Беларусь",
      tnvedCode: "9404.21.1000",
      params: [
        { key: "Жесткость стороны 1", value: "Средняя" },
        { key: "Жесткость стороны 2", value: "Выше средней" },
        { key: "Макс. вес на спальное место", value: "130 кг" },
        { key: "Тип пружин", value: "Независимые" },
        { key: "Съемный чехол", value: "Да" },
        { key: "Высота", value: "25 см" },
        { key: "Гарантия", value: "3 года" },
      ],
    },
    seller: {
      name: 'ООО "Мир Сна"',
      ogrn: "1205000789012",
      rating: 4.8,
    },
    logistics: {
      deliveryDate: "от 7 дней, 0 ₽",
      warehouse: "Минск (Беларусь)",
      pickupAvailable: false,
      courierAvailable: true,
      freeReturn: false,
    },
    stats: {
      ordersCount: 342,
      inCartCount: 12,
    },
    tags: ["Бесплатная доставка", "Рассрочка", "Участвует в акции"],
  },
];

export default productsMock;
