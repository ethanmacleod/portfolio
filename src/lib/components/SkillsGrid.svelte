<script lang="ts">
	import SkillBlock from './SkillBlock.svelte';
	import RetroDiv from './RetroDiv.svelte';

	interface Skill {
		name: string;
		icon: string;
		brandColor: string;
	}

	export let skills: Skill[];
</script>

<RetroDiv width="w-full" className="mb-6">
	<div class="bevel-inset bg-gray-50 p-1">
		<div class="flex flex-wrap justify-center gap-1">
			{#each skills as skill, index}
				<SkillBlock name={skill.name} label="" icon={skill.icon} brandColor={skill.brandColor} {index} />
			{/each}
		</div>
	</div>
</RetroDiv>
