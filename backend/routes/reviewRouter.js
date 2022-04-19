import express, { Router } from "express";
const router = express.Router();

// most functions are async to deal with mongoose
router.post("/create", async (req, res) => {
    // handle creating new reviews
});

router.get("/view/:id", async (req, res) => {
    // handle viewing review with the given id
});

export default router;
