<script lang="ts">
	import { getToastState } from '$lib/contexts/toast-state.svelte';
	import Toast from './Toast.svelte';

	const toastState = getToastState();
</script>

<div class="Toaster">
	{#each toastState.toasts as toast (toast.id)}
		<Toast {toast} />
	{/each}
</div>

<style lang="scss">
	.Toaster {
		position: absolute;
		top: 1rem;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		z-index: 1000;
	}
</style>
