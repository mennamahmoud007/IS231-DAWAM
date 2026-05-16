const isGuest = window.location.href.includes("guestBrowse");
const jobListTag = document.querySelector('.job-list');

let allJobs = []
async function loadAndDisplayjobs(){
    try{
    const response = await fetch('/api/jobs/')
    if(!response.ok){
        throw new Error('Server error: ' +  response.status)
    }
    allJobs  = await response.json()
    displayJobs(allJobs)
    }
    
    catch(error){
        console.error('Failed to load jobs:', error);
        jobListTag.innerHTML = '<p>Failed to load jobs. Please try again.</p>';
    }
}

loadAndDisplayjobs()

function displayJobs(jobsToRender) {
    if (jobsToRender.length === 0) {
    jobListTag.innerHTML = `<p class="no-results">No jobs matching`;
    return;
}
    let html = "";
    jobsToRender.forEach(job => {
        html += `
        <li>
            <article>
                <h3>${job.title}</h3>
                <p class="card-company">${job.company}</p>
                <div class="card-tags">
                    <span class="card-tag">${job.location}</span>
                    <span class="card-tag">${job.schedule}</span>
                    <span class="card-tag">${job.experience}</span>
                </div>
                <div class="card-salary">$${job.salary} / month</div>
                <div class="card-footer-row">
                    <span class="${job.status === 'Open' ? 'status-open' : 'status-closed'}">${job.status}</span>
                    <a href="${isGuest ? 'login.html' : '/job-details/' + job.id + '/'}">View details →</a>
                </div>
            </article>
        </li>`;
    });
    jobListTag.innerHTML = html;
}
 


/*______________________________________________________________________ */
// WHEN any checkbox changes, run this function
function filterjobs(){
    //Get the values of all checked boxes
        const scheduleValues = Array.from(
        document.querySelectorAll(`input[name="schedule"]:checked`))
        .map(cb => cb.value);
        const locationValues = Array.from(
        document.querySelectorAll(`input[name="location"]:checked`))
        .map(cb => cb.value);
        const experienceValues = Array.from(
        document.querySelectorAll(`input[name="experience"]:checked`))
        .map(cb => cb.value);
        const searchvalue = document.querySelector('#job-search').value.toLowerCase();  
        //filter each job based on all filters
        const filteredjobs = allJobs.filter(function(job){
            if(scheduleValues.length > 0 && !scheduleValues.includes(job.schedule))
                return false;
            if(locationValues.length > 0 && !locationValues.includes(job.location))
                return false;
            if(experienceValues.length > 0 && !experienceValues.includes(job.experience))
                return false;
            if(searchvalue && !job.title.toLowerCase().includes(searchvalue))
                return false;
            return true;
    });
    displayJobs(filteredjobs); //only shows the matching cards
}
//Adds the filterjobs function to each checkbox, once the box is changed the function works
document.querySelectorAll('input[name="schedule"]').forEach(function(checkbox) {
    checkbox.addEventListener("change", filterjobs);
});
document.querySelectorAll('input[name="location"]').forEach(function(checkbox) {
    checkbox.addEventListener("change", filterjobs);
});
document.querySelectorAll('input[name="experience"]').forEach(function(checkbox) {
    checkbox.addEventListener("change", filterjobs);
});
document.querySelector('.search-bar').addEventListener("submit", function(e){
    e.preventDefault();
    filterjobs();
});
