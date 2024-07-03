import mongoose from "mongoose";

const UrlSchema = new mongoose.Schema(
  {
    nameUrl: {
      type: String,
      required: true,
    },
    originalUrl: {
      type: String,
      required: true,
    },
    shortUrl: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    clicks: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

UrlSchema.pre("save", function (next) {
  if (!this.nameUrl) {
    this.nameUrl = this.originalUrl;
  }
  next();
});

export const Url = mongoose.model("Url", UrlSchema);
