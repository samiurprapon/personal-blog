import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { Controller, Get } from '@/utils/decorators/method.decorator';
import { AbstractController } from '@/abstracts/abstract.controller';

// import { HttpException } from '@/utils/exceptions/HttpException';

@Controller('/api/system')
export class SystemController extends AbstractController {
	private static instance: SystemController;

	private constructor() {
		super();
	}

	static getInstance() {
		return (this.instance ??= new SystemController());
	}

	@Get('/health')
	async healthCheck(_req: Request, res: Response) {
		return res.sendStatus(StatusCodes.OK);
	}
}
