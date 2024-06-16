const File = require('../models/File');
const cloudinary = require("cloudinary").v2;

// ------------------------------------------------Server pr Upload krne ke Liye-----------------------------------------------
// 1-> Request Body mai se Data fetch kro
// 2-> Server pr Path define kro
// 3-> File server pr dalo "mv"
// 4-> Response Send krdo

exports.localFileUpload = async(req, res) => {
    try {
        // Fetch File
        const file = req.files.file;
        console.log("FILES->",file);

        // Server Path
        const path = __dirname + '/files/' + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("PATH->",path);
        
        file.mv(path, (err) => {
            console.log(err);
        })

        res.json({
            success: true,
            message: 'File Upload Success'
        })
    } 
    catch (error) {
        console.log(error)
    }
}



// SupportedType === Uploaded Type
function isFileTypeSupported(fileType, supportedTypes){
    return supportedTypes.includes(fileType);
}

// Upload to Cloudinary
async function uploadFileToCloudinary(file, folder, quality){

    const options = {folder};
    console.log("FilePath", file.tempFilePath);

    if(quality){
        options.quality = quality;
    }
    options.resource_type="auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}



//------------------------------------------------ Image Upload->Cloudinary--------------------------------------------------
// 1-> Fetch Data Form request Body
// 2-> Validate -> FileType and Supported File Type same hai ya nahi
// 3-> Agar File Type not supported -> Response False
// 4-> Agar FileType supported hai toh Cloudinary pr Upload krdo
// 5-> Database mai Save krdo
// 6-> Response true send krdo

exports.imageUpload = async(req, res) => {
    try {
        // Fetch Data
        const {name, tags, email} = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile;
        console.log("FILE---->", file);

        // Validate
        const supportedTypes = ["jpg", "jpeg", "png"];
        // Current File Type
        const fileType = file.name.split('.')[1].toLowerCase();

        // File Format not Supported
        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success: false,
                message: "File Format is Not Supported",
            })
        }

        // File format Supported --> Upload to Cloudinary 
        console.log("Uploading To Harendra")
        const response = await uploadFileToCloudinary(file, "Harendra");
        console.log(response)

        // Save in Database
        const fileData = await File.create({
            name,
            tags,
            email,
            image: response.secure_url,
        });

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "Image Uploaded Successfully"
        })



    } 
    catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message : "Error Uploading File-->"+error.message,
        });
    }
}


//--------------------------------------------------- Video Upload -> Cloudinary---------------------------------------------------

exports.videoUpload = async(req, res) => {
    try {
        // data fetch
        const {name, tags, email} = req.body;
        console.log(name, tags, email);

        const file = req.files.videoFile;
        console.log("FILE---->", file);

        // Validation
        const supportedTypes = ["mp4", "mov"];

        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("fileType", fileType)

        // File type not Supported
        if(!isFileTypeSupported(fileType, supportedTypes)){
            res.status(400).json({
                success: "false",
                message: "File type not Supported"
            })
        }


        // File type supported -> Upload to Cloudinary
        const response = await uploadFileToCloudinary(file, "HarendraVideos");
        console.log(response);

        // Save to Db

        const fileData = await File.create({
            name,
            tags,
            email,
            image: response.secure_url,
        });

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "Video Uploaded Successfully"
        })


    } 
    catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: "Something went Wrong"
        })
    }
}

//----------------------------------------------------- Image Reducer->Cloudniary------------------------------------------------

exports.imageReducerUpload = async(req, res) => {
    try {
       const {name, tags, email} = req.body;
       console.log(name, tags, email);
       
       const file = req.files.imageFile;
       console.log(file);

       //Validation
       const supportedTypes = ["jpg", "jpeg", "png"];
       // Current File Type
       const fileType = file.name.split('.')[1].toLowerCase();

       // File Format not Supported
       if(!isFileTypeSupported(fileType, supportedTypes)){
           return res.status(400).json({
               success: false,
               message: "File Format is Not Supported",
           })
       }

       // File format Supported --> Upload to Cloudinary 
       console.log("Uploading To Harendra")
       const response = await uploadFileToCloudinary(file, "Harendra", 10);
       console.log(response)

       // Save in Database
       const fileData = await File.create({
           name,
           tags,
           email,
           image: response.secure_url,
       });

       res.json({
           success: true,
           imageUrl: response.secure_url,
           message: "Image Uploaded Successfully"
       })
       
    } 
    catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: "Something went Wrong"
        })   
    }
}

