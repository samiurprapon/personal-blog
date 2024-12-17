import toast from 'react-hot-toast';

import { GenerateOptions } from '~/interfaces/PasswordGenerateOptions';

export class PasswordGenerator {
	private static instance: PasswordGenerator;

	private static readonly RANDOM_BATCH_SIZE = 256;
	private static readonly LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
	private static readonly UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	private static readonly NUMBERS = '0123456789';
	private static readonly SYMBOLS = '!@#$%^&*()+_-=}{[]|:;/?.><,~';
	private static readonly SIMILAR_CHARACTERS = /[ilLI|`oO0]/g;
	private static readonly STRICT_RULES = [
		{ name: 'lowercase', rule: /[a-z]/ },
		{ name: 'uppercase', rule: /[A-Z]/ },
		{ name: 'numbers', rule: /[0-9]/ },
		{ name: 'symbols', rule: /[!@#$%^&*()+_\-=}{[\]|:;"/?.><,`~]/ },
	] as const;

	private randomIndex?: number;
	private randomBytes: Uint8Array;

	private constructor() {
		this.randomBytes = this.generateRandomBytes(
			PasswordGenerator.RANDOM_BATCH_SIZE,
		);
		this.randomIndex = undefined;
	}

	public static getInstance(): PasswordGenerator {
		if (!PasswordGenerator.instance) {
			PasswordGenerator.instance = new PasswordGenerator();
		}

		return PasswordGenerator.instance;
	}

	private generateRandomBytes(size: number): Uint8Array {
		if (typeof window !== 'undefined' && window.crypto) {
			// Use Web Crypto API for browser
			const array = new Uint8Array(size);
			window.crypto.getRandomValues(array);
			return array;
		} else if (typeof globalThis !== 'undefined' && globalThis.crypto) {
			// Fallback for environments like Node.js with Web Crypto API support
			const array = new Uint8Array(size);
			globalThis.crypto.getRandomValues(array);
			return array;
		} else {
			// Use Node.js crypto for server environments
			toast.error('No secure random number generator available');
			return new Uint8Array(size);
		}
	}

	private getNextRandomValue(): number {
		if (
			this.randomIndex === undefined ||
			this.randomIndex >= this.randomBytes.length
		) {
			this.randomIndex = 0;
			this.randomBytes = this.generateRandomBytes(
				PasswordGenerator.RANDOM_BATCH_SIZE,
			);
		}

		const result = this.randomBytes[this.randomIndex];
		this.randomIndex += 1;

		return result;
	}

	private randomNumber(max: number): number {
		let rand = this.getNextRandomValue();
		while (rand >= 256 - (256 % max)) {
			rand = this.getNextRandomValue();
		}
		return rand % max;
	}

	private generateFromPool(options: GenerateOptions, pool: string): string {
		let password = '';
		const optionsLength = options.length!;
		const poolLength = pool.length;

		for (let i = 0; i < optionsLength; i++) {
			password += pool[this.randomNumber(poolLength)];
		}

		if (options.strict) {
			const fitsRules = PasswordGenerator.STRICT_RULES.every((rule) => {
				if (options[rule.name] === false) return true;

				if (rule.name === 'symbols' && typeof options[rule.name] === 'string') {
					const re = new RegExp(`[${options[rule.name]}]`);
					return re.test(password);
				}

				return rule.rule.test(password);
			});

			if (!fitsRules) return this.generateFromPool(options, pool);
		}

		return password;
	}

	/**
	 * Generate one password with the given options.
	 */
	generate(options: GenerateOptions = {}): string {
		// Set defaults
		const defaultedOptions: GenerateOptions = {
			length: 14,
			numbers: false,
			symbols: false,
			exclude: '',
			uppercase: true,
			lowercase: true,
			excludeSimilarCharacters: false,
			strict: false,
			...options,
		};

		if (!defaultedOptions.length) {
			defaultedOptions.length = 14;
		}

		// Validate strict mode requirements
		if (defaultedOptions.strict) {
			const minStrictLength = [
				defaultedOptions.lowercase,
				defaultedOptions.uppercase,
				defaultedOptions.numbers,
				defaultedOptions.symbols,
			].filter(Boolean).length;

			if (minStrictLength > defaultedOptions.length) {
				throw new TypeError('Length must correlate with strict guidelines');
			}
		}

		// Generate character pool
		let pool = '';

		if (defaultedOptions.lowercase) pool += PasswordGenerator.LOWERCASE;
		if (defaultedOptions.uppercase) pool += PasswordGenerator.UPPERCASE;
		if (defaultedOptions.numbers) pool += PasswordGenerator.NUMBERS;

		if (defaultedOptions.symbols) {
			pool +=
				typeof defaultedOptions.symbols === 'string'
					? defaultedOptions.symbols
					: PasswordGenerator.SYMBOLS;
		}

		if (!pool) {
			throw new TypeError('At least one rule for pools must be true');
		}

		// Apply exclusions
		if (defaultedOptions.excludeSimilarCharacters) {
			pool = pool.replace(PasswordGenerator.SIMILAR_CHARACTERS, '');
		}

		if (defaultedOptions.exclude) {
			for (const char of defaultedOptions.exclude) {
				pool = pool.replace(char, '');
			}
		}

		return this.generateFromPool(defaultedOptions, pool);
	}

	/**
	 * Bulk generate multiple passwords at once, with the same options for all.
	 */
	generateMultiple(amount: number, options: GenerateOptions = {}): string[] {
		return Array.from({ length: amount }, () => this.generate(options));
	}
}

export default PasswordGenerator.getInstance();
