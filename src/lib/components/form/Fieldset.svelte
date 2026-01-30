<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';

	interface FieldsetProps {
		legend?: string;
		dataHidden?: boolean;
		children: Snippet;
		class?: ClassValue;
	}

	let { legend, dataHidden, children, class: className }: FieldsetProps = $props();
</script>

<fieldset class={['Fieldset', className]}>
	{#if !dataHidden}
		<legend class={dataHidden ? 'visually-hidden' : ''}>{legend}</legend>
	{/if}
	{@render children()}
</fieldset>

<style lang="scss">
	.Fieldset {
		width: 100%;
		position: relative;
	}
</style>
