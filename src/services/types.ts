export type ApiError =
  | {
      message: string;
      status: number;
    }
  | {
      error: string;
      status: number;
      errors: Array<{ field: string; message: string }>;
    }
  | {
      status: number;
      error: {
        code: string;
        message: string;
        fields?: Array<{ field: string; message: string }>;
      };
    };
