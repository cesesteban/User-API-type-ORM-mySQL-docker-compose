import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from 'typeorm';
import { UserEntity } from './UserEntity';

@Entity()
export class UserSessionEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @OneToOne(() => UserEntity, (user) => user.session)
    user: UserEntity;

    @Column({ type: 'varchar', length: 255, unique: true })
    sessionToken: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @Column({ type: 'timestamp' })
    expiresAt: Date;
}
