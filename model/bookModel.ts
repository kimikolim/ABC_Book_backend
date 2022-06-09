import { IsNotEmpty, IsString, IsBoolean, IsDate } from "class-validator";

export class Book {
    id?: string;

    @IsString()
    @IsNotEmpty()
    title: string | undefined

    @IsString()
    @IsNotEmpty()
    description: string | undefined

    @IsString()
    @IsNotEmpty()
    genre: string | undefined

    @IsString()
    @IsNotEmpty()
    author: string | undefined

    @IsDate()
    @IsNotEmpty()
    yearPublished: number | undefined

    @IsBoolean()
    @IsNotEmpty()
    availability: boolean | undefined
 
    @IsString()
    @IsNotEmpty()
    borrower: string | undefined

}