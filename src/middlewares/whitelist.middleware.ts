import { Server } from '@hapi/hapi';
import { AUTH_NAMES } from '../constants/auth';

const VALID_SIGNATURE = process.env.VALID_SIGNATURE;
export default class WhitelistMiddleware {
    public static registration = (server: Server) => {
        server.auth.scheme(AUTH_NAMES.whitelist, (_server: Server) => {
            return {
                authenticate: async (request, h) => {
                    const sig = request.headers.signature;
                    if (sig !== VALID_SIGNATURE) {
                        return h
                            .response({
                                statusCode: 401,
                                message: 'You do not have permission to access this API'
                            })
                            .code(401)
                            .takeover();
                    }
                    return h.authenticated({
                        credentials: {
                            signature: sig,
                        },
                    });
                },
            };
        });
        server.auth.strategy(AUTH_NAMES.whitelist, AUTH_NAMES.whitelist);
    };

    public static registerAll = (server: Server) => {
        WhitelistMiddleware.registration(server);
    };
}
