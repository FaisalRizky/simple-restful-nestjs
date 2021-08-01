import { IsNotEmpty, Length } from "class-validator";

export class CreateArticle {

    @IsNotEmpty({message: 'The Article should have an author'})
    @Length(1,50)
    author : string;

    @IsNotEmpty({message: 'The Article should have a title'})
    @Length(3,50)
    title : string;

    @IsNotEmpty({message: 'The Article should have a body'})
    @Length(25, 2000)
    body : string;
}