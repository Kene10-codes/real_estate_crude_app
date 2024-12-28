import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";


@Injectable()
export class JWTGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        console.log("JWT GUARD")
        return super.canActivate(context)
    }

    handleRequest(err, user, info) {
        // Custom error handling or user validation
        if (err || !user) {
          throw err || new UnauthorizedException();
        }
        return user;
      }
}