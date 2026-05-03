<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { browser } from '$app/environment';

	const colour = 'random';
	const sparkles = 50;

	/****************************
	 *  Tinkerbell Magic Sparkle *
	 *(c)2005-13 mf2fm web-design*
	 *  http://www.mf2fm.com/rv  *
	 * DON'T EDIT BELOW THIS BOX *
	 ****************************/

	let ox = 0;
	let oy = 0;
	let x = (ox = 400);
	let y = (oy = 300);
	let shigh = 600;
	let tiny: HTMLDivElement[] = [];
	let star: HTMLDivElement[] = [];
	let starv: number[] = [];
	let starx: number[] = [];
	let stary: number[] = [];
	let tinyx: number[] = [];
	let tinyy: number[] = [];
	let tinyv: number[] = [];
	let timer: ReturnType<typeof setTimeout> | null = null;
	let container: HTMLDivElement | null = null;

	onMount(() => {
		if (!browser) return;

		container = document.createElement('div');
		container.style.cssText =
			'position:fixed;top:0;left:0;width:100%;height:100%;overflow:hidden;pointer-events:none;z-index:9999;';
		document.body.appendChild(container);

		let rats: HTMLDivElement, rlef: HTMLDivElement, rdow: HTMLDivElement;
		for (let i = 0; i < sparkles; i++) {
			rats = createDiv(3, 3);
			rats.style.visibility = 'hidden';
			rats.style.zIndex = '999';
			container.appendChild((tiny[i] = rats));
			starv[i] = 0;
			tinyv[i] = 0;
			rats = createDiv(5, 5);
			rats.style.backgroundColor = 'transparent';
			rats.style.visibility = 'hidden';
			rats.style.zIndex = '999';
			rlef = createDiv(1, 5);
			rdow = createDiv(5, 1);
			rats.appendChild(rlef);
			rats.appendChild(rdow);
			rlef.style.top = '2px';
			rlef.style.left = '0px';
			rdow.style.top = '0px';
			rdow.style.left = '2px';
			container.appendChild((star[i] = rats));
		}
		set_width();
		sparkle();

		window.addEventListener('mousemove', mouse);
		window.addEventListener('resize', set_width);
	});

	onDestroy(() => {
		if (!browser) return;
		window.removeEventListener('mousemove', mouse);
		window.removeEventListener('resize', set_width);
		if (timer) clearTimeout(timer);
		container?.remove();
	});

	function sparkle() {
		let c;
		if (Math.abs(x - ox) > 1 || Math.abs(y - oy) > 1) {
			ox = x;
			oy = y;
			for (c = 0; c < sparkles; c++)
				if (!starv[c]) {
					star[c].style.left = (starx[c] = x) + 'px';
					star[c].style.top = (stary[c] = y + 1) + 'px';
					star[c].style.clip = 'rect(0px, 5px, 5px, 0px)';
					(star[c].childNodes[0] as HTMLElement).style.backgroundColor = (
						star[c].childNodes[1] as HTMLElement
					).style.backgroundColor = colour == 'random' ? newColour() : colour;
					star[c].style.visibility = 'visible';
					starv[c] = 50;
					break;
				}
		}
		for (c = 0; c < sparkles; c++) {
			if (starv[c]) update_star(c);
			if (tinyv[c]) update_tiny(c);
		}
		timer = setTimeout(sparkle, 40);
	}

	function update_star(i: number) {
		if (--starv[i] == 25) star[i].style.clip = 'rect(1px, 4px, 4px, 1px)';
		if (starv[i]) {
			stary[i] += 1 + Math.random() * 3;
			starx[i] += ((i % 5) - 2) / 5;
			if (stary[i] < shigh) {
				star[i].style.top = stary[i] + 'px';
				star[i].style.left = starx[i] + 'px';
			} else {
				star[i].style.visibility = 'hidden';
				starv[i] = 0;
				return;
			}
		} else {
			tinyv[i] = 50;
			tiny[i].style.top = (tinyy[i] = stary[i]) + 'px';
			tiny[i].style.left = (tinyx[i] = starx[i]) + 'px';
			tiny[i].style.width = '2px';
			tiny[i].style.height = '2px';
			tiny[i].style.backgroundColor = (star[i].childNodes[0] as HTMLElement).style.backgroundColor;
			star[i].style.visibility = 'hidden';
			tiny[i].style.visibility = 'visible';
		}
	}

	function update_tiny(i: number) {
		if (--tinyv[i] == 25) {
			tiny[i].style.width = '1px';
			tiny[i].style.height = '1px';
		}
		if (tinyv[i]) {
			tinyy[i] += 1 + Math.random() * 3;
			tinyx[i] += ((i % 5) - 2) / 5;
			if (tinyy[i] < shigh) {
				tiny[i].style.top = tinyy[i] + 'px';
				tiny[i].style.left = tinyx[i] + 'px';
			} else {
				tiny[i].style.visibility = 'hidden';
				tinyv[i] = 0;
				return;
			}
		} else tiny[i].style.visibility = 'hidden';
	}

	function mouse(e: MouseEvent) {
		y = e.clientY;
		x = e.clientX;
	}

	function set_width() {
		shigh = window.innerHeight;
	}

	function createDiv(height: number, width: number) {
		const div = document.createElement('div');
		div.style.position = 'absolute';
		div.style.height = height + 'px';
		div.style.width = width + 'px';
		div.style.overflow = 'hidden';
		div.style.pointerEvents = 'none';
		return div;
	}

	function newColour() {
		const c: number[] = [];
		c[0] = 255;
		c[1] = Math.floor(Math.random() * 256);
		c[2] = Math.floor(Math.random() * (256 - c[1] / 2));
		c.sort(() => 0.5 - Math.random());
		return 'rgb(' + c[0] + ', ' + c[1] + ', ' + c[2] + ')';
	}
	// ]]>
</script>
