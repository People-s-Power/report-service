import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(data) {
    console.log(data);
  }
}
