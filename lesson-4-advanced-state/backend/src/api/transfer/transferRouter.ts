import { Router } from "express";
import * as TransferController from "./transferController";
const router = Router();
router.get("/", TransferController.listTransfers);
router.post("/", TransferController.createTransfer);
// C: Il manque la route pour récupérer un transfert par son ID

export default router;
