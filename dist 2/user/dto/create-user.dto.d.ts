import { Provider } from '../entities/provider.enum';
export declare class CreateUserDto {
    username: string;
    email: string;
    password?: string;
    provider?: Provider;
    profileImg?: string;
}
