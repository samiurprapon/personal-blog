export class CustomHttpException extends Error {
	status: number;
	message: string;
	additionalInfo: unknown;

	constructor(status: number, message: string, additionalInfo: unknown) {
		super(message);

		this.status = status;
		this.message = message;
		this.additionalInfo = additionalInfo;
	}
}

export default CustomHttpException;
