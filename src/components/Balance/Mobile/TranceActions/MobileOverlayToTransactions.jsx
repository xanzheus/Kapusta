import Stack from '@mui/material/Stack';
import { useTranslation } from 'react-i18next';
import COLORS from 'Constants/COLORS';

const MobileOverlayToTransactions = () => {
  const { t } = useTranslation();
  return (
    <Stack textAlign="center" mt={8} fontWeight={700} color={COLORS.mainAccent}>
      {t('headersTabs.withoutTransaction')}
    </Stack>
  );
};
export default MobileOverlayToTransactions;
