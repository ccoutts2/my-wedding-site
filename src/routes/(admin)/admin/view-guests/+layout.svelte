<script lang="ts">
	import { page } from '$app/state';
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	let { children, data }: { children: Snippet; data: LayoutData } = $props();
</script>

<div
	class="ViewGuestsLayout {page.route.id === '/(admin)/admin/view-guests/[id]' ? 'show-modal' : ''}"
>
	<main>
		{#if data.users}
			<div class="ViewGuests__overflow">
				<table class="ViewGuests__table">
					<caption>Guests invited to our wedding.</caption>
					<thead>
						<tr>
							<th scope="col">Name</th>
							<th scope="col">Replied</th>
							<th scope="col">RSVP</th>
							<th scope="col">Diet</th>
							<th scope="col">Allergies</th>
							<th scope="col">Type</th>
							<th scope="col">Plus 1</th>
						</tr>
					</thead>
					<tbody>
						{#each data.users as user}
							<tr class="ViewGuests__guestRow">
								<th scope="row" class="ViewGuests__row">
									{`${user.givenName} ${user.familyName}`}
									<a href={`/admin/view-guests/${user.id}`}
										><span class="visually-hidden">View {user.givenName}</span></a
									>
								</th>
								<td>{user.RSVP}</td>
								<td>{user.isAccepted}</td>
								<td>{user.diet}</td>
								<td>{user.hasAllergies}</td>
								<td>{user.type}</td>
								<td>{user.hasGuests}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/if}
	</main>

	<style lang="scss">
		.ViewGuests {
			&__guestRow {
				position: relative;

				&:hover {
					background-color: cadetblue;
				}

				a::after {
					content: '';
					position: absolute;
					inset: 0;
				}
			}
		}
	</style>

	{@render children?.()}
</div>

<style>
	.ViewGuestsLayout {
		position: relative;
	}

	.ViewGuestsLayout.show-modal::after {
		content: '';
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.3);
		z-index: 4;
	}
</style>
