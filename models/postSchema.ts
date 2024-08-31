import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";

// Initialize the AutoIncrement plugin
const likesSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
});

const commentSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    comment: {
        type: String,
        required: true,
    },
});

//@ts-expect-error too lazy to fix this ts error	
const AutoIncrement = mongooseSequence(mongoose);

const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    post_number: {
        type: Number,
        unique: true,
    }, // This will be auto-incremented
    image: {
        type: String,
        required: true,
    },
    caption: {
        type: String,
        required: true,
    },
    likes: {
        type: [likesSchema],
        default: [],
    },
    comments: {
        type: [commentSchema],
        default: [],
    },
});


// Check if the model already exists to avoid re-defining it
if (!mongoose.models.Posts) {
    // Apply the AutoIncrement plugin to the postSchema only if not applied before
    //@ts-expect-error too lazy to fix this ts error
    postSchema.plugin(AutoIncrement, { inc_field: "post_number" });
}

// Create or use the existing model
const Posts = mongoose.models.Posts || mongoose.model("Posts", postSchema);
export default Posts;
