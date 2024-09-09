import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { UserRole } from './UserRole';
import { UserSession } from './UserSession';

@Entity()
export class User {
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

    @OneToMany(() => UserRole, (role) => role.user, { cascade: true })
    roles: UserRole[];

    @OneToOne(() => UserSession, (session) => session.user, { cascade: true })
    @JoinColumn()
    session: UserSession;

    @Column({ type: 'tinyint', default: 1 })
    isActive: boolean;
}
