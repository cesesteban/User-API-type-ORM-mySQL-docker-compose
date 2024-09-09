import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';
import { EUserRole } from '../../enums/EUserRole';

@Entity()
export class UserRole {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(() => User, (user) => user.roles)
    user: User;

    @Column({
        type: 'enum',
        enum: EUserRole,
        default: EUserRole.GUEST
    })
    role: EUserRole;

    @Column({ type: 'tinyint', default: 1 })
    isActive: boolean;
}
