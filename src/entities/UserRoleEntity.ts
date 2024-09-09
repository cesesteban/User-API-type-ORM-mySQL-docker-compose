import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserEntity } from './UserEntity';
import { EUserRole } from '../enums/EUserRole';

@Entity()
export class UserRoleEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(() => UserEntity, (user) => user.roles)
    user: UserEntity;

    @Column({
        type: 'enum',
        enum: EUserRole,
        default: EUserRole.GUEST
    })
    role: EUserRole;

    @Column({ type: 'tinyint', default: 1 })
    isActive: boolean;
}
