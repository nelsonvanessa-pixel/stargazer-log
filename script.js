let allEvents = [];

function renderRepositories(eventsToRender) {
  const list = document.querySelector("#starred");
  list.innerHTML = "";
  eventsToRender.forEach((event) => {
    const item = document.createElement("li");
    item.textContent = `${event.name} — starred ${event.starred}`;
    list.appendChild(item);
  });
}

// Attach event listeners immediately
const sortByNameBtn = document.querySelector("#sortByName");
const sortByDateBtn = document.querySelector("#sortByDate");

console.log("Buttons found:", sortByNameBtn, sortByDateBtn);

if (sortByNameBtn) {
  sortByNameBtn.addEventListener("click", () => {
    console.log("Sort by name clicked");
    const sorted = [...allEvents].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    renderRepositories(sorted);
  });
}

if (sortByDateBtn) {
  sortByDateBtn.addEventListener("click", () => {
    console.log("Sort by date clicked");
    const sorted = [...allEvents].sort((a, b) =>
      new Date(b.starred) - new Date(a.starred)
    );
    renderRepositories(sorted);
  });
}

// Load and display events
fetch("events.json")
  .then((response) => {
    console.log("Fetch response:", response);
    return response.json();
  })
  .then((events) => {
    console.log("Events loaded:", events);
    allEvents = events;
    renderRepositories(allEvents);
  })
  .catch((error) => console.error("Error loading events:", error));
