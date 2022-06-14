import * as bcrypt from 'bcrypt';
import { Pedido } from 'src/pedidos/entities/pedido.entity';
import { Produto } from 'src/produtos/entities/produto.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'usuarios', schema: 'public' })
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

  @OneToMany(() => Pedido, pedidos => pedidos.usuarioId, {
    cascade: true,
  })
  pedidos: Pedido[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;

  @BeforeInsert()
  async hashPassword() {
    this.senha = await bcrypt.hash(this.senha, Number(process.env.HASH_SALT));
  }
}
