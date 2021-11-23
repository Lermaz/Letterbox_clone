import { Get, Injectable, Req, Res } from '@nestjs/common';
import { Public } from 'src/utils/custom-decorators';
import { Response } from 'express';
import { successResponse } from 'src/utils/http-responses';
import pjson from './../../package.json';

@Injectable()
export class AppService {
  @Public()
  @Get('/')
  async getHealtyCheck(@Req() req, @Res() res: Response) {
    return res.status(200).json(
      successResponse(
        {
          name: pjson.name,
          version: pjson.version,
        },
        'Information obtained correctly.',
        200,
      ),
    );
  }
}
