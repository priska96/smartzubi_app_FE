import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

type LngRet = { [lng: string]: { nativeName: string } };

export const SwitchLanguageButton = () => {
    const { i18n } = useTranslation();
    const lngs: LngRet = {
        de: { nativeName: 'DE' },
        vi: { nativeName: 'VN' },
    };
    return (
        <Button
            variant="contained"
            className="font-bold"
            type="submit"
            onClick={() => {
                i18n.changeLanguage(
                    i18n.language.toLowerCase().includes('de') ? 'vi' : 'de'
                );
            }}
        >
            {
                lngs[i18n.language.toLowerCase().includes('de') ? 'vi' : 'de']
                    .nativeName
            }
        </Button>
    );
};
