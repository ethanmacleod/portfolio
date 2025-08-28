<script lang="ts">
	import { page } from '$app/stores';

	$: pageInfo = getPageInfo($page.route.id);

	function getPageInfo(routeId: string | null): { title: string; subtitle: string } {
		switch (routeId) {
			case '/':
				return {
					title: 'Welcome to My Homepage!',
					subtitle: 'Get to know a little bit about me and sign my guestbook :)'
				};
			case '/projects':
				return {
					title: 'Check Out My Projects!',
					subtitle: "I've made some pretty cool stuff... besides this website"
				};
			case '/about':
				return {
					title: 'About Me!',
					subtitle: 'Learn more about who I am'
				};
			case '/contact':
				return {
					title: 'Contact Me!',
					subtitle: "Get in touch - I'd love to hear from you"
				};
			default:
				return {
					title: 'Welcome to My Site!',
					subtitle: 'Thanks for visiting!'
				};
		}
	}
</script>

<div
	class="bevel-button flex h-full w-[40%] flex-col border-5 bg-gradient-to-br from-green-600 to-teal-700 font-[Verdana] leading-tight text-white"
>
	<div class="flex h-full flex-col justify-between px-4 py-2">
		<span class="rainbow-text text-center text-2xl font-bold">{pageInfo.title}</span>
		<span class="text-center text-sm">{pageInfo.subtitle}</span>
	</div>
</div>
