const IpModel = require("../models/ipModel.js");
const axios = require("axios");

const getIp = async (ip) => {
  const bannedIp = await IpModel.findOne({
    where: {
      isBanned: true,
      ipData: { ipAddress: ip },
    },
  });
  if (bannedIp) {
    return {
      status: "warning",
      message: "Tienes esta Ip en la lista de baneados",
      ban: true,
    };
  } else {
    const { data } = await axios.get(
      `http://api.ipapi.com/api/${ip}?access_key=${process.env.API_KEY}`
    );
    const currencyData = await axios.get(
      `https://restcountries.com/v3.1/name/${data.country_name}`
    );

    const infoCurrency = currencyData.data;
    const fixerData = await axios.get(
      `https://api.fastforex.io/fetch-all?api_key=${
        process.env.API_KEY_FIXER
      }&from=${Object.keys(infoCurrency[0].currencies)[0]}&to=USD`
    );
    const infoFixer = fixerData.data;
    return {
      status: "success",
      data: data,
      currency: Object.keys(infoCurrency[0].currencies)[0],
      conversion: infoFixer.results?.USD,
      ban: false,
    };
  }
};

const getMyIp = async () => {
  const { data } = await axios.get(
    `http://api.ipapi.com/api/check?access_key=${process.env.API_KEY}`
  );
  const currencyData = await axios.get(
    `https://restcountries.com/v3.1/name/${data.country_name}`
  );
  const infoCurrency = currencyData.data;

  const fixerData = await axios.get(
    `https://api.fastforex.io/fetch-all?api_key=${
      process.env.API_KEY_FIXER
    }&from=${Object.keys(infoCurrency[0].currencies)[0]}&to=USD`
  );
  const infoFixer = fixerData.data;

  return {
    data,
    currency: Object.keys(infoCurrency[0].currencies)[0],
    conversion: infoFixer.results?.USD,
  };
};

const getFavouritesIp = async () => {
  const favouritesIp = await IpModel.findAll({
    where: {
      isFavourited: true,
    },
  });
  return favouritesIp;
};

const getBannedIp = async (ip) => {
  const bannedIp = await IpModel.findAll({
    where: {
      isBanned: true,
    },
  });
  return bannedIp;
};

const getAllIpStores = async () => {
  const allIp = await IpModel.findAll();
  return allIp;
};

const saveIpList = async (ip, data) => {
  const {
    ipAddress,
    isoCode,
    countryName,
    regionName,
    cityName,
    latitude,
    longitude,
    countryFlag,
    currency,
  } = data;
  const ipFoundDelete = await IpModel.findOne({
    where: {
      ipData: { ipAddress: ip },
      isDeleted: true,
    },
  });
  const ipFound = await IpModel.findOne({
    where: {
      ipData: { ipAddress: ip },
      isDeleted: false,
    },
  });

  if (ipFound) {
    return {
      status: "warning",
      message: `La Ip N° ${ip} ya se encuentra en uno de tus listados`,
      data: ipFound,
    };
  }
  if (ipFoundDelete) {
    const reactivateIp = await IpModel.update(
      {
        isDeleted: false,
      },
      {
        where: {
          ipData: { ipAddress: ip },
        },
      }
    );
    return {
      status: "success",
      message: `La Ip N° ${ip} fue agregada a tu lista de Ip'`,
      data: reactivateIp,
    };
  } else {
    const createIp = await IpModel.create({
      ipData: {
        ipAddress,
        isoCode,
        countryName,
        regionName,
        cityName,
        latitude,
        longitude,
        countryFlag,
        currency,
      },
      isFavourited: false,
      isBanned: false,
      isDeleted: false,
    });

    return {
      status: "success",
      message: `la Ip N° ${ip} fue agregada a tu lista de Ip's`,
      data: createIp,
    };
  }
};

const createStatusAndIp = async (ip, status, data) => {
  const {
    ipAddress,
    isoCode,
    countryName,
    regionName,
    cityName,
    latitude,
    longitude,
    countryFlag,
    currency,
  } = data;
  const ipFavoriteFound = await IpModel.findOne({
    where: {
      ipData: { ipAddress: ip },
      isFavourited: true,
      isBanned: false,
      isDeleted: false,
    },
  });
  const ipBanFound = await IpModel.findOne({
    where: {
      ipData: { ipAddress: ip },
      isFavourited: false,
      isBanned: true,
      isDeleted: false,
    },
  });

  const ipDeleteFound = await IpModel.findOne({
    where: {
      ipData: { ipAddress: ip },
      isFavourited: false,
      isBanned: false,
      isDeleted: false,
    },
  });

  const ipFound = await IpModel.findOne({
    where: {
      ipData: { ipAddress: ip },
      isFavourited: false,
      isBanned: false,
      isDeleted: false,
    },
  });

  if (ipFavoriteFound && status !== "favourite") {
    return {
      status: "warning",
      message: `La Ip N° ${ip} ya esta en una de tus listas, para cambiar el estado por favor hazlo desde la pestaña correspondiente`,
      data: ipFavoriteFound,
    };
  }

  if (ipBanFound && status !== "ban") {
    return {
      status: "warning",
      message: `La Ip N° ${ip} ya esta en una de tus listas, para cambiar el estado por favor hazlo desde la pestaña correspondiente`,
      data: ipFavoriteFound,
    };
  }

  if (ipFavoriteFound && status === "favourite") {
    return {
      status: "warning",
      message: `La Ip N° ${ip} ya esta en la lista de tus favoritas`,
      data: ipFavoriteFound,
    };
  }

  if (ipBanFound && status === "ban") {
    return {
      status: "warning",
      message: `La Ip N° ${ip} ya esta baneada`,
      data: ipFavoriteFound,
    };
  }

  // ip existe en estado delete
  if (ipDeleteFound) {
    if (status === "favourite") {
      const reactivateFavIp = await IpModel.update(
        {
          isDeleted: false,
          isFavourited: true,
          isBanned: false,
        },
        {
          where: {
            ipData: { ipAddress: ip },
          },
        }
      );
      return {
        status: "success",
        message: `La Ip N° ${ip} fue agregada a tu lista de Ip'`,
        data: reactivateFavIp,
      };
    }
    if (status === "ban") {
      const reactivateBanIp = await IpModel.update(
        {
          isDeleted: false,
          isFavourited: true,
          isBanned: false,
        },
        {
          where: {
            ipData: { ipAddress: ip },
          },
        }
      );
      return {
        status: "success",
        message: `La Ip N° ${ip} fue agregada a tu lista de Ip'`,
        data: reactivateBanIp,
      };
    }
  }
  //ip existe en bd
  if (ipFound) {
    console.log("entre");
    if (status === "ban") {
      const banIpAddress = await IpModel.update(
        {
          isFavourited: false,
          isBanned: true,
        },
        {
          where: {
            ipData: { ip: ip },
          },
        }
      );
      return {
        status: "success",
        message: `La Ip N° ${ip} fue agregada a tu lista de bloqueados`,
        data: banIpAddress,
      };
    }
    if (status === "favourite") {
      const favouriteIpAddress = await IpModel.update(
        {
          isFavourited: true,
          isBanned: false,
        },
        {
          where: {
            ipData: { ip: ip },
          },
        }
      );
      return {
        status: "success",
        message: `La Ip N° ${ip} fue agregada a tu lista de favoritos`,
        data: favouriteIpAddress,
      };
    }
  } else {
    if (status === "ban") {
      const createIpBanned = await IpModel.create({
        ipData: {
          ipAddress,
          isoCode,
          countryName,
          regionName,
          cityName,
          latitude,
          longitude,
          countryFlag,
          currency,
        },
        isFavourited: false,
        isBanned: true,
        isDeleted: false,
      });
      return {
        status: "success",
        message: `La Ip N° ${ip} fue agregada a tu lista de bloqueados`,
        data: createIpBanned,
      };
    }
    if (status === "favourite") {
      const createFavouriteIp = await IpModel.create({
        ipData: {
          ipAddress,
          isoCode,
          countryName,
          regionName,
          cityName,
          latitude,
          longitude,
          countryFlag,
          currency,
        },
        isFavourited: true,
        isBanned: false,
        isDeleted: false,
      });
      return {
        status: "success",
        message: `La Ip N° ${ip} fue agregada a tu lista de favoritos`,
        data: createFavouriteIp,
      };
    }
  }
};

const updateStatusIp = async (ip, status) => {
  if (status === "ban") {
    const banIpAddress = await IpModel.update(
      {
        isFavourited: false,
        isBanned: true,
      },
      {
        where: {
          ipData: { ipAddress: ip },
        },
      }
    );
    return {
      status: "success",
      message: `La Ip N° ${ip} fue agregada a tu lista de bloqueados`,
      data: banIpAddress,
    };
  }
  if (status === "favourite") {
    const favouriteIpAddress = await IpModel.update(
      {
        isFavourited: true,
        isBanned: false,
      },
      {
        where: {
          ipData: { ipAddress: ip },
        },
      }
    );
    return {
      status: "success",
      message: `La Ip N° ${ip} fue agregada a tu lista de favoritos`,
      data: favouriteIpAddress,
    };
  }
  if (status === "on list") {
    const IpAddress = await IpModel.update(
      {
        isFavourited: false,
        isBanned: false,
        isDeleted: false,
      },
      {
        where: {
          ipData: { ipAddress: ip },
        },
      }
    );
    return {
      status: "success",
      message: `La Ip N° ${ip} fue agregada a tu lista general`,
      data: IpAddress,
    };
  }
};

const deleteIpAddress = async (ip) => {
  const ipFound = await IpModel.findOne({
    where: {
      ipData: { ipAddress: ip },
    },
  });

  if (!ipFound) {
    return {
      status: "warning",
      message: `La Ip N° ${ip} a eliminar no existe en ninguna de sus listas`,
    };
  } else {
    const deleteStateIp = await IpModel.update(
      {
        isFavourited: false,
        isBanned: false,
        isDeleted: true,
      },
      {
        where: {
          ipData: { ipAddress: ip },
        },
      }
    );
    return {
      status: "success",
      message: `La Ip N° ${ip} ha sido borrada de sus listas`,
      data: deleteStateIp,
    };
  }
};

module.exports = {
  getIp,
  getMyIp,
  getFavouritesIp,
  getBannedIp,
  getAllIpStores,
  saveIpList,
  createStatusAndIp,
  updateStatusIp,
  deleteIpAddress,
};
