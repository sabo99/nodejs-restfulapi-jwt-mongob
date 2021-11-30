const DeviceDetector = require('device-detector-js');

index = (req, res, next) => {
    // const userAgent = req.headers['user-agent'];
    // console.log(userAgent);
    // return res.status(200).send({ code: 200, 'user-agent': userAgent });

    const deviceDetector = new DeviceDetector();
    const userAgent = req.headers['user-agent'];
    const device = deviceDetector.parse(userAgent);

    req.deviceInfo = device;

    next();

    // let message = `Kamu menggunakan ${device.device.type}`;
    // message += ` dengan os ${device.os.name}`;
    // message += ` dan aplikasi ${device.client.type}`;

    // return res.status(200).json({
    //     success: true,
    //     message: message,
    // });
};

module.exports = { index };
