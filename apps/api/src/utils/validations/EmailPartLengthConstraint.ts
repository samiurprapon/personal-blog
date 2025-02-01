import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'emailPartLength', async: false })
export class EmailPartLengthConstraint implements ValidatorConstraintInterface {
	validate(email: string) {
		const [localPart, domainPart] = email.split('@');

		if (!localPart || !domainPart) {
			return false; // Invalid email
		}

		return localPart.length <= 64 && domainPart.length <= 255;
	}

	defaultMessage() {
		return 'The local part of the email must not exceed 64 characters, and the domain part must not exceed 255 characters.';
	}
}
