import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  host: process.env.DB_HOST || 'db',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'job_board',
});

// Initialize database schema
export const initializeDatabase = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS jobs (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        company VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        location VARCHAR(255) NOT NULL,
        salary_min INTEGER,
        salary_max INTEGER,
        job_type VARCHAR(50) NOT NULL,
        experience_level VARCHAR(50) NOT NULL,
        skills TEXT[] DEFAULT ARRAY[]::text[],
        posted_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        featured BOOLEAN DEFAULT FALSE,
        remote_friendly BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Database schema initialized');
  } catch (error) {
    console.error('Database initialization error:', error);
  }
};

export const seedDatabase = async () => {
  try {
    const count = await pool.query('SELECT COUNT(*) FROM jobs');
    if (count.rows[0].count > 0) {
      console.log('Database already seeded');
      return;
    }

    const jobs = [
      {
        title: 'Senior React Developer',
        company: 'TechCorp',
        description: 'We are looking for an experienced React developer to join our frontend team. You will work on cutting-edge projects.',
        location: 'San Francisco, CA',
        salary_min: 120000,
        salary_max: 160000,
        job_type: 'Full-time',
        experience_level: 'Senior',
        skills: ['React', 'JavaScript', 'TypeScript', 'CSS'],
        featured: true,
        remote_friendly: true,
      },
      {
        title: 'Full Stack Engineer',
        company: 'StartupX',
        description: 'Join our fast-growing startup. We need a full-stack engineer comfortable with Node.js and React.',
        location: 'New York, NY',
        salary_min: 100000,
        salary_max: 130000,
        job_type: 'Full-time',
        experience_level: 'Mid-level',
        skills: ['Node.js', 'React', 'PostgreSQL', 'Docker'],
        featured: false,
        remote_friendly: true,
      },
      {
        title: 'Backend Developer (Python)',
        company: 'DataFlow Inc',
        description: 'Build scalable backend systems. Experience with Python, Django, and databases required.',
        location: 'Remote',
        salary_min: 110000,
        salary_max: 150000,
        job_type: 'Full-time',
        experience_level: 'Mid-level',
        skills: ['Python', 'Django', 'PostgreSQL', 'AWS'],
        featured: true,
        remote_friendly: true,
      },
      {
        title: 'DevOps Engineer',
        company: 'CloudSys',
        description: 'Manage and optimize our cloud infrastructure. Kubernetes, Docker, and CI/CD expertise needed.',
        location: 'Austin, TX',
        salary_min: 130000,
        salary_max: 170000,
        job_type: 'Full-time',
        experience_level: 'Senior',
        skills: ['Kubernetes', 'Docker', 'AWS', 'Terraform'],
        featured: false,
        remote_friendly: false,
      },
      {
        title: 'Frontend Designer',
        company: 'DesignStudio',
        description: 'Create beautiful, responsive UIs. Strong CSS and design system knowledge required.',
        location: 'Los Angeles, CA',
        salary_min: 90000,
        salary_max: 120000,
        job_type: 'Full-time',
        experience_level: 'Mid-level',
        skills: ['React', 'CSS', 'Figma', 'TypeScript'],
        featured: false,
        remote_friendly: true,
      },
      {
        title: 'Junior Web Developer',
        company: 'WebWorks',
        description: 'Entry-level position. We will mentor you in modern web development practices.',
        location: 'Chicago, IL',
        salary_min: 60000,
        salary_max: 80000,
        job_type: 'Full-time',
        experience_level: 'Junior',
        skills: ['JavaScript', 'HTML', 'CSS', 'React basics'],
        featured: false,
        remote_friendly: true,
      },
    ];

    for (const job of jobs) {
      await pool.query(
        `INSERT INTO jobs (title, company, description, location, salary_min, salary_max, job_type, experience_level, skills, featured, remote_friendly)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
        [
          job.title,
          job.company,
          job.description,
          job.location,
          job.salary_min,
          job.salary_max,
          job.job_type,
          job.experience_level,
          job.skills,
          job.featured,
          job.remote_friendly,
        ]
      );
    }
    console.log('✅ Database seeded with sample jobs');
  } catch (error) {
    console.error('Seeding error:', error);
  }
};

export default pool;