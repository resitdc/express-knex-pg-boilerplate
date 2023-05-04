interface SuccessResponse {
  success: boolean;
  message: string;
  [key: string]: any;
}

export const successResponse = (
  message: string,
  results: object
): SuccessResponse => {
  let response: SuccessResponse = {
    success: true,
    message: message,
    ...results,
  };

  return response;
};

interface ErrorResponse {
  success: boolean;
  message: string;
  [key: string]: any;
}

export const errorResponse = (
  message: string,
  results?: object
): ErrorResponse => {
  let response: ErrorResponse = {
    success: false,
    message: message,
    ...results,
  };

  return response;
};

interface PaginationResponse {
  page: number;
  next: number;
  prev: number;
  limit: number;
  totalPage: number;
  totalData: number;
}

export const paginationResponse = (
  page: number,
  limit: number,
  totalData: number
): PaginationResponse => {
  let response: PaginationResponse = {
    page,
    next: page + 1,
    prev: page < 1 ? page : page - 1,
    limit: limit,
    totalPage: Math.ceil(totalData / limit),
    totalData: totalData,
  };

  return response;
};

interface AuthResponse {
  success: boolean;
  message: string;
  accessToken?: string | null;
  userData?: object | null;
}

export const authResponse = (
  status: boolean,
  message: string,
  token?: string,
  user?: object
): AuthResponse => {
  return {
    success: status,
    message: message,
    accessToken: token,
    userData: user,
  };
};

interface NoAccessResponse {
  success: boolean;
  message: string;
  [key: string]: any;
}

export const noAccess = (results: object): NoAccessResponse => {
  let response: NoAccessResponse = {
    success: false,
    message: "You do not have access to this endpoint",
    ...results,
  };

  return response;
};
