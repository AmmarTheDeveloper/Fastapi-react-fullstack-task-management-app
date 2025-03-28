from fastapi import Request,HTTPException
from starlette.middleware.base import BaseHTTPMiddleware
from helper.token import verify_token
from fastapi.responses import JSONResponse

AUTH_ROUTES = ["/auth/login", "/auth/register"]
EXCLUDE_ROUTES = ["/docs", "/openapi.json", "/redoc"]

class VerifyTokenInvalid(BaseHTTPMiddleware):
    async def dispatch(self,request : Request,call_next):

        try:
            if request.url.path in EXCLUDE_ROUTES or request.method == "OPTIONS":
                return await call_next(request)

            if request.url.path in AUTH_ROUTES:
                try:
                    auth_header = request.headers.get("Authorization")
                    if auth_header:
                        raise HTTPException(status_code=401, detail="Already logged in")

                except Exception as e:
                    print(f"Error in VerifyTokenInvalid: {e}")
                    raise HTTPException(status_code=500, detail="Internal Server Error")

            return await call_next(request)
        except HTTPException as e:
            return JSONResponse(status_code=e.status_code,content={"message" : e.detail})
        except Exception as e:
            return JSONResponse(status_code=500,content={"message" : str(e)})

class VerifyToken(BaseHTTPMiddleware):
    async def dispatch(self,request : Request,call_next):
        try:
            if request.url.path in EXCLUDE_ROUTES or request.method == "OPTIONS":
                return await call_next(request)

            if request.url.path in AUTH_ROUTES:
                return await call_next(request)

            try:
                auth_header = request.headers.get("Authorization")

                if not auth_header or not auth_header.startswith("Bearer"):
                    raise HTTPException(status_code=401, detail="Missing or invalid token")

                parts = auth_header.split(" ")

                if len(parts) != 2:
                    raise HTTPException(status_code=401, detail="Invalid token format")

                token = parts[1]

                payload = verify_token(token)

                request.state.user = payload

                response = await call_next(request)
                return response
            except HTTPException as exc:
                raise HTTPException(status_code=exc.status_code, detail=exc.detail)
            except Exception as e:
                raise HTTPException(status_code=401, detail="Invalid or expired token")
        except HTTPException as e:
            return JSONResponse(status_code=e.status_code,content={"message" : e.detail})
        except Exception as e:
            return JSONResponse(status_code=500,content={"message" : str(e)})
