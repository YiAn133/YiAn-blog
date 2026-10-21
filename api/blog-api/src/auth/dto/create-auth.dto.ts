import { IsNotEmpty } from "class-validator"

export class CreateAuthDto {
    @IsNotEmpty({message:"用户名称不能为空"})
    userName:string
    @IsNotEmpty({message:"用户密码不能为空"})
    passWord:string
}
