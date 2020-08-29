import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getWelcomeMsg() {
    return { msg: 'Start building your Postgres-Express-React Application' };
  }
}
