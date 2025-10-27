<script lang="ts">
	import StringTune, { StringSplit, StringProgress } from '@fiddle-digital/string-tune';
	import { onMount } from 'svelte';
	let { users, sorting, searchTerm, handleInput } = $props();

	onMount(() => {
		const stringModule = StringTune.getInstance();

		stringModule.use(StringSplit);
		stringModule.use(StringProgress, { mode: 'scroll' });

		stringModule.start(60);
	});
</script>

<div class="ViewGuests">
	<table class="ViewGuests__table">
		<caption class="visually-hidden">Guests invited to our wedding.</caption>
		<thead>
			<tr class="ViewGuests__headerRow" data-string="progress" data-string-key="--progress">
				<th scope="col"
					><form>
						<input type="hidden" name="q" id="q" bind:value={searchTerm} oninput={handleInput} />
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
						<input type="hidden" name="q" id="q" bind:value={searchTerm} oninput={handleInput} />
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
						<input type="hidden" name="q" id="q" bind:value={searchTerm} oninput={handleInput} />
						<input type="hidden" name="orderBy" value="diet" />
						<input type="hidden" name="asc" value={sorting.ascending ? 'false' : 'true'} /><button
							type="submit"
						>
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
		<tbody class="ViewGuests__tableBody">
			{#each users as { id, givenName, familyName, RSVP, isAccepted, diet, hasAllergies, type, hasGuests }}
				<tr data-string="progress" data-string-key="--progress" class="ViewGuests__tableRow">
					<th scope="row" class="ViewGuests__nameCell">
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

<style lang="scss">
	.ViewGuests {
		overflow-x: auto;

		&__table {
			border-collapse: collapse;
			width: 100%;
			margin-bottom: 50vh;
		}

		&__headerRow {
			background-color: #2a2a2a;
			color: #ffffff;
		}

		th {
			font-size: 0.875rem;
			font-weight: 500;
			padding: 1rem 1.5rem;
			text-align: left;
		}

		&__tableBody tr + tr {
			border-top: 1px solid #f0f0f0;
		}

		&__tableRow {
			cursor: pointer;
			position: relative;
			transition: background-color 0.2s ease;

			&:hover {
				background-color: #e6dfe4;
			}

			a::after {
				content: '';
				inset: 0;
				position: absolute;
			}
		}

		&__nameCell {
			color: #1a1a1a;
			font-size: 0.875rem;
			font-weight: 600;
			padding: 1rem 1.5rem;
			text-align: left;
		}

		td {
			padding: 1rem 1.5rem;
			color: #666;
			font-size: 0.875rem;
		}

		button {
			cursor: pointer;
			align-items: center;
			background-color: #e6dfe4;
			border-radius: 9999px;
			border: none;
			color: black;
			display: flex;
			font-size: 0.875rem;
			font-weight: 500;
			gap: 0.5rem;
			padding: 0.25rem 1rem;
			transition: opacity 0.2s ease;

			&:hover {
				opacity: 0.8;
			}
		}
	}

	.ViewGuests__headerRow,
	.ViewGuests__tableRow {
		opacity: (calc(var(--progress) * 8));
	}
</style>
