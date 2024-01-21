import { User } from '../../user/entities/user.entity';
import { Request } from 'express';
export interface RequestWithUserInterface extends Request {
  user: User; // local auth strategy의 결과, 에러일 경우 user = null
}
