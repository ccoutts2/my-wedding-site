<script lang="ts">
	import { page } from '$app/state';
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import type { EventHandler } from 'svelte/elements';

	let { children, data }: { children: Snippet; data: LayoutData } = $props();

	let timeout: number | NodeJS.Timeout;

	const DEBOUNCE_TIME_IN_MS: number = 400;

	let searchTerm: string = $state(data.query ?? '');

	const sorting: {
		orderBy: string;
		ascending: boolean;
	} = $derived(data.sorting);

	// Func to search for results upon input change, with debounce

	const handleInput: EventHandler<Event, HTMLInputElement> = ({ currentTarget }) => {
		clearTimeout(timeout);
		const form = currentTarget?.form;

		if (!form) {
			return;
		}

		timeout = setTimeout(() => {
			form.requestSubmit();
		}, DEBOUNCE_TIME_IN_MS);
	};

	const isModalOpen = $derived(
		page.route.id === '/(admin)/admin/view-guests/[id]' ||
			page.route.id === '/(admin)/admin/view-guests/[id]/edit'
	);
</script>

<main class="ViewGuestsLayout {isModalOpen ? 'show-modal' : ''}">
	<search>
		<form data-sveltekit-keepfocus data-sveltekit-noscroll>
			<label for="q">
				<span>Search for guests</span>
				<input type="search" name="q" id="q" bind:value={searchTerm} oninput={handleInput} />
			</label>
		</form>
	</search>

	{#if data.users}
		<div class="ViewGuests">
			<table class="ViewGuests__table">
				<caption>Guests invited to our wedding.</caption>
				<thead>
					<tr>
						<th scope="col"
							><form>
								<input
									type="hidden"
									name="q"
									id="q"
									bind:value={searchTerm}
									oninput={handleInput}
								/>
								<input type="hidden" name="orderBy" value="givenName" />
								<input type="hidden" name="asc" value={sorting.ascending ? 'false' : 'true'} />
								<button type="submit">
									<span>Name</span>
									{#if sorting.orderBy === 'givenName'}
										{sorting.ascending ? '^' : '⌄'}
									{/if}
								</button>
							</form>
						</th>
						<th scope="col">Replied</th>
						<th scope="col"
							><form>
								<input
									type="hidden"
									name="q"
									id="q"
									bind:value={searchTerm}
									oninput={handleInput}
								/>
								<input type="hidden" name="orderBy" value="isAccepted" />
								<input type="hidden" name="asc" value={sorting.ascending ? 'false' : 'true'} />
								<button type="submit">
									<span>RSVP</span>
									{#if sorting.orderBy === 'isAccepted'}
										{sorting.ascending ? '^' : '⌄'}
									{/if}
								</button>
							</form></th
						>
						<th scope="col"
							><form>
								<input
									type="hidden"
									name="q"
									id="q"
									bind:value={searchTerm}
									oninput={handleInput}
								/>
								<input type="hidden" name="orderBy" value="diet" />
								<input
									type="hidden"
									name="asc"
									value={sorting.ascending ? 'false' : 'true'}
								/><button type="submit">
									<span>Diet</span>
									{#if sorting.orderBy === 'diet'}
										{sorting.ascending ? '^' : '⌄'}
									{/if}
								</button>
							</form></th
						>
						<th scope="col">Allergies</th>
						<th scope="col">Type</th>
						<th scope="col">Plus 1</th>
					</tr>
				</thead>
				<tbody>
					{#each data.users as { id, givenName, familyName, RSVP, isAccepted, diet, hasAllergies, type, hasGuests }}
						<tr class="ViewGuests__guestRow">
							<th scope="row" class="ViewGuests__row">
								{`${givenName} ${familyName}`}
								<a href={`/admin/view-guests/${id}`} data-sveltekit-noscroll
									><span class="visually-hidden">View {givenName}</span></a
								>
							</th>
							<td>{RSVP}</td>
							<td>{isAccepted}</td>
							<td>{diet}</td>
							<td>{hasAllergies}</td>
							<td>{type}</td>
							<td>{hasGuests}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}

	{@render children?.()}
</main>

<style lang="scss">
	.ViewGuestsLayout {
		position: relative;

		&.show-modal {
			overflow: hidden;

			.ViewGuests {
				overflow: hidden;
			}
		}

		&.show-modal::after {
			content: '';
			background: rgba(0, 0, 0, 0.2);
			inset: 0;
			position: fixed;
			z-index: -5;
		}
	}

	.ViewGuests {
		&__guestRow {
			position: relative;

			&:hover {
				background-color: cadetblue;
			}

			a::after {
				content: '';
				inset: 0;
				position: absolute;
			}
		}
	}
</style>
