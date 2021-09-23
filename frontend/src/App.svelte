<script>
import { detach } from "svelte/internal";


	export let name;

	let count = 0;
	let start;
	let stop;
	let frequency;

	async function stressAPI() {
		let response = await fetch("/api/hello")
		message = await response.text();
	}

	async function tick() {
		await stressAPI();
		count = count + 1;
		stop = Date.now();
		frequency = count / (stop - start) * 1000;
		setTimeout(tick);
	}

	async function click() {
		start = Date.now()
		count = 0;
		setTimeout(tick);
	}

	let message;

</script>

<main>
	<h1>Hello {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>

	<button on:click={click} class="btn btn-lg btn-primary">Start Stress Test</button>

	{#if frequency}
	<p>
		API are serving {Math.floor(frequency)} events per second.
	</p>
	{/if}

	<p>
	{#if message}
		API message is: "{message}" (not very interesting)
	{/if}
</p>

</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>