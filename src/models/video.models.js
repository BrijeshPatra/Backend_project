import mongoose , {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema=new Schema(
    {
      videoFile: {
        type: String,
        required: true
      },
      thumbnail: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      duration: {
        type: Number,
        required: true
      },
      views: {
        type: Number,
        default: 0
      },
      isPublished: {
        type: Boolean,
        default: true
      },
      owner:{
        type: Schema.Types.ObjectId,
        ref: "User"
      }

    }
)
//this helps you to write query based on aggregate pipeline
videoSchema.plugin(mongooseAggregatePaginate)

//exporting so other files can access it
export const Video=mongoose.model("Video",videoSchema)
