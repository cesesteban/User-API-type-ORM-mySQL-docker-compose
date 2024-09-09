import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { UserRoleEntity } from './UserRoleEntity';
import { UserSessionEntity } from './UserSessionEntity';
import { EUserRole } from '../enums/EUserRole';

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 255, unique: true })
    username: string;

    @Column({ type: 'varchar', length: 255, unique: false })
    firstName: string;

    @Column({ type: 'varchar', length: 255, unique: false })
    lastName: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 2, unique: false })
    countryIso: string;

    @Column({ type: 'varchar', length: 255, unique: false })
    passwordHash: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @OneToMany(() => UserRoleEntity, (role) => role.user, { cascade: true })
    roles: UserRoleEntity[];

    @OneToOne(() => UserSessionEntity, (session) => session.user, { cascade: true })
    @JoinColumn()
    session: UserSessionEntity;

    @Column({ type: 'tinyint', default: 1 })
    isActive: boolean;
}
