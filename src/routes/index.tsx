import {
    createBrowserRouter,
    RouteObject,
    RouterProvider,
} from 'react-router-dom';
import { Container } from '@mui/material';
import { ProtectedRouteLayout } from '@/components/ProtectedRouteLayout';
import Login from '@/pages/Auth/Login';
import Register from '@/pages/Auth/Register';
import ExamPage from '@/pages/Exam/ExamPage';
import ExamListPage from '@/pages/Exam/ExamListPage';
import UserProfilePage from '@/pages/UserProfile/UserProfilePage';
import ExamViewerPage from '@/pages/Exam/ExamViewerPage';

import AppLayout from '@/AppLayout';
import PaymentPage from '@/pages/payment/PaymentPage';
import { SuccessDisplay } from '@/features/payment/SuccessDisplay';
import { FreeMemberPage } from '@/pages/Forbidden/FreeMemberPage';
import { LockedMemberPage } from '@/pages/Forbidden/LockedMemberPage';
import { useAuthUser } from '@/features/authentication/hooks';

function Routes() {
    const user = useAuthUser();

    const routesForPublic = [
        {
            path: '/',
            element: <AppLayout />,
            children: [
                {
                    path: '/about',
                    element: <Container>About</Container>,
                },
            ],
        },
    ];
    const routesForAuthenticatedOnly: RouteObject[] = [
        {
            path: '/',
            element: <ProtectedRouteLayout />,
            children: [
                {
                    path: '/exams/',
                    element: <ExamListPage />,
                },
                {
                    path: '/exams/:exam_id',
                    element: <ExamPage />,
                },
                {
                    path: '/exams/view/:exam_id',
                    element: <ExamViewerPage />,
                },
                {
                    path: '/profile',
                    element: <UserProfilePage />,
                },
                {
                    path: '/logout',
                    element: <div>Logout Page Coming soon</div>,
                },
            ],
        },
    ];
    const routesForAuthenticatedNotPayingOnly: RouteObject[] = [
        {
            path: '/',
            element: <AppLayout />,
            children: [
                {
                    path: '/forbidden-free-member',
                    element: <FreeMemberPage />,
                },
                {
                    path: '/forbidden-locked-member',
                    element: <LockedMemberPage />,
                },
                {
                    path: '/payment-subscription',
                    element: <SuccessDisplay />,
                },
                {
                    path: '/payment/success',
                    element: <div>Payment successful</div>,
                },
                {
                    path: '/payment',
                    element: <PaymentPage />,
                },
            ],
        },
    ];

    const routesForNotAuthenticatedOnly: RouteObject[] = !user
        ? [
              {
                  path: '/',
                  element: <AppLayout />,
                  children: [
                      {
                          path: '/login',
                          element: <Login />,
                      },
                      {
                          path: '/register',
                          element: <Register />,
                      },
                  ],
              },
          ]
        : [];

    const router = createBrowserRouter([
        ...routesForPublic,
        ...routesForNotAuthenticatedOnly,
        ...routesForAuthenticatedNotPayingOnly,
        ...routesForAuthenticatedOnly,
    ]);

    return <RouterProvider router={router} />;
}

export default Routes;
