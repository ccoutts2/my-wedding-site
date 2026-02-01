<script lang="ts">
	import { CircleX } from '@lucide/svelte';
	import type { Toast } from '$lib/types';
	import { getToastState } from '$lib/contexts/toast-state.svelte';
	import { fly } from 'svelte/transition';

	interface ToastProps {
		toast: Toast;
	}
	let { toast }: ToastProps = $props();
	const toastState = getToastState();
</script>

<div
	class="Toast"
	data-status={toast.toastStatus}
	transition:fly={{ y: -30, duration: 400 }}
	role="status"
>
	<p class="Toast__title">{toast.title}</p>
	<p class="Toast__message">{toast.message}</p>
	<button type="button" class="Toast__button" onclick={() => toastState.remove(toast.id)}>
		<span class="visually-hidden">Close the toast.</span>
		<CircleX />
	</button>
</div>

<style lang="scss">
	@use '$lib/styles/partials/variables';

	.Toast {
		background-color: variables.$color--default--input--background;
		border-radius: 1rem;
		border: 1px solid black;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		height: auto;
		justify-content: center;
		min-width: 20.5rem;
		padding: 0.5rem;
		position: relative;

		&[data-status='success'] {
			border-color: variables.$color--foreground;
		}

		&[data-status='error'] {
			border-color: variables.$color--input--border-error;
		}

		&[data-status='invalid'] {
			border-color: variables.$color--input--border-error;
		}

		&__title {
			font-weight: 600;
		}

		&__message {
			font-size: 0.875rem;
		}

		&__button {
			position: absolute;
			right: 0.5rem;
			top: 0.25rem;
			scale: 0.8;
		}
	}
</style>
