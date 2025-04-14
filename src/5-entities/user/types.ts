export interface RoleModel {
    id: number;
    name: string;
}

export interface UserModel {
    id: number;
    username: string;
    email?: string;
    roles: RoleModel[];
}
