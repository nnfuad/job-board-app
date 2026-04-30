import express from 'express';
import JobController from '../controllers/jobController.js';

const router = express.Router();

/**
 * GET /api/v1/jobs
 * Fetch jobs with filtering, sorting, and pagination
 */
router.get('/jobs', JobController.getJobs.bind(JobController));

/**
 * GET /api/v1/jobs/filters/options
 * Get available filter options
 */
router.get('/jobs/filters/options', JobController.getFilterOptions.bind(JobController));

/**
 * GET /api/v1/jobs/:id
 * Fetch a single job by ID
 */
router.get('/jobs/:id', JobController.getJobById.bind(JobController));

export default router;