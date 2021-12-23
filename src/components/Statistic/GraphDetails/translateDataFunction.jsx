const dataTranslated = val => {
  const newOb = val.map(i => {
    if (i.category === 'products') {
      return { ...i, category: 'Продукты' };
    }
    if (i.category === 'home') {
      return { ...i, category: 'Всё для дома' };
    }
    if (i.category === 'entertainment') {
      return { ...i, category: 'Развлечения' };
    }
    if (i.category === 'healthy') {
      return { ...i, category: 'Здоровье' };
    }
    if (i.category === 'transport') {
      return { ...i, category: 'Транспорт' };
    }
    if (i.category === 'alcohol') {
      return { ...i, category: 'Алкоголь' };
    }
    if (i.category === 'technic') {
      return { ...i, category: 'Техника' };
    }
    if (i.category === 'communication') {
      return { ...i, category: 'Коммуналка, связь' };
    }
    if (i.category === 'hobby') {
      return { ...i, category: 'Спорт, хобби' };
    }
    if (i.category === 'education') {
      return { ...i, category: 'Образование' };
    }
    if (i.category === 'other') {
      return { ...i, category: 'Прочее' };
    }
    if (i.category === 'salary') {
      return { ...i, category: 'ЗП' };
    }
    if (i.category === 'additional') {
      return { ...i, category: 'Доп.доход' };
    }
    return i.category === 'salary' ? { ...i, category: 'ЗП' } : { ...i, category: 'Доп.доход' };
  });
  console.log(newOb);
  return newOb;
};

export default dataTranslated;
