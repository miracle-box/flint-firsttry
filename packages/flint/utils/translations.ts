export function replacePrarms(string: string, ...parameters: string[]): string {
	let replacedString = string;

	for (const [index, parameter] of parameters.entries()) {
		replacedString = replacedString.replaceAll(`{${index}}`, parameter);
	}

	return replacedString;
}
