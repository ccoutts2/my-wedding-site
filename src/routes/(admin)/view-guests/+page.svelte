<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

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
						<tr>
							<th scope="row">
								{`${user.givenName} ${user.familyName}`}
								<a href={`/view-guests/${user.id}`}>View</a>
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
