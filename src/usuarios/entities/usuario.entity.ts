/* eslint-disable prettier/prettier */
import * as bcrypt from 'bcrypt';
import { Produto } from 'src/produtos/entities/produto.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @OneToMany(type => Produto, produtos => produtos.usuarioId, {
    cascade: true,
  })
  produtos: Produto[];

  @BeforeInsert()
  async hashPassword() {
    this.senha = await bcrypt.hash(this.senha, Number(process.env.HASH_SALT));
  }
}
