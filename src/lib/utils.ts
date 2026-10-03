import { tz } from '@date-fns/tz';
import { format } from 'date-fns';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function assert(condition: unknown, message: string): asserts condition {
	if (!condition) throw new Error(message);
}

const numberFormat = new Intl.NumberFormat('en-NZ');

export function formatNumber(value: number) {
	return numberFormat.format(value);
}

const ordinalRules = new Intl.PluralRules('en-NZ', { type: 'ordinal' });
const ordinalSuffixes: Record<Intl.LDMLPluralRule, string> = {
	zero: 'th',
	one: 'st',
	two: 'nd',
	few: 'rd',
	many: 'th',
	other: 'th'
};

export function formatOrdinal(value: number) {
	return `${value}${ordinalSuffixes[ordinalRules.select(value)]}`;
}

export function mapNullish<Value, Result>(
	value: Value | null | undefined,
	transform: (value: Value) => Result
): Result | null | undefined {
	if (value === null) return null;
	if (value === undefined) return undefined;
	return transform(value);
}

const nzTimeZone = tz('Pacific/Auckland');

export function formatNzDay(date: Date) {
	return format(date, 'MMM d, yyyy', { in: nzTimeZone });
}
