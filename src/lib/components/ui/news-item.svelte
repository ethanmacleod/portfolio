<script lang="ts">
	export let item;
</script>

<article class="mb-6 border border-gray-300 bg-[#d4e9fb] p-2">
	<h1 class="text-lg font-bold">
		{item.title}
	</h1>

	{#if item.subtitle}
		<h2 class="text-xs text-gray-600">
			{item.subtitle}
		</h2>
	{/if}

	<div class="mt-2">
		{@html item.content}
	</div>

	<div class="mt-4 flex justify-between text-xs text-gray-500 italic">
		<p>{item.author}</p>
		<p>{new Date(item.created_at).toLocaleString()}</p>
	</div>
</article>
