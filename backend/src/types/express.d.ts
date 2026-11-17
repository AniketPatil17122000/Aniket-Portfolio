


// import "express";

// declare global {
//   namespace Express {
//     interface Request {
//       adminId?: string;
//     }
//   }
// }

// export {};



import "express-serve-static-core";

declare module "express-serve-static-core" {
  interface Request {
    adminId?: string;
  }
}

export {};
