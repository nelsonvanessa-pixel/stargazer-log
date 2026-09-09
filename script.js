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

fetch("events.json")
  .then((response) => response.json())
  .then((events) => {
    allEvents = events;
    renderRepositories(allEvents);
    
    document.querySelector("#sortByName").addEventListener("click", () => {
      const sorted = [...allEvents].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      renderRepositories(sorted);
    });
    
    document.querySelector("#sortByDate").addEventListener("click", () => {
      const sorted = [...allEvents].sort((a, b) =>
        new Date(b.starred) - new Date(a.starred)
      );
      renderRepositories(sorted);
    });
  });
