import { useState } from "react";
import './App.css';



export default function Dashboard() {
 const [menuOpen, setMenuOpen] = useState(false);
 const [search, setSearch] = useState("");
 const [showChart, setShowChart] = useState(false);
const [startDate, setStartDate] = useState("");
const [endDate, setEndDate] = useState("");
 const workshops = [
  {
    title: "Web Development",
    desc: "Build responsive web apps",
    domain: "Web",
    duration: "Short",
    state: "Tamil Nadu",
    date: "2026-04-10"
  },
  {
    title: "Data Science",
    desc: "Work with datasets and ML basics",
    domain: "Data",
    duration: "Medium",
    state: "Karnataka",
    date: "2026-04-15"
  },
  {
    title: "Cybersecurity",
    desc: "Learn system protection and attacks",
    domain: "Security",
    duration: "Long",
    state: "Maharashtra",
    date: "2026-04-20"
  }
];

const domainCounts = workshops.reduce((acc, w) => {
  acc[w.domain] = (acc[w.domain] || 0) + 1;
  return acc;
}, {});


const clearFilters = () => {
  setSearch("");
  setDomainFilter("All");
  setDurationFilter("All");
  setStateFilter("All");
  setSortOrder("none");
  setStartDate("");
setEndDate("");
};



const [domainFilter, setDomainFilter] = useState("All");
const [durationFilter, setDurationFilter] = useState("All");
 const [stateFilter, setStateFilter] = useState("All");
 
 const [sortOrder, setSortOrder] = useState("none");
const filteredWorkshops = workshops
  .filter((w) => {
    const matchesSearch = w.title.toLowerCase().includes(search.toLowerCase());

    const matchesDomain =
      domainFilter === "All" || w.domain === domainFilter;

    const matchesDuration =
      durationFilter === "All" || w.duration === durationFilter;

    const matchesState =
      stateFilter === "All" || w.state === stateFilter;

    const workshopDate = new Date(w.date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    const matchesDate =
      (!start || workshopDate >= start) &&
      (!end || workshopDate <= end);

    return (
      matchesSearch &&
      matchesDomain &&
      matchesDuration &&
      matchesState &&
      matchesDate
    );
  })
  .sort((a, b) => {
    if (sortOrder === "none") return 0;

    const order = { Short: 1, Medium: 2, Long: 3 };

    if (sortOrder === "asc") return order[a.duration] - order[b.duration];
    if (sortOrder === "desc") return order[b.duration] - order[a.duration];

    return 0;
  });
  return (
   <>
<div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
  ☰
</div>

<div className={`sidebar ${menuOpen ? "open" : ""}`}>

  <h3>Menu</h3>

  <a href="#about" onClick={() => setMenuOpen(false)}>About Us</a>
  <a href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a>
  <a href="#contact" onClick={() => setMenuOpen(false)}>Contact Us</a>
  <a href="#feedback" onClick={() => setMenuOpen(false)}>Feedback</a>

</div>
    
    <div className="container">
      

      <header className="header">
        <h1>FOSSEE Workshop Booking Portal</h1>
        <p>Discover and register for technical workshops with ease</p>
      </header>



      

      
      <section className="section">
        <h2>All Workshops</h2>



{/* CHART SECTION */}
{showChart && (
  <section className="section">
    <h2>📊 Workshops by Domain</h2>

    <div style={{ maxWidth: "500px", margin: "auto" }}>
      {Object.entries(domainCounts).map(([domain, count]) => (
        <div key={domain} style={{ marginBottom: "10px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>{domain}</span>
            <span>{count}</span>
          </div>

          <div
            style={{
              height: "10px",
              background: "#e5e7eb",
              borderRadius: "5px",
            }}
          >
            <div
              style={{
                width: `${count * 40}px`,
                height: "10px",
                background: "#2563eb",
                borderRadius: "5px",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  </section>
)}

        <div className="filter-toolbar">

  <input
    type="text"
    placeholder="Search workshops..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

  <select onChange={(e) => setDomainFilter(e.target.value)}>
    <option value="All">All Domains</option>
    <option value="Web">Web</option>
    <option value="Data">Data</option>
    <option value="Security">Security</option>
  </select>

  <select onChange={(e) => setDurationFilter(e.target.value)}>
    <option value="All">All Duration</option>
    <option value="Short">Short</option>
    <option value="Medium">Medium</option>
    <option value="Long">Long</option>
  </select>

  <select onChange={(e) => setStateFilter(e.target.value)}>
    <option value="All">All States</option>
    <option value="Tamil Nadu">Tamil Nadu</option>
    <option value="Karnataka">Karnataka</option>
    <option value="Maharashtra">Maharashtra</option>
  </select>

  <div className="filter-item">
  <label>Start Date</label>
  <input
    type="date"
    value={startDate}
    onChange={(e) => setStartDate(e.target.value)}
  />
</div>

<div className="filter-item">
  <label>End Date</label>
  <input
    type="date"
    value={endDate}
    onChange={(e) => setEndDate(e.target.value)}
  />
</div>

  <select onChange={(e) => setSortOrder(e.target.value)}>
    <option value="none">No Sorting</option>
    <option value="asc">Duration ↑</option>
    <option value="desc">Duration ↓</option>
  </select>

 
  
  

   <button onClick={clearFilters}>
    Clear Filters
  </button>

  <button onClick={() => setShowChart(!showChart)}>
    {showChart ? "Hide Chart" : "View Chart"}
  </button>

</div>





      <div className="grid">
  {filteredWorkshops.length > 0 ? (
    filteredWorkshops.map((w, index) => (
      <div className="card" key={index}>
  <h3>{w.title}</h3>

  <p>{w.desc}</p>

  <p style={{ fontWeight: "bold", color: "#2563eb", margin: "6px 0" }}>
    Duration: {w.duration}
  </p>

  <p style={{ fontSize: "0.9rem", color: "#555" }}>
    📍 State: {w.state}
  </p>

  <p style={{ fontSize: "0.9rem", color: "#555" }}>
    📅 Date: {w.date}
  </p>

  <button>Register</button>
</div>
    ))
  ) : (
    <p style={{ textAlign: "center", color: "#666", gridColumn: "1 / -1" }}>
      No workshops found !😕
    </p>
  )}
</div>
      </section>

      <section className="section">
        <h2>⭐ Featured Workshop</h2>

        <div className="grid">
          <div className="card highlight">
            <h3>Artificial Intelligence Bootcamp</h3>
            <p>
              Learn core AI concepts, machine learning basics, and hands-on model building.
            </p>
            <button>Explore</button>
          </div>
        </div>
      </section>


<section id="about" className="section">
  <h2>About Us</h2>
  <p>We provide curated technical workshops for students to learn practical skills.</p>
</section>

          <section id="faq" className="section">
        <h2>FAQ</h2>
        <p><b>Who can join?</b> Anyone interested in learning.</p>
        <p><b>Is it free?</b> Depends on the workshop.</p>
      </section>
      
      
      
      
      
      <section id="contact" className="section">
  <h2>Contact Us</h2>
  <p>Email: support@workshopportal.com</p>
</section>

<section id="feedback" className="section">
  <h2>Feedback</h2>
  <p>We’d love your thoughts on improving the platform.</p>
</section>

      <footer className="footer">
        <p>FOSSEE worshops • Efficient Learning • React UI Enhancement</p>
      </footer>

    </div>
    </>
  );
}


// dashboard update 
