import React, { ComponentType, PropsWithChildren } from 'react'
import { Route } from 'react-router'
import { withAuthenticationRequired } from '@auth0/auth0-react'

import Loading from '../components/common/loading/Loading'

const ProtectedRoute = (props: PropsWithChildren<{ [key: string]: any }>) => {
	const { children, ...args } = props
	return (
		<Route
			component={withAuthenticationRequired(children as ComponentType, {
				onRedirecting: () => <Loading />,
			})}
			{...args}
		/>
	)
}

export default ProtectedRoute