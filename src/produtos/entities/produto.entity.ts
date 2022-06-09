import { Min } from 'class-validator';
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
} from 'typeorm';

@Entity('produtos')
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

  @Column({ nullable: true })
  @Min(1)
  quantidade: number;

  @JoinColumn({ name: 'usuario_id' })
  @ManyToOne(() => Usuarios, usuarioId => usuarioId.produtos)
  usuarioId: Usuarios;

  @ManyToOne(() => Pedido, pedido => pedido.produtos)
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
