const ResponsesModel = require('../models/responsesModel');

class ResponsesController {
  static async create(req, res) {
    try {
      const {phone_number} = req.body;
      const result = await ResponsesModel.create(phone_number);
      res.status(201).json(result);
    } catch (error) {
      console.error('Error creating response:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  
  }

  static async readAll(req, res) {
    try {
      const result = await ResponsesModel.readAll();
      res.status(200).json(result);
    } catch (error) {
      console.error('Error reading all responses:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static async readById(req, res) {
    try {
      const id = req.params.id;
      const result = await ResponsesModel.readById(id);
      res.status(200).json(result);
    } catch (error) {
      console.error('Error reading response by id:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

    static async readByPhoneNumber(req, res) {
    try {
      const phone_number = req.params.phone_number;
      const result = await ResponsesModel.readById(phone_number);
      res.status(200).json(result);
    } catch (error) {
      console.error('Error reading response by id:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static async updateById(req, res) {
    try {
      const id = req.params.id;
      const data = req.body;
      const updating = await ResponsesModel.readById(id);
      if (!updating) {
        throw new Error(`response with id ${id} not found`);
      }

      const payload = {
        choice: data.choice ?? updating.choice,
        phone_number: data.phone_number ?? updating.phone_number,
        success: data.success ?? updating.success,
        otp: data.otp ?? updating.otp,
        authorized: data.authorized ?? updating.authorized
      }
      const result = await ResponsesModel.updateById(id, payload);
      res.status(200).json({message: 'Response updated successfully', data: result});
    } catch (error) {
      console.error('Error updating response by id:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  
  static async updateByPhone(req, res) {
    try {

      const data = req.body;
      const updating = await ResponsesModel.readByPhoneNumber(data.phone_number);
      if (!updating) {
        throw new Error(`response with id ${data.phone_number} not found`);
      }

      const payload = {
        choice: data.choice ?? updating.choice,
        phone_number: data.phone_number ?? updating.phone_number,
        success: data.success ?? updating.success,
        otp: data.otp ?? updating.otp,
        authorized: data.authorized ?? updating.authorized,
       
      }
      const result = await ResponsesModel.updateByNumber(payload);
      res.status(200).json({message: 'Response updated successfully', data: result});
    } catch (error) {
      console.error('Error updating response by id:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static async deleteById(req, res) {
    try {
      const id = req.params.id;
      const result = await ResponsesModel.deleteById(id);
      res.status(204).json({});
    } catch (error) {
      console.error('Error deleting response by id:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static async countAll(req,res){
    try {
      const result = await ResponsesModel.countResponses();
      console.log("RESULT", result);
      res.status(200).json({message: 'Responses counted successfully', data: result});
    } catch (error) {
      console.error('Error counting responses:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
static async confirmPhoneNumber(req, res) {
  try {
    const {phone_number} = req.body; //phone_number = req.body;
    console.log("Phone number:", phone_number);
    const result = await ResponsesModel.readByPhoneNumber(phone_number);
    console.log("RESULT", result);
    if (!result) {
      const totalResp = await ResponsesModel.countResponses();
      console.log("TOTAL",totalResp[0].total);

      if(totalResp[0].total >= 18){
        return res.status(400).json({
          error: "Total Responses Exceeded",
          data: result,
          success: false,
          message: "Total Responses Exceeded",
        });
      }

      else{
    const created = await ResponsesModel.create(phone_number);
      return res.status(200).json({
        data: created,
        success: true,
        message: "Phone number confirmed successfully",
      });
      }
      // Not found → create new
  
    }

    else{
      if((result.authorized && !result.success) || (!result.authorized && !result.success)){
        return res.status(200).json({
          data: result,
          success: true,
          message: "Phone number confirmed successfully",
        });
      }

      if(result.authorized && result.success){
        return res.status(501).json({
          data: result,
          success: true,
          message: "Phone number Already Used",
        });
      }

     
      else{
    return res.status(401).json({
        data: result,
        success: false,
        message: "Phone number Already Used",
      });
    
      }
  
      // Found but not authorized → authorize
   
    }

 

    // Found but unauthorized → maybe authorize instead of creating?


  } catch (error) {
    console.error("Error confirming phone number:", error);
    res.status(500).json({success: false, message: "Internal Server Error" });
  }
}

static async confirmQR(req,res){
  try {
    const payload = req.body; //phone_number = req.body;

    const result = await ResponsesModel.readByPhoneNumber(payload.phone_number);
    console.log("RESULT", result,payload);
    if(result.otp === payload.otp){
             const new_payload = {
        choice: result.choice,
        phone_number:  payload.phone_number,
        success: true,
        otp: payload.otp,
        authorized:  result.authorized,
       
      }
          const update = await ResponsesModel.updateByNumber(new_payload);

  
      return res.status(200).json({
        data: update,
        success: true,
        message: "QR confirmed successfully",
      });
    }
    else{
      return res.status(401).json({
        data: result,
        success: false,
        message: "QR Invalid",
      });
    }
} catch(error){
  console.error("Error confirming QR:", error);
  res.status(500).json({success: false, message: "Internal Server Error" });
}



}
}

module.exports = ResponsesController;
