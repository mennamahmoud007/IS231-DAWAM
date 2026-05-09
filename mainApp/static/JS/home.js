
// Home page
async function loadFeaturedJobs() {
    try {
        const response = await fetch('/api/jobs/');
        const jobs = await response.json();

        const grid = document.getElementById('home-jobs-grid');
        const featured = jobs.slice(0, 6);

        if (featured.length === 0) {
            grid.innerHTML = '<p>No jobs available right now.</p>';
            return;
        }

        grid.innerHTML = featured.map(job =>
            ` <div class="job-card">
                <h3>${job.title}</h3>
                <p class="meta">${job.company} · ${job.location}</p>
                <span class="job-tag">${job.schedule}</span>
                <span class="job-tag">${job.location}</span>
                <a href="/login/">Apply Now</a>
            </div> `).join('');

    } catch (error) {
        console.error('Failed to load jobs:', error);
    }
}
document.addEventListener('DOMContentLoaded', loadFeaturedJobs);
 
// Smooth scroll for "Learn More" button
document.querySelector('a[href="#features"]').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
  });