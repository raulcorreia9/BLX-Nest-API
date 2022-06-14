import { Pedido } from 'src/pedidos/entities/pedido.entity';
import { Usuarios } from 'src/usuarios/entities/usuario.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';

@Entity({ name:'produtos', schema:'public' })
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  descricao: string;

  @Column({ nullable: true, type: 'float' })
  preco: number;

  @Column({ nullable: false })
  disponivel: boolean;

  // @Column()
  // usuario_id: number;

  @ManyToOne(type => Usuarios, usuarioId => usuarioId.produtos, { eager: true })
  @JoinColumn({ name: 'usuario_id' })
  usuarioId: Usuarios;

  @ManyToMany(() => Pedido, (pedidos: Pedido) => pedidos.produtos)
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
}
