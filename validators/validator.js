import {body} from "express-validator";

export const contactEmailValidator = [
  body("email"),
  body("text")
]
