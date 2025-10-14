<script lang="ts">
	import { page } from '$app/state';
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import type { EventHandler } from 'svelte/elements';

	let { children, data }: { children: Snippet; data: LayoutData } = $props();

	let timeout: number | NodeJS.Timeout;

	const DEBOUNCE_TIME_IN_MS: number = 400;

	let searchTerm: string = $state(data.query ?? '');

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
</script>

<main
	class="ViewGuestsLayout {page.route.id === '/(admin)/admin/view-guests/[id]' ? 'show-modal' : ''}"
>
	<search>
		<form data-sveltekit-keepfocus data-sveltekit-noscroll>
			<label class="flex flex-col gap-2" for="q">
				<span class="block font-semibold capitalize">Search for guests</span>
				<input
					class="grow rounded border-none"
					type="search"
					name="q"
					id="q"
					bind:value={searchTerm}
					oninput={handleInput}
				/>
			</label>
		</form>
	</search>

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
					{#each data.users as { id, givenName, familyName, RSVP, isAccepted, diet, hasAllergies, type, hasGuests }}
						<tr class="ViewGuests__guestRow">
							<th scope="row" class="ViewGuests__row">
								{`${givenName} ${familyName}`}
								<a href={`/admin/view-guests/${id}`}
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

		&.show-modal::after {
			content: '';
			position: fixed;
			inset: 0;
			background: rgba(0, 0, 0, 0.2);
			z-index: 1;
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
				position: absolute;
				inset: 0;
			}
		}
	}
</style>
