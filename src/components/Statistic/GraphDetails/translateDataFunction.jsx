// LOCALISE
import { useTranslation } from 'react-i18next';

const dataTranslated = val => {
  const newOb = val.map(i => {
    // LOCALISE
    const { t } = useTranslation();

    if (i.category === 'products') {
      return { ...i, category: t('catagories.products') };
    }
    if (i.category === 'home') {
      return { ...i, category: t('catagories.home') };
    }
    if (i.category === 'entertainment') {
      return { ...i, category: t('catagories.entertainment') };
    }
    if (i.category === 'healthy') {
      return { ...i, category: t('catagories.healthy') };
    }
    if (i.category === 'transport') {
      return { ...i, category: t('catagories.transport') };
    }
    if (i.category === 'alcohol') {
      return { ...i, category: t('catagories.alcohol') };
    }
    if (i.category === 'technic') {
      return { ...i, category: t('catagories.technic') };
    }
    if (i.category === 'communication') {
      return { ...i, category: t('catagories.communication') };
    }
    if (i.category === 'hobby') {
      return { ...i, category: t('catagories.hobby') };
    }
    if (i.category === 'education') {
      return { ...i, category: t('catagories.education') };
    }
    if (i.category === 'other') {
      return { ...i, category: t('catagories.other') };
    }
    if (i.category === 'salary') {
      return { ...i, category: t('catagories.healthy') };
    }
    if (i.category === 'additional') {
      return { ...i, category: t('catagories.additional') };
    }
  });
  return newOb;
};

export default dataTranslated;
