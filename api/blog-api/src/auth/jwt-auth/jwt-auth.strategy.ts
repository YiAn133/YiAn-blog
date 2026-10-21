import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt,Strategy } from "passport-jwt";
import { jwtConstants } from "../../common/contstants.js";

@Injectable()
export class jwtAuthStrategy extends PassportStrategy(Strategy,'jwt'){
    constructor(){
        super({
             jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
        })
    }
    async validate(payload:any) {
        const {userName} = payload
        return {
            userName
        }
    }
}