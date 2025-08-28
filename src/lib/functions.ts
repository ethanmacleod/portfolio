export function numberWithOrdinal(num: number) {
	const j = num % 10;
	const k = num % 100;

	if (j === 1 && k !== 11) return num + 'st';
	if (j === 2 && k !== 12) return num + 'nd';
	if (j === 3 && k !== 13) return num + 'rd';
	return num + 'th';
}

export function getAge() {
	const birthDate = new Date('2003-01-29T02:16:00');
	const now = new Date();

	const totalMs = now.getTime() - birthDate.getTime();

	let years = now.getFullYear() - birthDate.getFullYear();
	let months = now.getMonth() - birthDate.getMonth();
	let days = now.getDate() - birthDate.getDate();
	let hours = now.getHours() - birthDate.getHours();
	let minutes = now.getMinutes() - birthDate.getMinutes();
	let seconds = now.getSeconds() - birthDate.getSeconds();

	if (seconds < 0) {
		seconds += 60;
		minutes--;
	}
	if (minutes < 0) {
		minutes += 60;
		hours--;
	}
	if (hours < 0) {
		hours += 24;
		days--;
	}
	if (days < 0) {
		const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
		days += prevMonth.getDate();
		months--;
	}
	if (months < 0) {
		months += 12;
		years--;
	}

	return {
		years,
		months,
		days,
		hours,
		minutes,
		seconds,
		totalMs
	};
}
