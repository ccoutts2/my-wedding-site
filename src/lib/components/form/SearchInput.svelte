<script lang="ts">
	let { searchTerm, handleInput } = $props();
</script>

<search>
	<form data-sveltekit-keepfocus data-sveltekit-noscroll>
		<label for="q">
			<span>Search for guests</span>
			<input type="search" name="q" id="q" bind:value={searchTerm} oninput={handleInput} />
		</label>
	</form>
</search>
