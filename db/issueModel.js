const mongoose=require('mongoose');

const IssueSchema = new mongoose.Schema({

    brandName:{ 
         type: String, 
        required: true
          },

    productGroup: {
        type: String,
       required:true
      },

      modelNumber: {
        type: Number,
        required: true
      },
      caseId:{
        type: Number,
        required: true
      },
      issue:{
        type: String,
        required: true
      }
});

module.exports = mongoose.model.Issues || mongoose.model("Issues", IssueSchema);