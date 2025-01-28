import { lazy } from 'react';
import Loadable from '~/components/Loadable';

const Error = Loadable(lazy(() => import('~/pages/error')));

export default Error;
