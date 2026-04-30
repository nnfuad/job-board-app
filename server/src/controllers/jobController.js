import JobService from '../services/jobService.js';

export class JobController {
  async getJobs(req, res, next) {
    try {
      const {
        page,
        limit,
        search,
        jobType,
        experienceLevel,
        minSalary,
        maxSalary,
        remoteFriendly,
        skills,
        sortBy,
        sortOrder,
        featured,
      } = req.query;

      // Parse skills array if provided
      let parsedSkills = skills;
      if (typeof skills === 'string') {
        parsedSkills = skills.split(',').filter((s) => s.trim());
      } else if (Array.isArray(skills)) {
        parsedSkills = skills;
      }

      const filters = {
        page,
        limit,
        search,
        jobType,
        experienceLevel,
        minSalary,
        maxSalary,
        remoteFriendly,
        skills: parsedSkills,
        sortBy,
        sortOrder,
        featured,
      };

      const result = await JobService.getJobs(filters);

      res.json({
        success: true,
        ...result,
      });
    } catch (error) {
      next(error);
    }
  }

  async getJobById(req, res, next) {
    try {
      const { id } = req.params;
      const job = await JobService.getJobById(id);

      res.json({
        success: true,
        data: job,
      });
    } catch (error) {
      next(error);
    }
  }

  async getFilterOptions(req, res, next) {
    try {
      const options = await JobService.getFilterOptions();
      res.json({
        success: true,
        data: options,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new JobController();