import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';
import { Logo } from './components/Logo';

type LngRet = { [lng: string]: { nativeName: string } };

function AppLayout() {
    const { i18n } = useTranslation();
    const lngs: LngRet = {
        de: { nativeName: 'DE' },
        vi: { nativeName: 'VN' },
    };

    return (
        <div>
            <Button
                variant="contained"
                className="font-bold"
                type="submit"
                onClick={() => {
                    i18n.changeLanguage(i18n.language === 'de' ? 'vi' : 'de');
                }}
            >
                {lngs[i18n.language === 'de' ? 'vi' : 'de'].nativeName}
            </Button>
            <Logo />
            <Outlet />
        </div>
    );
}
export default AppLayout;
