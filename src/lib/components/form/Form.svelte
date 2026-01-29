<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLFormAttributes } from 'svelte/elements';
	import Button from '../ui/buttons/Button.svelte';

	type SvelteAction = (node: HTMLFormElement) => { destroy?: () => void };

	interface FormProps extends HTMLFormAttributes {
		children: Snippet;
		action: string;
		enhance: SvelteAction;
	}

	let { children, action, enhance, ...props }: FormProps = $props();
</script>

<form {action} method="POST" class="Form" use:enhance {...props}>
	{@render children?.()}

	<div class="Form__button">
		<Button type="submit" data-content="Submit">Submit</Button>
	</div>
</form>

<style lang="scss">
	@use '$lib/styles/partials/breakpoints.scss';

	.Form {
		display: flex;
		flex-direction: column;
		align-items: center;

		@include breakpoints.tablet {
			align-items: flex-start;
		}

		&__button {
			margin-block: 1rem 0.25rem;
			width: 100%;

			@include breakpoints.tablet {
				max-width: 10rem;
			}
		}
	}
</style>
