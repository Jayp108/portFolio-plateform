import About from '../models/About.js';
import cloudinary from '../config/cloudinary.js';
import { Readable } from 'stream';

export const getAbout = async (req, res) => {
  try {
    const about = await About.findOne();

    if (!about) {
      return res.status(404).json({
        success: false,
        message: 'About information not found',
      });
    }

    res.status(200).json({
      success: true,
      data: { about },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createOrUpdateAbout = async (req, res) => {
  try {
    const { name, role, bio, skills, resumeLink, email, phone, location, linkedin, github } = req.body;

    let about = await About.findOne();

    if (about) {
      about.name = name || about.name;
      about.role = role || about.role;
      about.bio = bio || about.bio;
      about.skills = skills || about.skills;
      about.resumeLink = resumeLink !== undefined ? resumeLink : about.resumeLink;
      about.email = email || about.email;
      about.phone = phone || about.phone;
      about.location = location || about.location;
      about.linkedin = linkedin || about.linkedin;
      about.github = github || about.github;

      await about.save();

      res.status(200).json({
        success: true,
        message: 'About information updated successfully',
        data: { about },
      });
    } else {
      about = await About.create({
        name,
        role,
        bio,
        skills,
        resumeLink,
        email,
        phone,
        location,
        linkedin,
        github,
      });

      res.status(201).json({
        success: true,
        message: 'About information created successfully',
        data: { about },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const addSkill = async (req, res) => {
  try {
    const { skill } = req.body;

    if (!skill || !skill.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a skill',
      });
    }

    let about = await About.findOne();

    if (!about) {
      about = await About.create({ skills: [skill.trim()] });
    } else {
      if (about.skills.includes(skill.trim())) {
        return res.status(400).json({
          success: false,
          message: 'Skill already exists',
        });
      }
      about.skills.push(skill.trim());
      await about.save();
    }

    res.status(200).json({
      success: true,
      message: 'Skill added successfully',
      data: { about },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteSkill = async (req, res) => {
  try {
    const { skill } = req.body;

    if (!skill) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a skill to delete',
      });
    }

    const about = await About.findOne();

    if (!about) {
      return res.status(404).json({
        success: false,
        message: 'About information not found',
      });
    }

    about.skills = about.skills.filter(s => s !== skill);
    await about.save();

    res.status(200).json({
      success: true,
      message: 'Skill deleted successfully',
      data: { about },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==================== CLOUDINARY RESUME UPLOAD ====================
export const uploadResume = async (req, res) => {
  try {
    // Check if file exists
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a resume file',
      });
    }

    // Get existing about document
    let about = await About.findOne();

    // If resume already exists, delete old one from Cloudinary
    if (about && about.resumePublicId) {
      try {
        await cloudinary.uploader.destroy(about.resumePublicId, {
          resource_type: 'raw'
        });
        console.log('Old resume deleted from Cloudinary');
      } catch (deleteError) {
        console.error('Error deleting old resume:', deleteError);
        // Continue with upload even if delete fails
      }
    }

    // Upload new resume to Cloudinary
    const uploadPromise = new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'portfolio/resumes',
          resource_type: 'raw',
          public_id: `resume_${Date.now()}`,
          format: 'pdf',
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      // Create readable stream from buffer and pipe to Cloudinary
      const bufferStream = Readable.from(req.file.buffer);
      bufferStream.pipe(uploadStream);
    });

    const uploadResult = await uploadPromise;

    // Update or create about document
    if (about) {
      about.resumeLink = uploadResult.secure_url;
      about.resumeFileName = req.file.originalname;
      about.resumePublicId = uploadResult.public_id;
      await about.save();
    } else {
      about = await About.create({
        resumeLink: uploadResult.secure_url,
        resumeFileName: req.file.originalname,
        resumePublicId: uploadResult.public_id,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Resume uploaded successfully',
      data: {
        resumeLink: uploadResult.secure_url,
        resumeFileName: req.file.originalname,
      },
    });
  } catch (error) {
    console.error('Resume upload error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to upload resume',
    });
  }
};

// ==================== GET RESUME INFO ====================
export const getResume = async (req, res) => {
  try {
    const about = await About.findOne();

    if (!about || !about.resumeLink) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found',
      });
    }

    res.status(200).json({
      success: true,
      data: {
        resumeLink: about.resumeLink,
        resumeFileName: about.resumeFileName || 'resume.pdf',
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==================== DOWNLOAD RESUME ====================
export const downloadResume = async (req, res) => {
  try {
    const about = await About.findOne();

    if (!about || !about.resumeLink) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found',
      });
    }

    // Redirect to Cloudinary secure_url for download
    // This is the simplest and most reliable method
    res.redirect(about.resumeLink);
  } catch (error) {
    console.error('Resume download error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to download resume',
    });
  }
};
