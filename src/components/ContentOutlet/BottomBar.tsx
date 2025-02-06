import { AppBar, Toolbar, IconButton, Box } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/provider/AuthContext';

export default function BottomBar() {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout()
            .then(() => {
                navigate('/login', { replace: true });
                window.location.reload();
            }) // forece reload to have correct jwt in headers
            .catch((e) => console.log(e));
    };

    return (
        <AppBar
            position="fixed"
            className="!text-white"
            sx={{ top: 'auto', bottom: 0 }}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    onClick={() => {
                        navigate('/exams');
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <Box sx={{ flexGrow: 1 }} />
                <IconButton
                    color="inherit"
                    onClick={() => {
                        navigate('/profile');
                    }}
                >
                    <AccountCircleIcon />
                </IconButton>
                <IconButton color="inherit" onClick={handleLogout}>
                    <LogoutIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}
