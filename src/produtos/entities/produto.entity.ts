import { Usuarios } from 'src/usuarios/entities/usuario.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinTable,
  JoinColumn,
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

  @JoinColumn({ name: 'usuario_id' })
  @ManyToOne(type => Usuarios, usuarioId => usuarioId.produtos)
  usuarioId: Usuarios;
}
