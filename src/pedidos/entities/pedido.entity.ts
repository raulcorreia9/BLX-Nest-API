import { Min } from 'class-validator';
import { Produto } from 'src/produtos/entities/produto.entity';
import { Usuarios } from 'src/usuarios/entities/usuario.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('pedidos')
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, default: true })
  entrega: boolean;

  @Column({ nullable: true })
  @Min(1)
  quantidade: number;

  @Column()
  numeroCasa: number;

  @Column()
  rua: string;

  @Column()
  bairro: string;

  @Column()
  cidade: string;

  @JoinColumn({ name: 'comprador_id' })
  @ManyToOne(() => Usuarios, usuarioId => usuarioId.pedidos)
  usuarioId: Usuarios;

  @ManyToMany(() => Produto, (produtos: Produto) => produtos.pedidos, {
    eager: true
  })
  @JoinTable({
    name: 'pedidos_produtos',
    joinColumn: {
      name: 'fk_pedidos',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'fk_produtos',
      referencedColumnName: 'id',
    },
  })
  produtos: Produto[];

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
