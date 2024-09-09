import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from 'typeorm';
import { User } from './User';

@Entity()
export class UserSession {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @OneToOne(() => User, (user) => user.session)
    user: User;

    @Column({ type: 'varchar', length: 255, unique: true })
    sessionToken: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @Column({ type: 'timestamp' })
    expiresAt: Date;
}
