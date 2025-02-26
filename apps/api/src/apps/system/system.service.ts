export class SystemService {
	private static instance: SystemService;

	private constructor() {
		// constructor
	}

	static getInstance() {
		if (!this.instance) {
			this.instance = new SystemService();
		}
		return this.instance;
	}
}

export default SystemService.getInstance();
