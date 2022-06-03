/* eslint-disable prettier/prettier */
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('usuarios')
export class Usuarios {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  senha: string;

  @Column()
  telefone: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @BeforeInsert()
  async hashPassword() {
    this.senha = await bcrypt.hash(this.senha, Number(process.env.HASH_SALT));
  }
}
