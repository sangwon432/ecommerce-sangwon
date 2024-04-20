import { UserService } from './user.service';
import { RequestWithUserInterface } from '../auth/interfaces/requestWithUser.interface';
import { exBufferedFile } from '../minio-client/file.model';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getAllUserInfo(): Promise<import("./entities/user.entity").User[]>;
    updateProfileFromToken(req: RequestWithUserInterface, image: exBufferedFile, updateUserDto?: UpdateUserDto): Promise<import("typeorm").UpdateResult>;
    deleteUser(req: RequestWithUserInterface): Promise<import("typeorm").UpdateResult>;
    cancelUserDeleteRequest(req: RequestWithUserInterface): Promise<import("typeorm").UpdateResult>;
}
