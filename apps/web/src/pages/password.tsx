import { useState, useCallback } from 'react';
import { Copy, RefreshCw } from 'lucide-react';
import { toast } from 'react-hot-toast';

import PasswordGenerator from '~/utils/password';
import type { GenerateOptions } from '~/interfaces/PasswordGenerateOptions';

import Navigation from '~/components/header/Navigation';

interface OptionConfig {
	id: keyof GenerateOptions;
	label: string;
}

const OPTIONS_CONFIG: OptionConfig[] = [
	{ id: 'numbers', label: 'Include Numbers' },
	{ id: 'symbols', label: 'Include Symbols' },
	{ id: 'lowercase', label: 'Include Lowercase Letters' },
	{ id: 'uppercase', label: 'Include Uppercase Letters' },
	{ id: 'excludeSimilarCharacters', label: 'Exclude Similar Characters' },
	{ id: 'strict', label: 'Strict Mode' },
];

const PasswordGeneratorPage = () => {
	const [copied, setCopied] = useState<boolean>(false);
	const [password, setPassword] = useState<string>('');
	const [placeholder, setPlaceholder] = useState<string>('Your Generated Password');
	const [options, setOptions] = useState<GenerateOptions>({
		length: 14,
		numbers: true,
		symbols: true,
		lowercase: true,
		uppercase: true,
		excludeSimilarCharacters: true,
		strict: true,
	});

	const generatePassword = useCallback(() => {
		try {
			const newPassword = PasswordGenerator.generate(options);
			setPassword(newPassword);
			setCopied(false);
		} catch {
			setPassword('');
			setCopied(false);

			setPlaceholder('Select at least one option');
		}
	}, [options]);

	const copyToClipboard = async () => {
		try {
			if (password.length) {
				await navigator.clipboard.writeText(password);
				setCopied(true);
				setTimeout(() => setCopied(false), 2000);
			}
		} catch {
			toast.error('Failed to copy password');
		}
	};

	const handleOptionChange = useCallback(
		(id: keyof GenerateOptions, value: boolean | number) => {
			setOptions((prev) => {
				const newOptions = { ...prev, [id]: value };

				// if strict changed to true, change symbols also true
				if (id === 'strict' && value) {
					newOptions.symbols = true;
				}

				// if symbols changed to false, change strict also false
				if (id === 'symbols' && !value) {
					newOptions.strict = false;
				}

				// if at least one option is enabled, generate a new password
				if (Object.values(newOptions).some((option) => !!option)) {
					generatePassword();
				} else {
					// set placeholder password - no options enabled
					setPassword('Select at least one option');
				}

				return newOptions;
			});
		},
		[generatePassword],
	);

	return (
		<>
			<Navigation />

			<main className='container'>
				<div className='row'>
					<div className='col-xs-12'>
						<header className='header mt-xs-2'>
							<h1>Customize Password Generator</h1>
							<p>Generate secure passwords with custom requirements</p>
						</header>
					</div>
				</div>

				<div className='row'>
					<div className='col-xs-12'>
						<hr />
						<br />
					</div>
				</div>

				<div className='row'>
					<div className='col-xs-12 col-md-6 order-xs-3 order-md-1'>
						<div className='card'>
							<div className='container'>
								<div className='row'>
									<div className='col-xs-12'>
										<div className='lengthControl'>
											<div className='lengthHeader'>
												<label htmlFor='range'>Password Length</label>
												<span>{options.length} characters</span>
											</div>
											<input
												type='range'
												min='6'
												max='32'
												value={options.length}
												onChange={(e) => {
													handleOptionChange('length', Number.parseInt(e.target.value));

													if (Object.values(options).some((option) => !!option)) {
														generatePassword();
													} else {
														// set placeholder password - no options enabled
														setPassword('Select at least one option');
													}
												}}
											/>
										</div>
									</div>

									<div className='col-md-12 col-xs-12'>
										<div className={'options'}>
											{OPTIONS_CONFIG.map(({ id, label }) => (
												<div key={id} className={'option'}>
													<label htmlFor={id}>{label}</label>
													<label className={'toggle'}>
														<input
															type='checkbox'
															id={id}
															checked={!!options[id]}
															onChange={(e) => handleOptionChange(id, e.target.checked)}
														/>
														<span className={'slider'} />
													</label>
												</div>
											))}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='col-xs-12 col-md-1 order-xs-2'>
						<br />
					</div>

					<div className='col-xs-12 col-md-5 order-xs-1 order-md-2'>
						<div className='passwordDisplay'>
							<input type='text' value={password} readOnly placeholder={placeholder} />
							<div className='actions'>
								<button type='button' onClick={copyToClipboard} title='Copy to clipboard' className='iconButton'>
									<Copy />
								</button>
								<button type='button' onClick={generatePassword} title='Generate new password' className='iconButton'>
									<RefreshCw />
								</button>
							</div>
						</div>

						{copied && <div className='successMessage'>Password copied to clipboard!</div>}
					</div>
				</div>
			</main>
		</>
	);
};

export default PasswordGeneratorPage;
