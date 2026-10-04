import { readFileSync } from 'node:fs';

type ReportDescriptor = { node: unknown; message: string };
type RuleContext = { report: (descriptor: ReportDescriptor) => void };
type StringCheck = (text: string, node: unknown, context: RuleContext) => void;

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null;
}

function stringRule(check: StringCheck) {
	return {
		create(context: RuleContext) {
			return {
				Literal(node: unknown) {
					if (isRecord(node) && typeof node.value === 'string') check(node.value, node, context);
				},
				TemplateElement(node: unknown) {
					if (isRecord(node) && isRecord(node.value) && typeof node.value.raw === 'string') {
						check(node.value.raw, node, context);
					}
				}
			};
		}
	};
}

const arbitraryColourPattern = /-\[[^\]]*(#[0-9a-f]{3,8}\b|rgba?\(|hsla?\()/i;
const arbitraryFontSizePattern = /(^|[\s:])text-\[\d+(\.\d+)?(px|rem|em)\]/;
const rawBevelPattern = /(^|\s)bevel-(button|inset)(\s|$)/;

const textVariantSource = readFileSync(
	new URL('../src/lib/components/ui/Text.tsx', import.meta.url),
	'utf8'
);
const textVariants = [
	...textVariantSource.matchAll(/(\w+): \{ element: '\w+', className: '([^']+)' \}/g)
].map((match) => ({ name: match[1], classNames: (match[2] ?? '').split(' ') }));

const colourStyleProperties = new Set([
	'color',
	'background',
	'backgroundColor',
	'borderColor',
	'fill',
	'stroke'
]);

function isStaticString(node: unknown) {
	if (!isRecord(node)) return false;
	if (node.type === 'Literal') return typeof node.value === 'string';
	return (
		node.type === 'TemplateLiteral' &&
		Array.isArray(node.expressions) &&
		node.expressions.length === 0
	);
}

function propertyName(property: Record<string, unknown>) {
	const key = property.key;
	if (!isRecord(key)) return null;
	if (key.type === 'Identifier' && typeof key.name === 'string') return key.name;
	if (key.type === 'Literal' && typeof key.value === 'string') return key.value;
	return null;
}

const plugin = {
	meta: { name: 'design-system' },
	rules: {
		'no-arbitrary-colour': stringRule((text, node, context) => {
			if (arbitraryColourPattern.test(text)) {
				context.report({
					node,
					message:
						'Hard-coded colour in a Tailwind class. Add a token to the @theme block in src/app.css and use its class.'
				});
			}
		}),
		'no-arbitrary-font-size': stringRule((text, node, context) => {
			if (arbitraryFontSizePattern.test(text)) {
				context.report({
					node,
					message:
						'Pixel font size in a Tailwind class. Use a size token like text-2xs or text-window, or add one to src/app.css.'
				});
			}
		}),
		'no-raw-bevel': stringRule((text, node, context) => {
			if (rawBevelPattern.test(text)) {
				context.report({
					node,
					message:
						'Raw bevel class. Use Inset, Raised, BevelButton or their class helpers from src/lib/components/ui.'
				});
			}
		}),
		'use-text-variant': stringRule((text, node, context) => {
			const classNames = new Set(text.split(/\s+/));
			const repeatedVariant = textVariants.find((variant) =>
				variant.classNames.every((className) => classNames.has(className))
			);
			if (repeatedVariant) {
				context.report({
					node,
					message: `These classes repeat a Text variant. Use <Text variant="${repeatedVariant.name}"> instead.`
				});
			}
		}),
		'no-intrinsic-elements': {
			create(context: RuleContext) {
				return {
					JSXOpeningElement(node: unknown) {
						if (!isRecord(node) || !isRecord(node.name)) return;
						const { name } = node.name;
						if (
							node.name.type === 'JSXIdentifier' &&
							typeof name === 'string' &&
							/^[a-z]/.test(name)
						) {
							context.report({
								node,
								message: `Plain <${name}> in a route file. Move the markup into a component in src/lib/components.`
							});
						}
					}
				};
			}
		},
		'no-static-colour-style': {
			create(context: RuleContext) {
				return {
					JSXAttribute(node: unknown) {
						if (!isRecord(node) || !isRecord(node.name) || node.name.name !== 'style') return;
						if (!isRecord(node.value) || !isRecord(node.value.expression)) return;
						const { expression } = node.value;
						if (expression.type !== 'ObjectExpression' || !Array.isArray(expression.properties))
							return;

						for (const property of expression.properties) {
							if (!isRecord(property)) continue;
							const name = propertyName(property);
							if (name && colourStyleProperties.has(name) && isStaticString(property.value)) {
								context.report({
									node: property,
									message: `Hard-coded ${name} in a style prop. Use a token class instead.`
								});
							}
						}
					}
				};
			}
		}
	}
};

export default plugin;
