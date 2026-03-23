// Wait for the entire HTML to be parsed before running JS
document.addEventListener('DOMContentLoaded', () => {
  // Sample job data
  const jobsData = [
    { id: 1, title: "Frontend Developer", company: "TechCorp", location: "San Francisco, CA (Remote)", type: "Remote", salary: "$90k - $120k", description: "Build responsive interfaces with React, Tailwind. Join a creative team.", icon: "💻" },
    { id: 2, title: "UX Designer", company: "Designify", location: "New York, NY", type: "Full-time", salary: "$85k - $105k", description: "Create user-centered designs, prototypes, and collaborate with product.", icon: "🎨" },
    { id: 3, title: "Backend Engineer (Node.js)", company: "ScaleFlow", location: "Austin, TX", type: "Full-time", salary: "$110k - $140k", description: "Develop APIs, optimize databases, work with microservices.", icon: "⚙️" },
    { id: 4, title: "Data Analyst", company: "Insightlytics", location: "Chicago, IL", type: "Part-time", salary: "$45 - $60 / hr", description: "Analyze datasets, build dashboards, drive business decisions.", icon: "📊" },
    { id: 5, title: "DevOps Engineer", company: "CloudNative", location: "Seattle, WA", type: "Contract", salary: "$130k - $160k", description: "Manage AWS infrastructure, CI/CD pipelines, Kubernetes.", icon: "☁️" },
    { id: 6, title: "Product Manager", company: "InnovateLabs", location: "Remote", type: "Remote", salary: "$120k - $150k", description: "Lead product strategy, roadmap, cross-functional teams.", icon: "📱" },
    { id: 7, title: "QA Automation Engineer", company: "QualityFirst", location: "Boston, MA", type: "Full-time", salary: "$85k - $105k", description: "Write test scripts, automate regression tests, ensure quality.", icon: "🧪" },
    { id: 8, title: "Technical Writer", company: "DocuMint", location: "Remote", type: "Contract", salary: "$70k - $90k", description: "Create documentation, API guides, and tutorials.", icon: "📝" },
  ];

  // DOM elements
  const jobsContainer = document.getElementById("jobsContainer");
  const searchKeyword = document.getElementById("searchKeyword");
  const searchLocation = document.getElementById("searchLocation");
  const searchBtn = document.getElementById("searchBtn");
  const resetBtn = document.getElementById("resetBtn");
  const clearAllFiltersBtn = document.getElementById("clearAllFiltersBtn");
  const jobCountSpan = document.getElementById("jobCount");
  const emptyStateDiv = document.getElementById("emptyState");
  const typeChips = document.querySelectorAll(".chip");

  // Check if critical elements exist (helpful for debugging)
  if (!jobsContainer) console.error("Element #jobsContainer not found!");
  if (!searchBtn) console.error("Element #searchBtn not found!");

  // Active filters
  let activeType = "All";
  let keyword = "";
  let location = "";

  // Render jobs based on current filters
  function renderJobs() {
    let filtered = jobsData.filter((job) => {
      if (activeType !== "All" && job.type !== activeType) return false;
      if (keyword.trim() !== "") {
        const searchTerm = keyword.toLowerCase();
        const titleMatch = job.title.toLowerCase().includes(searchTerm);
        const companyMatch = job.company.toLowerCase().includes(searchTerm);
        if (!titleMatch && !companyMatch) return false;
      }
      if (location.trim() !== "") {
        const locTerm = location.toLowerCase();
        if (!job.location.toLowerCase().includes(locTerm)) return false;
      }
      return true;
    });

    // Update UI
    if (jobCountSpan) jobCountSpan.textContent = filtered.length;
    if (emptyStateDiv) {
      emptyStateDiv.style.display = filtered.length === 0 ? "block" : "none";
    }
    if (jobsContainer) {
      jobsContainer.style.display = filtered.length === 0 ? "none" : "grid";
      if (filtered.length > 0) {
        jobsContainer.innerHTML = filtered.map(job => `
          <div class="job-card" data-id="${job.id}">
            <div class="card-header">
              <div class="company-icon">${job.icon}</div>
              <span class="job-type-badge">${job.type}</span>
            </div>
            <h3 class="job-title">${job.title}</h3>
            <div class="company-name">${job.company}</div>
            <div class="job-details">
              <span><i class="fas fa-map-marker-alt"></i> ${job.location}</span>
            </div>
            <p class="job-description">${job.description}</p>
            <div class="card-footer">
              <span class="salary">${job.salary}</span>
              <button class="apply-btn">Apply Now →</button>
            </div>
          </div>
        `).join("");
      } else {
        jobsContainer.innerHTML = "";
      }
    }

    // Reattach apply button listeners
    document.querySelectorAll(".apply-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        alert("✨ Application started! This is a demo job portal.");
      });
    });
  }

  // Update active chip UI
  function updateActiveChip() {
    typeChips.forEach(chip => {
      if (chip.getAttribute("data-type") === activeType) {
        chip.classList.add("active");
      } else {
        chip.classList.remove("active");
      }
    });
  }

  // Event: chip filter
  typeChips.forEach(chip => {
    chip.addEventListener("click", () => {
      activeType = chip.getAttribute("data-type");
      updateActiveChip();
      renderJobs();
    });
  });

  // Search function
  function performSearch() {
    keyword = searchKeyword ? searchKeyword.value : "";
    location = searchLocation ? searchLocation.value : "";
    renderJobs();
  }

  // Reset all filters
  function resetFilters() {
    if (searchKeyword) searchKeyword.value = "";
    if (searchLocation) searchLocation.value = "";
    keyword = "";
    location = "";
    activeType = "All";
    updateActiveChip();
    renderJobs();
  }

  // Attach event listeners if elements exist
  if (searchBtn) searchBtn.addEventListener("click", performSearch);
  if (resetBtn) resetBtn.addEventListener("click", resetFilters);
  if (clearAllFiltersBtn) clearAllFiltersBtn.addEventListener("click", resetFilters);
  if (searchKeyword) searchKeyword.addEventListener("keypress", (e) => { if (e.key === "Enter") performSearch(); });
  if (searchLocation) searchLocation.addEventListener("keypress", (e) => { if (e.key === "Enter") performSearch(); });

  // Mobile menu toggle (optional)
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
      const navLinks = document.querySelector(".nav-links");
      const navBtns = document.querySelector(".nav-buttons");
      if (navLinks && navBtns) {
        if (navLinks.style.display === "flex") {
          navLinks.style = "";
          navBtns.style = "";
        } else {
          navLinks.style.display = "flex";
          navLinks.style.flexDirection = "column";
          navLinks.style.position = "absolute";
          navLinks.style.top = "70px";
          navLinks.style.left = "0";
          navLinks.style.width = "100%";
          navLinks.style.backgroundColor = "white";
          navLinks.style.padding = "1.5rem";
          navLinks.style.boxShadow = "var(--shadow-md)";
          navLinks.style.zIndex = "99";
          navBtns.style.display = "flex";
          navBtns.style.position = "absolute";
          navBtns.style.top = "70px";
          navBtns.style.right = "1rem";
          navBtns.style.backgroundColor = "white";
          navBtns.style.padding = "1rem";
          navBtns.style.borderRadius = "2rem";
          navBtns.style.boxShadow = "var(--shadow-md)";
        }
      }
    });
  }

  // Initial render
  renderJobs();
});