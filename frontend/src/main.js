import {
  bootstrapApplication,
  handleFatalApplicationError,
} from "./app/bootstrap.js";

bootstrapApplication().catch(handleFatalApplicationError);
