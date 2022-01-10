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
  return newOb;
};

export default dataTranslated;

// import { expensesCatagoryArray, TRANSLATE_CATEGORIES } from '../../../Constants/category';

// const newData = (data, lang) => {
//   const newValue = name => {
//     const key = EXPENSE_CATEGORIES.reduce((acc, el) => {
//       if (Object.values(el)[0] === name) {
//         acc = Object.keys(el)[0];
//       }
//       return acc;
//     }, '');
//     const newValueRu = EXPENSE_CATEGORIES_RU.filter(el => Object.keys(el)[0] === key)[0][key];
//     const newValueEn = EXPENSE_CATEGORIES.filter(el => Object.keys(el)[0] === key)[0][key];

//     switch (lang) {
//       case 'RU':
//         return newValueRu;

//       case 'EN':
//         return newValueEn;

//       default:
//         return newValueEn;
//     }
//   };

//   return data.reduce((acc, transaction) => {
//     const newTransaction = Object.assign(transaction, {
//       category: newValue(transaction.category),
//     });
//     acc.push(newTransaction);
//     return acc;
//   }, []);
// };

// console.log(newData(data, 'RU'));
