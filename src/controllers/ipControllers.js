const {
  getIp,
  getMyIp,
  getFavouritesIp,
  getBannedIp,
  getAllIpStores,
  saveIpList,
  createStatusAndIp,
  updateStatusIp,
  deleteIpAddress,
} = require("../services/ipServiceQuerys");
const axios = require("axios");

const getIpController = async (req, res) => {
  const { ip } = req.query;
  console.log(ip);
  try {
    res.status(200).send(await getIp(ip));
  } catch (error) {
    res.status(404).send({
      name: error.name,
      message: error.message,
    });
    console.log({
      name: error.name,
      message: error.message,
    });
  }
};

const getMyIpController = async (req, res) => {
  try {
    res.status(200).send(await getMyIp());
  } catch (error) {
    res.status(404).send({
      name: error.name,
      message: error.message,
    });
    console.log({
      name: error.name,
      message: error.message,
    });
  }
};

const getFavouritesIpController = async (req, res) => {
  try {
    res.status(200).send(await getFavouritesIp());
  } catch (error) {
    res.status(404).send({
      name: error.name,
      message: error.message,
    });
    console.log({
      name: error.name,
      message: error.message,
    });
  }
};

const getBannedIpController = async (req, res) => {
  try {
    res.status(200).send(await getBannedIp());
  } catch (error) {
    res.status(404).send({
      name: error.name,
      message: error.message,
    });
    console.log({
      name: error.name,
      message: error.message,
    });
  }
};

const getAllIpStoresController = async (req, res) => {
  try {
    res.status(200).send(await getAllIpStores());
  } catch (error) {
    res.status(404).send({
      name: error.name,
      message: error.message,
    });
    console.log({
      name: error.name,
      message: error.message,
    });
  }
};

const saveIpListController = async (req, res) => {
  const { ip, ipData } = req.body;
  // console.log(ip);
  try {
    res.status(201).send(await saveIpList(ip, ipData));
  } catch (error) {
    res.status(404).send({
      name: error.name,
      message: error.message,
    });
    console.log({
      name: error.name,
      message: error.message,
    });
  }
};

const createStatusAndIpController = async (req, res) => {
  const { ip, status, ipData } = req.body;
  try {
    res.status(201).send(await createStatusAndIp(ip, status, ipData));
  } catch (error) {
    res.status(404).send({
      name: error.name,
      message: error.message,
    });
    console.log({
      name: error.name,
      message: error.message,
    });
  }
};

const updateStatusIpController = async (req, res) => {
  const { ip, status } = req.body;
  console.log(ip, status);
  try {
    res.status(200).send(await updateStatusIp(ip, status));
  } catch (error) {
    res.status(404).send({
      name: error.name,
      message: error.message,
    });
    console.log({
      name: error.name,
      message: error.message,
    });
  }
};

const deleteIpAddressController = async (req, res) => {
  const { ip } = req.query;
  try {
    res.status(200).send(await deleteIpAddress(ip));
  } catch (error) {
    res.status(404).send({
      name: error.name,
      message: error.message,
    });
    console.log({
      name: error.name,
      message: error.message,
    });
  }
};

module.exports = {
  getIpController,
  getMyIpController,
  getFavouritesIpController,
  getBannedIpController,
  getAllIpStoresController,
  saveIpListController,
  createStatusAndIpController,
  updateStatusIpController,
  deleteIpAddressController,
};
