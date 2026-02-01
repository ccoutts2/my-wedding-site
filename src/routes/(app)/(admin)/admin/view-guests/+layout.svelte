<script lang="ts">
	import { page } from '$app/state';
	import { type Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import type { EventHandler } from 'svelte/elements';
	import Table from '$lib/components/ui/table/Table.svelte';
	import SearchInput from '$lib/components/form/SearchField.svelte';
	import type { Sorting } from '$lib/types';
	import TableRow from '$lib/components/ui/table/TableRow.svelte';
	import TableFilter from '$lib/components/ui/table/TableFilter.svelte';
	import TableHeaderCell from '$lib/components/ui/table/TableHeaderCell.svelte';
	import { DEBOUNCE_TIME_IN_MS, ITEMS_PER_PAGE } from '$lib';
	import Pagination from '$lib/components/navigation/Pagination.svelte';

	let { children, data }: { children: Snippet; data: LayoutData } = $props();

	let timeout: number | NodeJS.Timeout;

	let searchTerm: string = $state(data.query ?? '');

	const sorting: Sorting = $derived(data.sorting);

	let totalGuests = $derived(data.totalGuests);
	let totalPages = $derived(Math.ceil(totalGuests / ITEMS_PER_PAGE));
	let currentPage = $derived(Number(page.url.searchParams.get('p')) || 1);

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
		page.route.id === '/(app)/(admin)/admin/view-guests/[id]' ||
			page.route.id === '/(app)/(admin)/admin/view-guests/[id]/edit'
	);
</script>

<main class="ViewGuestsLayout {isModalOpen ? 'show-modal' : ''}">
	<SearchInput {searchTerm} {handleInput} />

	{#if data.users}
		<Table caption="Guests invited to our wedding.">
			<thead>
				<TableRow type="header">
					<TableHeaderCell scope="col" filter={true}>
						<TableFilter {searchTerm} {sorting} value="givenName" label="Name" />
					</TableHeaderCell>
					<TableHeaderCell scope="col">Replied</TableHeaderCell>
					<TableHeaderCell scope="col" filter={true}>
						<TableFilter {searchTerm} {sorting} value="isAccepted" label="RSVP" />
					</TableHeaderCell>
					<TableHeaderCell scope="col" filter={true}>
						<TableFilter {searchTerm} {sorting} value="diet" label="Diet" />
					</TableHeaderCell>
					<TableHeaderCell scope="col">Allergies</TableHeaderCell>
					<TableHeaderCell scope="col">Type</TableHeaderCell>
					<TableHeaderCell scope="col">Plus 1</TableHeaderCell>
				</TableRow>
			</thead>
			<tbody class="Table__tableBody">
				{#each data.users as { id, givenName, familyName, RSVP, isAccepted, diet, hasAllergies, type, hasGuests }}
					<TableRow type="body">
						<TableHeaderCell scope="row">
							{`${givenName} ${familyName}`}
							<a href={`/admin/view-guests/${id}`} data-sveltekit-noscroll
								><span class="visually-hidden">View {givenName}</span></a
							>
						</TableHeaderCell>
						<td>{RSVP ? 'Yes' : 'No'}</td>
						<td>{isAccepted ? 'Yes' : 'No'}</td>
						<td>{diet ? 'Yes' : 'No'}</td>
						<td>{hasAllergies ? 'Yes' : 'No'}</td>
						<td>{type}</td>
						<td>{hasGuests ? 'Yes' : 'No'}</td>
					</TableRow>
				{/each}
			</tbody>
		</Table>
		<Pagination {currentPage} {totalPages} />
	{/if}
</main>

{@render children?.()}

<style lang="scss">
	.ViewGuestsLayout {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		padding: 1rem;
		position: relative;

		&.show-modal {
			overflow: hidden;

			:global(.Table) {
				overflow: hidden;
				pointer-events: none;
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
</style>
