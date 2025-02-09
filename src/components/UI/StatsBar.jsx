import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import DropdownMenu from './DropdownMenu'
import DropdownLabel from './DropdownLabel'

export default function StatsBar({ stats }) {
	const loggedIn = useSelector(state => state.user.loggedIn)

	const dropdownMenus = useMemo(
		() => (
			<>
				<DropdownMenu
					buttonLabel={
						<DropdownLabel name='ACTIVE USERS' title={stats.active_users} />
					}
				/>
				<DropdownMenu
					buttonLabel={
						<DropdownLabel
							name='CELLS'
							title={
								loggedIn
									? stats.active_cells + stats.closed_cells + stats.queue_cells
									: '?'
							}
						/>
					}
					options={[
						{
							name: 'ACTIVE ',
							count: loggedIn ? stats.active_cells + stats.queue_cells : '?',
						},
						{ name: 'CLOSED ', count: loggedIn ? stats.closed_cells : '?' },
						{
							name: null,
							count: loggedIn ? null : 'Log in to watch',
						},
					]}
				/>
				<DropdownMenu
					buttonLabel={
						<DropdownLabel name='Countries' title={stats?.countries?.length} />
					}
					options={stats.countries}
				/>
			</>
		),
		[stats]
	)

	return dropdownMenus
}
