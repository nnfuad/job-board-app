import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  host: process.env.DB_HOST || 'db',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'job_board',
});

// Initialize database connection with retry logic
const initializeConnection = async (maxRetries = 10, retryDelay = 2000) => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await pool.query('SELECT NOW()');
      console.log('✅ Database connection successful');
      return true;
    } catch (error) {
      console.log(`⏳ Database connection attempt ${attempt}/${maxRetries}. Retrying in ${retryDelay / 1000}s...`);
      if (attempt === maxRetries) {
        console.error('❌ Failed to connect to database after retries');
        throw error;
      }
      await new Promise((resolve) => setTimeout(resolve, retryDelay));
    }
  }
};

// Initialize database schema
export const initializeDatabase = async () => {
  try {
    // Ensure connection is established
    await initializeConnection();

    // Create jobs table if it doesn't exist
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
    console.log('✅ Database schema initialized successfully');

    // Check if table already has data
    const result = await pool.query('SELECT COUNT(*) FROM jobs');
    const count = parseInt(result.rows[0].count, 10);

    if (count === 0) {
      console.log('📊 Database is empty. Starting data seeding...');
      await seedDatabase();
    } else {
      console.log(`📊 Database already contains ${count} jobs. Skipping seed.`);
    }
  } catch (error) {
    console.error('❌ Database initialization error:', error.message);
    process.exit(1);
  }
};

export const seedDatabase = async () => {
  try {
    const jobs = [
      {
        title: 'Senior React Developer',
        company: 'TechCorp',
        description: 'We are looking for an experienced React developer to join our frontend team. You will work on cutting-edge projects with modern technologies.',
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
        description: 'Join our fast-growing startup. We need a full-stack engineer comfortable with Node.js and React. You will own features end-to-end.',
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
        description: 'Build scalable backend systems using Python. Experience with Django, microservices, and databases required for this role.',
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
        description: 'Manage and optimize our cloud infrastructure. Kubernetes, Docker, and CI/CD expertise needed to maintain our production systems.',
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
        description: 'Create beautiful, responsive UIs with attention to detail. Strong CSS and design system knowledge required for this position.',
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
        description: 'Entry-level position. We will mentor you in modern web development practices and help you grow your skills.',
        location: 'Chicago, IL',
        salary_min: 60000,
        salary_max: 80000,
        job_type: 'Full-time',
        experience_level: 'Junior',
        skills: ['JavaScript', 'HTML', 'CSS', 'React basics'],
        featured: false,
        remote_friendly: true,
      },
      {
        title: 'Machine Learning Engineer',
        company: 'AI Solutions',
        description: 'Develop ML models for production. Experience with TensorFlow, PyTorch, and model deployment required.',
        location: 'Boston, MA',
        salary_min: 140000,
        salary_max: 180000,
        job_type: 'Full-time',
        experience_level: 'Senior',
        skills: ['Python', 'TensorFlow', 'PyTorch', 'AWS'],
        featured: true,
        remote_friendly: true,
      },
      {
        title: 'Data Engineer',
        company: 'DataViz Co',
        description: 'Build data pipelines and ETL systems. Strong SQL and data warehousing knowledge needed.',
        location: 'Seattle, WA',
        salary_min: 110000,
        salary_max: 145000,
        job_type: 'Full-time',
        experience_level: 'Mid-level',
        skills: ['SQL', 'Python', 'Spark', 'PostgreSQL'],
        featured: false,
        remote_friendly: true,
      },
      {
        title: 'Mobile App Developer',
        company: 'MobileWorks',
        description: 'Develop iOS and Android apps using React Native. Experience with mobile UI/UX patterns required.',
        location: 'Denver, CO',
        salary_min: 95000,
        salary_max: 125000,
        job_type: 'Full-time',
        experience_level: 'Mid-level',
        skills: ['React Native', 'JavaScript', 'iOS', 'Android'],
        featured: false,
        remote_friendly: true,
      },
      {
        title: 'QA Engineer',
        company: 'TestPro',
        description: 'Ensure product quality through automated and manual testing. Experience with Selenium and testing frameworks required.',
        location: 'Portland, OR',
        salary_min: 70000,
        salary_max: 100000,
        job_type: 'Full-time',
        experience_level: 'Junior',
        skills: ['Selenium', 'JavaScript', 'Testing', 'Python'],
        featured: false,
        remote_friendly: false,
      },
      {
        title: 'Senior Backend Engineer',
        company: 'FinTech Innovations',
        description: 'Lead backend architecture for financial systems. Experience with high-performance systems and microservices required.',
        location: 'New York, NY',
        salary_min: 150000,
        salary_max: 200000,
        job_type: 'Full-time',
        experience_level: 'Senior',
        skills: ['Go', 'Java', 'PostgreSQL', 'Kubernetes'],
        featured: true,
        remote_friendly: false,
      },
      {
        title: 'Cloud Architect',
        company: 'CloudScale',
        description: 'Design and implement cloud solutions for enterprise clients. AWS/Azure certification preferred.',
        location: 'Remote',
        salary_min: 160000,
        salary_max: 210000,
        job_type: 'Full-time',
        experience_level: 'Senior',
        skills: ['AWS', 'Azure', 'Terraform', 'Kubernetes'],
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
    console.log(`✅ Database seeded with ${jobs.length} sample jobs`);
  } catch (error) {
    console.error('❌ Seeding error:', error.message);
  }
};

export default pool;
