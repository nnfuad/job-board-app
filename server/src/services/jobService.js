import pool from '../models/Job.js';

export class JobService {
  /**
   * Fetch jobs with advanced filtering, sorting, and pagination
   * This is the core business logic
   */
  async getJobs(filters = {}) {
    const {
      page = 1,
      limit = 10,
      search = '',
      jobType,
      experienceLevel,
      minSalary,
      maxSalary,
      remoteFriendly,
      skills,
      sortBy = 'posted_date',
      sortOrder = 'DESC',
      featured,
    } = filters;

    try {
      // Build WHERE clause dynamically
      const conditions = [];
      const params = [];
      let paramIndex = 1;

      // Search in title, company, and description
      if (search) {
        conditions.push(
          `(LOWER(title) ILIKE $${paramIndex} OR LOWER(company) ILIKE $${paramIndex} OR LOWER(description) ILIKE $${paramIndex})`
        );
        params.push(`%${search.toLowerCase()}%`);
        paramIndex++;
      }

      // Filter by job type
      if (jobType) {
        conditions.push(`job_type = $${paramIndex}`);
        params.push(jobType);
        paramIndex++;
      }

      // Filter by experience level
      if (experienceLevel) {
        conditions.push(`experience_level = $${paramIndex}`);
        params.push(experienceLevel);
        paramIndex++;
      }

      // Filter by salary range
      if (minSalary) {
        conditions.push(`salary_max >= $${paramIndex}`);
        params.push(minSalary);
        paramIndex++;
      }

      if (maxSalary) {
        conditions.push(`salary_min <= $${paramIndex}`);
        params.push(maxSalary);
        paramIndex++;
      }

      // Filter by remote friendly
      if (remoteFriendly === 'true') {
        conditions.push('remote_friendly = true');
      }

      // Filter by featured
      if (featured === 'true') {
        conditions.push('featured = true');
      }

      // Filter by skills (array contains)
      if (skills && Array.isArray(skills) && skills.length > 0) {
        const skillConditions = skills
          .map((skill, idx) => `$${paramIndex + idx} = ANY(skills)`)
          .join(' OR ');
        conditions.push(`(${skillConditions})`);
        skills.forEach((skill) => {
          params.push(skill);
          paramIndex++;
        });
      }

      const whereClause =
        conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

      // Validate sort column to prevent SQL injection
      const validSortColumns = [
        'posted_date',
        'salary_max',
        'salary_min',
        'title',
        'created_at',
      ];
      const safeSortBy = validSortColumns.includes(sortBy) ? sortBy : 'posted_date';
      const safeSortOrder = ['ASC', 'DESC'].includes(sortOrder.toUpperCase())
        ? sortOrder.toUpperCase()
        : 'DESC';

      // Count total records
      const countQuery = `SELECT COUNT(*) as total FROM jobs ${whereClause}`;
      const countResult = await pool.query(countQuery, params);
      const total = parseInt(countResult.rows[0].total, 10);

      // Calculate pagination
      const pageNum = Math.max(1, parseInt(page, 10));
      const limitNum = Math.max(1, Math.min(100, parseInt(limit, 10)));
      const offset = (pageNum - 1) * limitNum;

      // Fetch paginated results
      const query = `
        SELECT * FROM jobs 
        ${whereClause}
        ORDER BY ${safeSortBy} ${safeSortOrder}
        LIMIT $${paramIndex + 1} OFFSET $${paramIndex + 2}
      `;

      params.push(limitNum, offset);
      const result = await pool.query(query, params);

      return {
        data: result.rows,
        pagination: {
          total,
          page: pageNum,
          limit: limitNum,
          totalPages: Math.ceil(total / limitNum),
        },
      };
    } catch (error) {
      throw new Error(`Database query error: ${error.message}`);
    }
  }

  /**
   * Get a single job by ID
   */
  async getJobById(id) {
    try {
      const result = await pool.query('SELECT * FROM jobs WHERE id = $1', [id]);
      if (result.rows.length === 0) {
        throw new Error('Job not found');
      }
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error fetching job: ${error.message}`);
    }
  }

  /**
   * Get unique values for filter options
   */
  async getFilterOptions() {
    try {
      const jobTypes = await pool.query(
        'SELECT DISTINCT job_type FROM jobs ORDER BY job_type'
      );
      const experienceLevels = await pool.query(
        'SELECT DISTINCT experience_level FROM jobs ORDER BY experience_level'
      );
      const allSkills = await pool.query(
        "SELECT DISTINCT UNNEST(skills) as skill FROM jobs ORDER BY skill"
      );

      return {
        jobTypes: jobTypes.rows.map((r) => r.job_type),
        experienceLevels: experienceLevels.rows.map((r) => r.experience_level),
        skills: allSkills.rows.map((r) => r.skill),
      };
    } catch (error) {
      throw new Error(`Error fetching filter options: ${error.message}`);
    }
  }
}

export default new JobService();