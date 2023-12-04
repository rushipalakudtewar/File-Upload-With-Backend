const File = require('../models/File')
const cloudinary = require('cloudinary').v2;
exports.localFileUpload = async(req,res)=>{
    try
    {
        const file = req.files.file;
        console.log('file is ',file);
        const path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`
        console.log('Path is ',path);
        //file is moved to path move(mv)
        file.mv(path,(err)=>{
            console.log(err);
        })
        res.json({
            message:"Local File Uploaded Successfully"
        })
    }
    catch(err)
    {
        console.log(err);
    }
}


function isFileTypeSupported(supportedTypes,fileType)
{
    return supportedTypes.includes(fileType)
}

async function uploadFileToCloudinary(file,folder,quality)
{
    const options = {folder};
    console.log(options);
    console.log("temp file path",file.tempFilePath);
    if(quality)
    {
        options.quality=quality;
    }
    options.resource_type="auto";
 
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.imageUpload = async(req,res) =>{
    try
    {
    const {name,tags,email}= req.body;
  
    const file = req.files.imageFile;
  
    const supportedTypes = ['jpeg','jpg','png'];
    const fileType = file.name.split('.')[1].toLowerCase()
    if(!isFileTypeSupported(supportedTypes,fileType))
    {
        return res.status(400).json({
            success:false,
            message:"File format not supported"
        })
    }
    const response = await uploadFileToCloudinary(file,'Codehelp')
  

    const fileData = await File.create({
        name,
        tags,
        email,
        imageUrl:response.secure_url
    })
    res.json({
        success:true,
        imageUrl:response.secure_url,
        message:"File uploaded successfully"
    })

    }
    catch(err)
    {
        return res.status(400).json({
            success:false,
            message:"Failed to image upload"
        })
    }
}

exports.videoUpload = async(req,res) =>{
    try{

    const {name, tags, email} = req.body;
    console.log(name, tags, email);

    const file = req.files.videoFile;
    console.log(file);

    const supportedTypes = ['mp4','mov']
    const fileType = file.name.split('.')[1].toLowerCase();

    if(!isFileTypeSupported(supportedTypes,fileType))
    {
        return res.status(400).json({
            success:false,
            message:"File format not supported"
        })
    }

    const response = await uploadFileToCloudinary(file,'Codehelp')
    console.log(response);
    const fileData = await File.create({
        name,
        tags,
        email,
        imageUrl:response.secure_url
    })

    res.json({
        success:true,
        imageurl:response.secure_url,
        message:'Video uploaded successfully'
    })

    }
    catch(err)
    {
        res.status(400).json({
            success:false,
            message:"Failed to upload video"
        })
    }
}



exports.imageSizeReducer = async(req,res) =>{
    try
    {
    const {name,tags,email}= req.body;
    console.log(name, tags, email);
    const file = req.files.imageFile;
    console.log(file);
    const supportedTypes = ['jpeg','jpg','png'];
    const fileType = file.name.split('.')[1].toLowerCase()
    if(!isFileTypeSupported(supportedTypes,fileType))
    {
        return res.status(400).json({
            success:false,
            message:"File format not supported"
        })
    }


    const response = await uploadFileToCloudinary(file,'Codehelp',90)
    console.log(response);

    const fileData = await File.create({
        name,
        tags,
        email,
        imageUrl:response.secure_url
    })
    res.json({
        success:true,
        imageUrl:response.secure_url,
        message:"Image size reduced and saved successfully"
    })

    }
    catch(err)
    {
        return res.status(400).json({
            success:false,
            message:"Failed to image upload"
        })
    }
}
