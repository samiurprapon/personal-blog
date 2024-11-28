import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { mockPostsApi } from '~/store/apis/posts';

export const store = configureStore({
	reducer: {
		[mockPostsApi.reducerPath]: mockPostsApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(mockPostsApi.middleware),
});

// Setup listeners for refetch functionality
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
