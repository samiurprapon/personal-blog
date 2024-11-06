import { Suspense, ElementType, ComponentProps } from 'react';

import Loader from '~/components/Loader';

const Loadable =
	(Component: ElementType) => (props: ComponentProps<typeof Component>) => (
		<Suspense fallback={<Loader />}>
			<Component {...props} />
		</Suspense>
	);

export default Loadable;
