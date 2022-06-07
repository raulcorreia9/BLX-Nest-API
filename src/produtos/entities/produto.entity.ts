import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column()
  usuarioId: number;
}
