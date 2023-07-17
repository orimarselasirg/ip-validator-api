const { Router } = require("express");
const router = Router();
const {
  getIpController,
  getMyIpController,
  getFavouritesIpController,
  getBannedIpController,
  getAllIpStoresController,
  saveIpListController,
  createStatusAndIpController,
  updateStatusIpController,
  deleteIpAddressController,
} = require("../controllers/ipControllers");

router.get("/getip", getIpController);
router.get("/getmyip", getMyIpController);
router.get("/getfavouriteip", getFavouritesIpController);
router.get("/getbannedip", getBannedIpController);
router.get("/getallipstore", getAllIpStoresController);
router.post("/saveip", saveIpListController);
router.post("/createipandstatus", createStatusAndIpController);
router.put("/updateipstatus", updateStatusIpController);
router.delete("/deleteip", deleteIpAddressController);

module.exports = router;
