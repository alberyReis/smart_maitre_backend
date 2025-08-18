export interface IHttpResponse {
  statusCode: number
  body?: any
  message: string
}

const httpResponse = {
  ok: async (body?: any): Promise<IHttpResponse> => {
    return {
      statusCode: 200,
      body,
      message: "The request was successful.",
    }
  },

  created: async (body?: any): Promise<IHttpResponse> => {
    return {
      statusCode: 201,
      body,
      message: "The resource was successfully created.",
    }
  },

  badRequest: async (body?: any): Promise<IHttpResponse> => {
    return {
      statusCode: 400,
      body,
      message: "The request could not be understood or was missing required parameters.",
    }
  },

  unauthorized: async (body?: any): Promise<IHttpResponse> => {
    return {
      statusCode: 401,
      body,
      message: "Authentication is required or has failed.",
    }
  },

  forbidden: async (body?: any): Promise<IHttpResponse> => {
    return {
      statusCode: 403,
      body,
      message: "You do not have permission to access this resource.",
    }
  },

  notFound: async (body?: any): Promise<IHttpResponse> => {
    return {
      statusCode: 404,
      body,
      message: "The requested resource could not be found.",
    }
  },

  serverError: async (body?: any): Promise<IHttpResponse> => {
    return {
      statusCode: 500,
      body,
      message: "An unexpected error occurred on the server.",
    }
  },
}

export { httpResponse }
