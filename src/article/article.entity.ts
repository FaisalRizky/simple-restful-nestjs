import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity()
export class Article {
    @PrimaryGeneratedColumn()
    id : number;

    @Column('text',{nullable:false})
    author : string;

    @Column('text',{nullable:false})
    title : string;

    @Column('text',{nullable:false})
    body : string;
    
    @Column({type: 'timestamp', default: () => 'current_timestamp'})
    created: Timestamp
}