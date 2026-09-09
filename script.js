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

function setupEventListeners() {
  const sortByNameBtn = document.querySelector("#sortByName");
  const sortByDateBtn = document.querySelector("#sortByDate");
  
  if (sortByNameBtn) {
    sortByNameBtn.addEventListener("click", () => {
      const sorted = [...allEvents].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      renderRepositories(sorted);
    });
  }
  
  if (sortByDateBtn) {
    sortByDateBtn.addEventListener("click", () => {
      const sorted = [...allEvents].sort((a, b) =>
        new Date(b.starred) - new Date(a.starred)
      );
      renderRepositories(sorted);
    });
  }
}

// Set up listeners immediately when DOM is ready
document.addEventListener("DOMContentLoaded", setupEventListeners);

fetch("events.json")
  .then((response) => response.json())
  .then((events) => {
    allEvents = events;
    renderRepositories(allEvents);
  })
  .catch((error) => console.error("Error loading events:", error));
