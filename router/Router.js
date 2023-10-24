import {Router} from "express";
import {contactEmailValidator} from "../validators/validator.js";
import controller from "../controllers/Controller.js";
import handleValidationError from "../validators/handleValidationError.js";

const router = new Router();

router.post("/contactEmail", contactEmailValidator, handleValidationError, controller.sendContactEmail)
router.post("/contactEmail2", contactEmailValidator, handleValidationError, controller.sendContactEmail2)
router.post("/contactEmail3", contactEmailValidator, handleValidationError, controller.sendContactEmail3)

export default router;
