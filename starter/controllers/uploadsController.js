const { StatusCodes } = require('http-status-codes');
const path = require('path');
const CustomError = require('../errors');
const cloudinary = require('cloudinary').v2
const fs = require('fs');


const uploadProductImageLocal = async (req, res) => {
    //check if the file exists
    if (!req.files) {
        throw new CustomError.BadRequestError("No file uploaded");
    }
    //check format
    //check size
    //console.log(req.files);
    const productImage = req.files.image;
    if (!productImage.mimetype.startsWith('image')) {
        throw new CustomError.BadRequestError('Please upload image');
    }
    const maxSize = 1024 * 1024;
    if (productImage.size > maxSize) {
        throw new CustomError.BadRequestError("Please upload image smaller than 1KB");
    }

    const imagePath = path.join(__dirname, '../public/uploads/' + `${productImage.name}`,)
    //ensure the image we are adding the folder to is publiclly available 
    //i.e should be a static asset and second thing is we want to send it
    //back with the correct path 
    await productImage.mv(imagePath);
    return res.status(StatusCodes.OK).json({ image: { src: `/uploads/${productImage.name}` } })
}

const uploadProductImage = async (req, res) => {
    console.log(req.files.image);
    const result = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
        use_filename: true,
        folder: 'fileUpload',
    });
    //console.log(result);
    fs.unlinkSync(req.files.image.tempFilePath); //delete the images stored in tmp folder
    //sending the file to cloudinary but not storing them locally
    res.status(StatusCodes.OK).json({ image: { src: result.secure_url } })
}

module.exports = {
    uploadProductImage
}