import mongoose from 'mongoose';

const aboutSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      trim: true,
    },
    bio: {
      type: String,
    },
    skills: {
      type: [String],
      default: [],
    },
    resumeLink: {
      type: String,
      trim: true,
    },
    resumeFileName: {
      type: String,
      trim: true,
    },
    resumePublicId: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    linkedin: {
      type: String,
      trim: true,
    },
    github: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const About = mongoose.model('About', aboutSchema);

export default About;
