import { configureStore } from '@reduxjs/toolkit';
import examReducer from '@/features/exam/examSlice';

const store = configureStore({
    reducer: {
        exam: examReducer,
    },
    middleware: (getdefaultMiddleware) => getdefaultMiddleware().concat(),
    devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
