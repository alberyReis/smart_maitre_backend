export interface IHttpResponse {
  statusCode: number
  body?: any
  message: string
}

export const httpResponse = {
  ok: async (message: string, body?: any): Promise<IHttpResponse> => ({
    statusCode: 200,
    body,
    message,
  }),

  created: async (message: string, body?: any): Promise<IHttpResponse> => ({
    statusCode: 201,
    body,
    message,
  }),

  badRequest: async (message: string, body?: any): Promise<IHttpResponse> => ({
    statusCode: 400,
    body,
    message,
  }),

  unauthorized: async (message: string, body?: any): Promise<IHttpResponse> => ({
    statusCode: 401,
    body,
    message,
  }),

  forbidden: async (message: string, body?: any): Promise<IHttpResponse> => ({
    statusCode: 403,
    body,
    message,
  }),

  notFound: async (message: string, body?: any): Promise<IHttpResponse> => ({
    statusCode: 404,
    body,
    message,
  }),

  serverError: async (message: string, body?: any): Promise<IHttpResponse> => ({
    statusCode: 500,
    body,
    message,
  }),
}
