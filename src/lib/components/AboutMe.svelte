<script lang="ts">
	import ProfileCard from './ProfileCard.svelte';
	import SkillsGrid from './SkillsGrid.svelte';
	import { skills } from '$lib/config/skills';
</script>

<ProfileCard />
<SkillsGrid {skills} />
