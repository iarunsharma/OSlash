const urlModel = require("../models/urlModel");
const validUrl = require("valid-url");
const shortid = require("shortid");
const validator = require("../middlewares/validator");
const userModel = require("../models/userModel");

//======================== Create Short link for URL ==================================================================//

const shortcut = async function (req, res) {
  try {
    let requestBody = req.body;

    if (!validator.isvalidRequestBody(requestBody)) {
      return res
        .status(400)
        .send({ status: false, message: "provide some data to proceed" });
    }

    const { url, description, tags } = requestBody;

    if (!validator.isvalid(url)) {
      return res
        .status(400)
        .send({ status: false, message: "please provide url" });
    }

    if (!validator.isValidURL(url)) {
      return res
        .status(400)
        .send({ status: false, message: "please provide valid url" });
    }

    if (!validator.isvalid(description)) {
      return res
        .status(400)
        .send({ status: false, message: "please provide description" });
    }

    if (!validator.isvalid(tags)) {
      return res
        .status(400)
        .send({ status: false, message: "please provide tags" });
    }

    if (validUrl.isUri(url)) {
      const shorturl = shortid.generate().toLowerCase();

      const data = { url, description, tags, shorturl };
      let saveData = await urlModel.create(data);
      return res.status(201).send({ status: true, data: saveData });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
};

//======================== Fetch url & Redirect =================================================================================//

const geturl = async function(req,res){
  try{
    let paramsUrl = req.params.urlCode
    if(!validator.isvalid(paramsUrl)){
     return res.status(400).send({status:false,msg:"Enter appropriate urlcode"})
    }
      const url = await urlModel.findOne({paramsUrl:paramsUrl})

      if(!url){
        return res.status(400).send({status:false,msg:"No url found"})
      }
      else{
        return res.status(302).redirect(url.url)
      }
  }catch (error) {
    console.log(error);
    res.status(500).send({ status: false, error: error.message });
  }
}

//======================== Get list of shrt urls  =================================================================================//

const getUrlList = async function(req,res){
  try{
    let urlList = await urlModel.find()
    if(!urlList){
      return res.status(400).send("no such url found")
    }
    return res.status(200).send({status:true, message : "URL's LIST" , data:urlList })
  }catch (error) {
    console.log(error);
    res.status(500).send({ status: false, error: error.message });
  }
}

//----------------------------------------------------------------------------------------------------------------------//

const filterurl = async function(req,res){
  try{
    let filterObject = {isDeleted:false}

    if(validator.isvalid(shorturl)){
      filterObject.shorturl.sort(1) = req.query.shorturl
    }

    if(validator.isvalid(description)){
      filterObject.description.sort(1) = req.query.description
    }
    if(validator.isvalid(createdAt)){
      filterObject.createdAt.sort(1) = req.query.createdAt
    }

    let search = await urlModel.find(filterObject)
    return res.status(200).send({status: flase , message:"url list" , data:search})

  }catch(error) {
        console.log(error);
        res.status(500).send({ status: false, error: error.message });
      }
}



//======================== Delete short url =================================================================================//

const deleteShortcut = async function (req, res) {
  try {
    let urlId = req.params.urlId;
    let checkid = validator.isValidObjectId(urlId);
    if (!checkid) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide a valid urlId " });
    }
    let checkUrl = await urlModel.findOne({ _id: urlId });
    if (!checkUrl) {
      return res
        .status(404)
        .send({ status: false, message: "url not found or already deleted" });
    }
    let updateUrl = await urlModel.findOneAndUpdate(
      { _id: urlId },
      { $set: { isDeleted: true, deletedAt: new Date() } },
      { new: true }
    );
    res.status(200).send({
      status: true,
      message: "sucessfully deleted",
      data: updateUrl,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: false, error: error.message });
  }
};

//---------------------------------------------------------------------------------------------------------------//

module.exports = { shortcut,geturl ,getUrlList,filterurl, deleteShortcut };
