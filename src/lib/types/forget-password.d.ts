export type SuccessResponseForgetPassword = {
  message?: string;
  info?: string;
};

// Error case
export type ErrorResponseForgetPassword = {
  error: string; 
};

export type ForgetPasswordResponse = SuccessResponseForgetPassword | ErrorResponseForgetPassword;