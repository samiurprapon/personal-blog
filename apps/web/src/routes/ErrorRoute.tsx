import { lazy } from 'react';
import Loadable from '~/components/Loadable';

const ErrorPage = Loadable(lazy(() => import('~/pages/error')));

export default ErrorPage;
