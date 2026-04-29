const storageKey = "ceannaAcademy.travelPlanner.v3";
const oldStorageKeys = ["voyageboard.travelPlanner.v2", "voyageboard.travelPlanner.v1"];

const categories = ["Flight", "Stay", "Food", "Transport", "Activity", "Shopping", "Other"];

const state = {
  imageData: "",
  editingId: "",
  draggedId: "",
  deletePending: false,
  deleteTimer: 0,
  activeTripId: "",
  trips: [],
  cities: ["Vancouver, BC"],
  items: [
    { id: crypto.randomUUID(), title: "Round-trip flight", category: "Flight", city: "Vancouver, BC", days: [1], cost: 540, fromTime: "08:30", toTime: "11:10", note: "Add airline confirmation link here." },
    { id: crypto.randomUUID(), title: "Waterfront hotel deposit", category: "Stay", city: "Vancouver, BC", days: [1], cost: 820, fromTime: "15:00", toTime: "15:30", note: "Paste hotel address, check-in instructions, or receipt." },
    { id: crypto.randomUUID(), title: "Granville Island food crawl", category: "Food", city: "Vancouver, BC", days: [2], cost: 95, fromTime: "12:00", toTime: "14:00", note: "" },
  ],
};

const els = {
  tripImage: document.querySelector("#tripImage"),
  newTrip: document.querySelector("#newTrip"),
  deleteTrip: document.querySelector("#deleteTrip"),
  tripTabs: document.querySelector("#tripTabs"),
  importFile: document.querySelector("#importFile"),
  importStatus: document.querySelector("#importStatus"),
  coverPreview: document.querySelector("#coverPreview"),
  coverUploader: document.querySelector(".cover-uploader"),
  tripName: document.querySelector("#tripName"),
  cityInput: document.querySelector("#cityInput"),
  addCity: document.querySelector("#addCity"),
  cityList: document.querySelector("#cityList"),
  currency: document.querySelector("#currency"),
  startDate: document.querySelector("#startDate"),
  endDate: document.querySelector("#endDate"),
  budget: document.querySelector("#budget"),
  tripTitle: document.querySelector("#tripTitle"),
  tripMeta: document.querySelector("#tripMeta"),
  budgetUsed: document.querySelector("#budgetUsed"),
  meterFill: document.querySelector("#meterFill"),
  totalCost: document.querySelector("#totalCost"),
  itemCount: document.querySelector("#itemCount"),
  dailyAverage: document.querySelector("#dailyAverage"),
  itemTitle: document.querySelector("#itemTitle"),
  itemCategory: document.querySelector("#itemCategory"),
  itemCity: document.querySelector("#itemCity"),
  itemDaysMenu: document.querySelector("#itemDaysMenu"),
  itemDaysSummary: document.querySelector("#itemDaysSummary"),
  itemDaysOptions: document.querySelector("#itemDaysOptions"),
  itemCost: document.querySelector("#itemCost"),
  itemFromTime: document.querySelector("#itemFromTime"),
  itemToTime: document.querySelector("#itemToTime"),
  itemNote: document.querySelector("#itemNote"),
  linkText: document.querySelector("#linkText"),
  linkUrl: document.querySelector("#linkUrl"),
  addNoteLink: document.querySelector("#addNoteLink"),
  addItem: document.querySelector("#addItem"),
  cancelEdit: document.querySelector("#cancelEdit"),
  filterText: document.querySelector("#filterText"),
  filterCategory: document.querySelector("#filterCategory"),
  sortBy: document.querySelector("#sortBy"),
  itemsList: document.querySelector("#itemsList"),
  notes: document.querySelector("#notes"),
  categoryBreakdown: document.querySelector("#categoryBreakdown"),
  lastUpdated: document.querySelector("#lastUpdated"),
  exportPdf: document.querySelector("#exportPdf"),
  exportExcel: document.querySelector("#exportExcel"),
};

const categoryColors = {
  Flight: "#8fc7ff",
  Stay: "#70d6b7",
  Food: "#f3c969",
  Transport: "#a6e36d",
  Activity: "#ff9f7f",
  Shopping: "#d8a7ff",
  Other: "#cfd5df",
};

function setDefaultDates() {
  const today = new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);
  els.startDate.valueAsDate = today;
  els.endDate.valueAsDate = nextWeek;
}

function loadSavedTrip() {
  const saved = JSON.parse(localStorage.getItem(storageKey) || "null");
  if (saved?.trips?.length) {
    state.trips = saved.trips.map(normalizeTrip);
    state.activeTripId = saved.activeTripId || state.trips[0].id;
    applyTrip(state.trips.find((trip) => trip.id === state.activeTripId) || state.trips[0]);
    return;
  }

  const legacy = oldStorageKeys.map((key) => localStorage.getItem(key)).find(Boolean);
  if (!legacy) {
    const firstTrip = currentTripSnapshot("Pacific Coast Escape");
    state.trips = [firstTrip];
    state.activeTripId = firstTrip.id;
    return;
  }

  const oldSaved = JSON.parse(legacy);
  state.imageData = oldSaved.imageData || "";
  state.items = Array.isArray(oldSaved.items) ? oldSaved.items.map(normalizeItem) : state.items;

  state.cities = normalizeCities(oldSaved.cities || oldSaved.destination || state.cities);
  state.items = state.items.map((item) => ({ ...item, city: item.city || state.cities[0] || "" }));

  ["tripName", "currency", "startDate", "endDate", "budget", "notes"].forEach((key) => {
    if (oldSaved[key] !== undefined) els[key].value = oldSaved[key];
  });

  syncCoverImage();
  const migratedTrip = currentTripSnapshot();
  state.trips = [migratedTrip];
  state.activeTripId = migratedTrip.id;
}

function normalizeTrip(trip) {
  const cities = normalizeCities(trip.cities || trip.destination);
  return {
    id: trip.id || crypto.randomUUID(),
    imageData: trip.imageData || "",
    cities,
    items: Array.isArray(trip.items) ? trip.items.map((item) => normalizeItem(item, cities)) : [],
    tripName: trip.tripName || "Untitled Trip",
    currency: trip.currency || "$",
    startDate: trip.startDate || "",
    endDate: trip.endDate || "",
    budget: trip.budget || "2500",
    notes: trip.notes || "",
  };
}

function currentTripSnapshot(fallbackName = "Untitled Trip") {
  return {
    id: state.activeTripId || crypto.randomUUID(),
    imageData: state.imageData,
    cities: state.cities,
    items: state.items,
    tripName: els.tripName.value.trim() || fallbackName,
    currency: els.currency.value,
    startDate: els.startDate.value,
    endDate: els.endDate.value,
    budget: els.budget.value,
    notes: els.notes.value,
  };
}

function applyTrip(trip) {
  const normalized = normalizeTrip(trip);
  state.activeTripId = normalized.id;
  state.imageData = normalized.imageData;
  state.cities = normalized.cities.length ? normalized.cities : ["Vancouver, BC"];
  state.items = normalized.items;
  els.tripName.value = normalized.tripName;
  els.currency.value = normalized.currency;
  els.startDate.value = normalized.startDate;
  els.endDate.value = normalized.endDate;
  els.budget.value = normalized.budget;
  els.notes.value = normalized.notes;
  clearItemForm();
  syncCoverImage();
  renderCityControls();
}

function syncCoverImage() {
  if (state.imageData) {
    els.coverPreview.src = state.imageData;
    els.coverUploader.classList.add("has-image");
  } else {
    els.coverPreview.removeAttribute("src");
    els.coverUploader.classList.remove("has-image");
  }
}

function createNewTrip() {
  resetDeleteConfirmation();
  saveTrip();
  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);
  const trip = normalizeTrip({
    id: crypto.randomUUID(),
    tripName: `Trip ${state.trips.length + 1}`,
    cities: [],
    currency: els.currency.value || "$",
    startDate: new Date().toISOString().slice(0, 10),
    endDate: nextWeek.toISOString().slice(0, 10),
    budget: "2500",
    notes: "",
    items: [],
  });
  state.trips.push(trip);
  applyTrip(trip);
  els.filterText.value = "";
  els.filterCategory.value = "All";
  els.sortBy.value = "manual";
  render();
}

function switchTrip(id) {
  resetDeleteConfirmation();
  if (id === state.activeTripId) return;
  saveTrip();
  const trip = state.trips.find((entry) => entry.id === id);
  if (!trip) return;
  applyTrip(trip);
  render();
}

function deleteActiveTrip() {
  if (state.trips.length <= 1) {
    resetDeleteConfirmation("Keep one");
    return;
  }

  const activeId = state.activeTripId;
  const deleteIndex = state.trips.findIndex((trip) => trip.id === activeId);
  if (deleteIndex < 0) {
    state.activeTripId = state.trips[0].id;
    applyTrip(state.trips[0]);
    persistTrips();
    render();
    return;
  }

  if (!state.deletePending) {
    state.deletePending = true;
    els.deleteTrip.textContent = "Confirm";
    els.deleteTrip.classList.add("confirm-delete");
    clearTimeout(state.deleteTimer);
    state.deleteTimer = setTimeout(() => resetDeleteConfirmation(), 5000);
    return;
  }

  state.trips = state.trips.filter((trip) => trip.id !== activeId);
  const nextTrip = state.trips[Math.max(0, deleteIndex - 1)] || state.trips[0];
  resetDeleteConfirmation();
  applyTrip(nextTrip);
  persistTrips();
  render();
}

function resetDeleteConfirmation(label = "Delete") {
  state.deletePending = false;
  clearTimeout(state.deleteTimer);
  if (!els.deleteTrip) return;
  els.deleteTrip.textContent = label;
  els.deleteTrip.classList.remove("confirm-delete");
  if (label !== "Delete") {
    state.deleteTimer = setTimeout(() => resetDeleteConfirmation(), 1800);
  }
}

function renderTripTabs() {
  if (!state.trips.length) return;
  els.deleteTrip.disabled = state.trips.length <= 1;
  if (state.trips.length <= 1) resetDeleteConfirmation();
  els.tripTabs.innerHTML = state.trips.map((trip) => `
    <button class="trip-tab ${trip.id === state.activeTripId ? "active" : ""}" type="button" role="tab" aria-selected="${trip.id === state.activeTripId}" data-trip-tab="${trip.id}">
      ${escapeHtml(trip.tripName || "Untitled Trip")}
    </button>
  `).join("");
}

function saveTrip() {
  const snapshot = currentTripSnapshot();
  const existingIndex = state.trips.findIndex((trip) => trip.id === snapshot.id);
  if (existingIndex >= 0) state.trips[existingIndex] = snapshot;
  else state.trips.push(snapshot);
  persistTrips();
}

function persistTrips() {
  localStorage.setItem(storageKey, JSON.stringify({
    activeTripId: state.activeTripId,
    trips: state.trips,
  }));
}

function normalizeItem(item, cities = state.cities) {
  return {
    id: item.id || crypto.randomUUID(),
    title: item.title || item.item || item.name || "Imported plan",
    category: categories.includes(item.category) ? item.category : guessCategory(`${item.category || ""} ${item.title || ""}`),
    city: item.city || item.destination || item.location || cities[0] || "",
    days: normalizeDays(item.days || item.day || item.tripDays || item.tripDay),
    cost: Number(String(item.cost ?? item.amount ?? 0).replace(/[^0-9.-]/g, "")) || 0,
    fromTime: normalizeTime(item.fromTime || item.from || item.start || ""),
    toTime: normalizeTime(item.toTime || item.to || item.end || ""),
    note: item.note || item.notes || item.link || item.links || item.details || "",
  };
}

function normalizeCities(value) {
  const source = Array.isArray(value) ? value : String(value || "").split(/[,;\n]/);
  return [...new Set(source.map((city) => String(city).trim()).filter(Boolean))];
}

function normalizeDays(value) {
  const source = Array.isArray(value) ? value : String(value || "").split(/[,;\s]+/);
  const maxDay = tripDays().length || 999;
  return [...new Set(source.map((day) => {
    const match = String(day).match(/\d+/);
    return match ? Number(match[0]) : 0;
  }).filter((day) => day >= 1 && day <= maxDay))];
}

function guessCategory(value) {
  const text = value.toLowerCase();
  if (/flight|plane|airport/.test(text)) return "Flight";
  if (/hotel|stay|lodg|airbnb|inn/.test(text)) return "Stay";
  if (/food|dinner|lunch|breakfast|restaurant|cafe/.test(text)) return "Food";
  if (/taxi|train|bus|uber|lyft|car|transport/.test(text)) return "Transport";
  if (/tour|museum|walk|activity|ticket|show/.test(text)) return "Activity";
  if (/shop|gift|market/.test(text)) return "Shopping";
  return "Other";
}

function normalizeTime(value) {
  const text = String(value || "").trim();
  if (/^\d{2}:\d{2}/.test(text)) return text.slice(0, 5);
  if (/^\d{3,4}$/.test(text)) {
    const padded = text.padStart(4, "0");
    const hour = Number(padded.slice(0, 2));
    const minute = Number(padded.slice(2, 4));
    if (hour <= 23 && minute <= 59) return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
  }
  const match = text.match(/\b([01]?\d|2[0-3])(?::?([0-5]\d))?\s*(am|pm)?\b/i);
  if (!match) return "";
  let hour = Number(match[1]);
  const minute = match[2] || "00";
  const meridian = match[3]?.toLowerCase();
  if (meridian === "pm" && hour < 12) hour += 12;
  if (meridian === "am" && hour === 12) hour = 0;
  return `${String(hour).padStart(2, "0")}:${minute}`;
}

function keepMinutePrecision(input) {
  input.value = normalizeTime(input.value);
}

function autoFormatCompactTime(input) {
  const digits = input.value.replace(/\D/g, "");
  if (digits.length === 4) input.value = normalizeTime(digits);
}

function money(value) {
  return `${els.currency.value}${Number(value || 0).toLocaleString(undefined, {
    maximumFractionDigits: 2,
    minimumFractionDigits: Number(value) % 1 ? 2 : 0,
  })}`;
}

function daysPlanned() {
  if (!els.startDate.value || !els.endDate.value) return 1;
  const start = new Date(els.startDate.value);
  const end = new Date(els.endDate.value);
  return Math.max(Math.round((end - start) / 86400000) + 1, 1);
}

function tripDays() {
  const count = daysPlanned();
  const start = els.startDate.value ? new Date(els.startDate.value) : null;
  return Array.from({ length: count }, (_, index) => {
    const date = start ? new Date(start) : null;
    if (date) date.setDate(start.getDate() + index);
    return {
      day: index + 1,
      date: date ? date.toLocaleDateString(undefined, { month: "short", day: "numeric" }) : "",
    };
  });
}

function tripMetaText() {
  const dates = [els.startDate.value, els.endDate.value].filter(Boolean).join(" to ");
  const cities = state.cities.length ? state.cities.join(" -> ") : "Add trip cities";
  return [cities, dates].filter(Boolean).join(" | ");
}

function totals(items = state.items) {
  return items.reduce((sum, item) => sum + Number(item.cost || 0), 0);
}

function visibleItems() {
  const query = els.filterText.value.trim().toLowerCase();
  const category = els.filterCategory.value;
  const filtered = state.items.filter((item) => {
    const matchesText = !query || [item.title, item.category, item.city, dayLabel(item.days), item.fromTime, item.toTime, item.note].join(" ").toLowerCase().includes(query);
    const matchesCategory = category === "All" || item.category === category;
    return matchesText && matchesCategory;
  });

  const sorted = [...filtered];
  if (els.sortBy.value === "time") sorted.sort((a, b) => timeRank(a).localeCompare(timeRank(b)));
  if (els.sortBy.value === "day") sorted.sort((a, b) => dayRank(a) - dayRank(b) || timeRank(a).localeCompare(timeRank(b)));
  if (els.sortBy.value === "cost-desc") sorted.sort((a, b) => Number(b.cost) - Number(a.cost));
  if (els.sortBy.value === "cost-asc") sorted.sort((a, b) => Number(a.cost) - Number(b.cost));
  if (els.sortBy.value === "category") sorted.sort((a, b) => a.category.localeCompare(b.category) || a.title.localeCompare(b.title));
  if (els.sortBy.value === "title") sorted.sort((a, b) => a.title.localeCompare(b.title));
  return sorted;
}

function timeRank(item) {
  return item.fromTime || item.toTime || "99:99";
}

function dayRank(item) {
  return normalizeDays(item.days)[0] || 999;
}

function render() {
  const total = totals();
  const budget = Number(els.budget.value || 0);
  const percent = budget ? Math.min((total / budget) * 100, 100) : 0;

  els.tripTitle.textContent = els.tripName.value.trim() || "Untitled Trip";
  els.tripMeta.textContent = tripMetaText() || "Add cities and dates";
  els.totalCost.textContent = money(total);
  els.budgetUsed.textContent = `${Math.round(percent)}%`;
  els.meterFill.style.width = `${percent}%`;
  els.itemCount.textContent = state.items.length;
  els.dailyAverage.textContent = money(total / daysPlanned());
  els.lastUpdated.textContent = `Updated ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;

  renderItems();
  renderBreakdown(total);
  renderCityControls();
  renderDayControls();
  saveTrip();
  renderTripTabs();
}

function renderDayControls() {
  const selected = selectedItemDays();
  const days = tripDays();
  els.itemDaysOptions.innerHTML = days.map(({ day, date }) => `
    <label class="day-option">
      <input type="checkbox" value="${day}" ${selected.includes(day) ? "checked" : ""}>
      <span>Day ${day}${date ? ` - ${escapeHtml(date)}` : ""}</span>
    </label>
  `).join("");
  setItemDaySelection(selected.filter((day) => day <= days.length));
}

function renderCityControls() {
  const cities = state.cities;
  const selectedCity = els.itemCity.value || cities[0] || "";
  els.itemCity.innerHTML = [
    `<option value="">No city</option>`,
    ...cities.map((city) => `<option value="${escapeHtml(city)}">${escapeHtml(city)}</option>`),
  ].join("");
  els.itemCity.value = cities.includes(selectedCity) ? selectedCity : "";

  els.cityList.innerHTML = cities.length
    ? cities.map((city) => `
        <span class="city-chip">
          ${escapeHtml(city)}
          <button type="button" aria-label="Remove ${escapeHtml(city)}" data-remove-city="${escapeHtml(city)}">x</button>
        </span>
      `).join("")
    : `<span class="city-empty">Add cities for this trip.</span>`;
}

function renderItems() {
  const items = visibleItems();
  if (!items.length) {
    els.itemsList.innerHTML = `<div class="empty-state">No plans match the current filter.</div>`;
    return;
  }

  els.itemsList.innerHTML = items.map((item) => `
    <article class="trip-item" draggable="${els.sortBy.value === "manual"}" data-id="${item.id}">
      <button class="drag-handle" type="button" aria-label="Drag ${escapeHtml(item.title)}">::</button>
      <span class="category-chip" style="background:${categoryColors[item.category] || categoryColors.Other}">${escapeHtml(item.category)}</span>
      <div>
        <h4>${escapeHtml(item.title)}</h4>
        <p>${escapeHtml([item.city, dayLabel(item.days), timeLabel(item)].filter(Boolean).join(" | ")) || "Trip item"}</p>
        ${item.note ? `<div class="item-note">${renderNote(item.note)}</div>` : ""}
      </div>
      <span class="item-cost">${money(item.cost)}</span>
      <button class="icon-button" type="button" aria-label="Edit ${escapeHtml(item.title)}" data-edit="${item.id}">Edit</button>
      <button class="icon-button" type="button" aria-label="Remove ${escapeHtml(item.title)}" data-remove="${item.id}">x</button>
    </article>
  `).join("");
}

function timeLabel(item) {
  if (item.fromTime && item.toTime) return `${item.fromTime} to ${item.toTime}`;
  if (item.fromTime) return `From ${item.fromTime}`;
  if (item.toTime) return `Until ${item.toTime}`;
  return "";
}

function dayLabel(days) {
  const normalized = normalizeDays(days);
  if (!normalized.length) return "";
  return normalized.map((day) => `Day ${day}`).join(", ");
}

function renderBreakdown(total) {
  const byCategory = state.items.reduce((map, item) => {
    map[item.category] = (map[item.category] || 0) + Number(item.cost || 0);
    return map;
  }, {});

  els.categoryBreakdown.innerHTML = Object.entries(byCategory)
    .sort((a, b) => b[1] - a[1])
    .map(([category, value]) => {
      const percent = total ? (value / total) * 100 : 0;
      return `
        <div class="breakdown-row">
          <span>${escapeHtml(category)}</span>
          <span class="breakdown-bar"><span style="width:${percent}%;background:${categoryColors[category] || categoryColors.Other}"></span></span>
          <strong>${money(value)}</strong>
        </div>
      `;
    })
    .join("");
}

function submitItem() {
  const title = els.itemTitle.value.trim();
  if (!title) {
    els.itemTitle.focus();
    return;
  }

  const payload = normalizeItem({
    title,
    category: els.itemCategory.value,
    city: els.itemCity.value,
    days: selectedItemDays(),
    cost: els.itemCost.value,
    fromTime: els.itemFromTime.value,
    toTime: els.itemToTime.value,
    note: els.itemNote.value,
  });

  if (state.editingId) {
    state.items = state.items.map((item) => item.id === state.editingId ? { ...payload, id: item.id } : item);
  } else {
    state.items.unshift(payload);
  }

  clearItemForm();
  render();
}

function editItem(id) {
  const item = state.items.find((entry) => entry.id === id);
  if (!item) return;
  state.editingId = id;
  els.itemTitle.value = item.title;
  els.itemCategory.value = item.category;
  els.itemCity.value = item.city || "";
  setItemDaySelection(item.days || []);
  els.itemCost.value = item.cost;
  els.itemFromTime.value = normalizeTime(item.fromTime);
  els.itemToTime.value = normalizeTime(item.toTime);
  els.itemNote.value = item.note || "";
  els.addItem.textContent = "Save";
  els.cancelEdit.hidden = false;
  els.itemTitle.focus();
}

function clearItemForm() {
  state.editingId = "";
  els.itemTitle.value = "";
  els.itemCost.value = "";
  els.itemCity.value = state.cities[0] || "";
  setItemDaySelection([]);
  els.itemFromTime.value = "";
  els.itemToTime.value = "";
  els.itemNote.value = "";
  els.linkText.value = "";
  els.linkUrl.value = "";
  els.addItem.textContent = "Add";
  els.cancelEdit.hidden = true;
}

function selectedItemDays() {
  return [...els.itemDaysOptions.querySelectorAll("input:checked")].map((input) => Number(input.value));
}

function setItemDaySelection(days) {
  const normalized = normalizeDays(days);
  els.itemDaysOptions.querySelectorAll("input").forEach((input) => {
    input.checked = normalized.includes(Number(input.value));
  });
  els.itemDaysSummary.textContent = normalized.length ? dayLabel(normalized) : "Pick days";
}

function addCity() {
  const city = els.cityInput.value.trim();
  if (!city) {
    els.cityInput.focus();
    return;
  }
  if (!state.cities.includes(city)) state.cities.push(city);
  els.cityInput.value = "";
  els.itemCity.value = city;
  state.items = state.items.map((item) => item.city ? item : { ...item, city });
  render();
}

function removeCity(city) {
  state.cities = state.cities.filter((entry) => entry !== city);
  const fallback = state.cities[0] || "";
  state.items = state.items.map((item) => item.city === city ? { ...item, city: fallback } : item);
  render();
}

function addNoteLink() {
  const text = els.linkText.value.trim();
  const url = normalizeUrl(els.linkUrl.value.trim());
  if (!text) {
    els.linkText.focus();
    return;
  }
  if (!url) {
    els.linkUrl.focus();
    return;
  }
  insertAtCursor(els.itemNote, `[${text}](${url})`);
  els.linkText.value = "";
  els.linkUrl.value = "";
  els.itemNote.focus();
}

function normalizeUrl(value) {
  if (!value) return "";
  if (/^https?:\/\//i.test(value)) return value;
  return `https://${value}`;
}

function insertAtCursor(input, text) {
  const start = input.selectionStart ?? input.value.length;
  const end = input.selectionEnd ?? input.value.length;
  const before = input.value.slice(0, start);
  const after = input.value.slice(end);
  const prefix = before && !before.endsWith("\n") ? "\n" : "";
  const suffix = after && !after.startsWith("\n") ? "\n" : "";
  input.value = `${before}${prefix}${text}${suffix}${after}`;
  const cursor = before.length + prefix.length + text.length;
  input.setSelectionRange(cursor, cursor);
}

function moveItem(draggedId, targetId) {
  if (!draggedId || !targetId || draggedId === targetId || els.sortBy.value !== "manual") return;
  const draggedIndex = state.items.findIndex((item) => item.id === draggedId);
  const targetIndex = state.items.findIndex((item) => item.id === targetId);
  if (draggedIndex < 0 || targetIndex < 0) return;
  const [dragged] = state.items.splice(draggedIndex, 1);
  state.items.splice(targetIndex, 0, dragged);
  render();
}

function exportExcel() {
  const rows = [
    ["Trip", els.tripName.value],
    ["Cities", state.cities.join("; ")],
    ["Start Date", els.startDate.value],
    ["End Date", els.endDate.value],
    ["Budget", els.budget.value],
    ["Total", totals()],
    [],
    ["Category", "City", "Days", "Item", "Cost", "From Time", "To Time", "Note"],
    ...state.items.map((item) => [item.category, item.city, dayLabel(item.days), item.title, item.cost, item.fromTime, item.toTime, item.note]),
    [],
    ["Notes", els.notes.value],
  ];

  const worksheet = rows
    .map((row) => `<tr>${row.map((cell) => `<td>${escapeHtml(String(cell ?? ""))}</td>`).join("")}</tr>`)
    .join("");

  downloadBlob(`
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel">
      <head><meta charset="utf-8"></head>
      <body><table>${worksheet}</table></body>
    </html>
  `, fileBaseName("travel-planner", "xls"), "application/vnd.ms-excel");
}

function exportPdf() {
  const lines = [
    els.tripName.value || "Travel Planner",
    tripMetaText(),
    `Budget: ${money(els.budget.value)}   Total: ${money(totals())}`,
    "",
    "Itinerary",
    ...state.items.flatMap((item) => [
      `${item.category}: ${item.city || ""} ${dayLabel(item.days)} ${timeLabel(item)} ${item.title} - ${money(item.cost)}`.replace(/\s+/g, " ").trim(),
      item.note ? `Note: ${item.note}` : "",
    ]).filter(Boolean),
    "",
    "Notes",
    els.notes.value || "",
  ];

  downloadBlob(makeSimplePdf(lines), fileBaseName("travel-planner", "pdf"), "application/pdf");
}

async function importFile(file) {
  if (!file) return;
  els.importStatus.textContent = `Importing ${file.name}...`;
  try {
    const extension = file.name.split(".").pop().toLowerCase();
    let imported = [];
    if (extension === "pdf" || file.type === "application/pdf") imported = await importPdf(file);
    else if (extension === "xlsx" && window.XLSX) imported = await importXlsx(file);
    else imported = await importTextTable(file);

    if (!imported.length) throw new Error("No itinerary rows found");
    const importedItems = imported.map(normalizeItem);
    state.cities = normalizeCities([...state.cities, ...importedItems.map((item) => item.city)]);
    state.items = [...importedItems, ...state.items];
    els.importStatus.textContent = `Imported ${imported.length} item${imported.length === 1 ? "" : "s"}.`;
    render();
  } catch (error) {
    els.importStatus.textContent = `Import failed: ${error.message}`;
  } finally {
    els.importFile.value = "";
  }
}

async function importXlsx(file) {
  const data = await file.arrayBuffer();
  const workbook = XLSX.read(data, { type: "array" });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  return rowsToItems(XLSX.utils.sheet_to_json(sheet, { header: 1, raw: false }));
}

async function importTextTable(file) {
  const text = await file.text();
  if (/<table/i.test(text)) {
    const doc = new DOMParser().parseFromString(text, "text/html");
    const rows = [...doc.querySelectorAll("tr")].map((row) => [...row.children].map((cell) => cell.textContent.trim()));
    return rowsToItems(rows);
  }
  return rowsToItems(parseDelimitedRows(text));
}

async function importPdf(file) {
  const pdfjsLib = window.pdfjsLib || await import("https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.min.mjs");
  if (pdfjsLib.GlobalWorkerOptions) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.worker.min.mjs";
  }
  const pdf = await pdfjsLib.getDocument({ data: await file.arrayBuffer() }).promise;
  const lines = [];
  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();
    lines.push(content.items.map((item) => item.str).join(" "));
  }
  return rowsToItems(lines.flatMap((line) => parsePdfLine(line)));
}

function parseDelimitedRows(text) {
  return text.split(/\r?\n/).filter(Boolean).map((line) => {
    const delimiter = line.includes("\t") ? "\t" : ",";
    return line.split(delimiter).map((cell) => cell.trim().replace(/^"|"$/g, ""));
  });
}

function parsePdfLine(line) {
  return line.split(/(?=\b(?:Flight|Stay|Food|Transport|Activity|Shopping|Other)\b\s*:)/i).map((part) => {
    const category = guessCategory(part);
    const cost = extractMoney(part);
    const times = [...part.matchAll(/\b([01]?\d|2[0-3])(?::[0-5]\d)?\s*(?:am|pm)?\b/gi)].map((match) => normalizeTime(match[0]));
    const title = part
      .replace(/\b(Flight|Stay|Food|Transport|Activity|Shopping|Other)\b\s*:/i, "")
      .replace(/(?:USD|CAD|EUR|GBP|JPY|\$|C\$)?\s*[0-9]+(?:\.[0-9]{1,2})?/gi, "")
      .replace(/\b([01]?\d|2[0-3])(?::[0-5]\d)?\s*(?:am|pm)?\b/gi, "")
      .replace(/[-:]+/g, " ")
      .trim();
    return title ? [category, "", "", title, cost, times[0] || "", times[1] || "", ""] : null;
  }).filter(Boolean);
}

function extractMoney(text) {
  const currencyMatch = text.match(/(?:USD|CAD|EUR|GBP|JPY|\$|C\$)\s*([0-9]+(?:\.[0-9]{1,2})?)/i);
  if (currencyMatch) return currencyMatch[1];
  const matches = [...text.matchAll(/[0-9]+(?:\.[0-9]{1,2})?/g)].filter((match) => {
    const before = text[match.index - 1] || "";
    const after = text[match.index + match[0].length] || "";
    return before !== ":" && after !== ":";
  });
  return matches.at(-1)?.[0] || 0;
}

function rowsToItems(rows) {
  const headerIndex = rows.findIndex((row) => row.some((cell) => /category|item|cost|from|to|note|link/i.test(String(cell))));
  const headers = headerIndex >= 0 ? rows[headerIndex].map((cell) => String(cell).toLowerCase()) : [];
  const hasHeaders = headerIndex >= 0;
  const dataRows = rows.slice(headerIndex >= 0 ? headerIndex + 1 : 0).filter((row) => row.filter(Boolean).length >= 2);

  return dataRows.map((row) => {
    const get = (names, fallbackIndex) => {
      const index = headers.findIndex((header) => names.some((name) => header.includes(name)));
      if (index >= 0) return row[index] || "";
      return hasHeaders ? "" : row[fallbackIndex] || "";
    };
    return {
      category: get(["category", "type"], 0),
      city: get(["city", "location", "destination"], 1),
      days: get(["day"], 2),
      title: get(["item", "title", "plan", "name"], 3),
      cost: get(["cost", "amount", "price"], 4),
      fromTime: get(["from", "start"], 5),
      toTime: get(["to", "end"], 6),
      note: get(["note", "notes", "link", "links", "detail"], 7),
    };
  }).filter((item) => item.title || item.category);
}

function makeSimplePdf(lines) {
  const width = 612;
  const height = 792;
  const escapedLines = lines.flatMap((line) => wrapPdfText(String(line), 84));
  const text = escapedLines
    .slice(0, 42)
    .map((line, index) => `BT /F1 12 Tf 54 ${height - 72 - index * 16} Td (${escapePdf(line)}) Tj ET`)
    .join("\n");

  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${width} ${height}] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    `<< /Length ${text.length} >>\nstream\n${text}\nendstream`,
  ];

  let body = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets.push(body.length);
    body += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });

  const xrefStart = body.length;
  body += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach((offset) => {
    body += `${String(offset).padStart(10, "0")} 00000 n \n`;
  });
  body += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;
  return body;
}

function wrapPdfText(text, max) {
  const words = text.split(/\s+/);
  const lines = [];
  let current = "";
  words.forEach((word) => {
    if (`${current} ${word}`.trim().length > max) {
      lines.push(current);
      current = word;
    } else {
      current = `${current} ${word}`.trim();
    }
  });
  lines.push(current);
  return lines.length ? lines : [""];
}

function fileBaseName(base, extension) {
  const safeTrip = (els.tripName.value || base).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  return `${safeTrip || base}.${extension}`;
}

function downloadBlob(content, filename, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[char]);
}

function escapePdf(value) {
  return String(value).replace(/[()\\]/g, "\\$&").replace(/[^\x20-\x7E]/g, "");
}

function renderNote(value) {
  const placeholders = [];
  const withMarkdownLinks = String(value).replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, (_, label, url) => {
    const token = `__LINK_${placeholders.length}__`;
    placeholders.push(`<a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)}</a>`);
    return token;
  });

  let rendered = escapeHtml(withMarkdownLinks).replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
  placeholders.forEach((link, index) => {
    rendered = rendered.replace(`__LINK_${index}__`, link);
  });
  return rendered;
}

els.tripImage.addEventListener("change", (event) => {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    state.imageData = String(reader.result);
    els.coverPreview.src = state.imageData;
    els.coverUploader.classList.add("has-image");
    saveTrip();
  });
  reader.readAsDataURL(file);
});

els.importFile.addEventListener("change", (event) => importFile(event.target.files?.[0]));
els.newTrip.addEventListener("click", createNewTrip);
els.deleteTrip.addEventListener("click", deleteActiveTrip);
els.tripTabs.addEventListener("click", (event) => {
  const button = event.target.closest("[data-trip-tab]");
  if (button) switchTrip(button.dataset.tripTab);
});
els.addItem.addEventListener("click", submitItem);
els.addNoteLink.addEventListener("click", addNoteLink);
els.cancelEdit.addEventListener("click", clearItemForm);
els.itemTitle.addEventListener("keydown", (event) => {
  if (event.key === "Enter") submitItem();
});
[els.itemFromTime, els.itemToTime].forEach((input) => {
  input.addEventListener("input", () => autoFormatCompactTime(input));
  input.addEventListener("change", () => keepMinutePrecision(input));
  input.addEventListener("blur", () => keepMinutePrecision(input));
});
els.itemDaysOptions.addEventListener("change", () => {
  setItemDaySelection(selectedItemDays());
});

els.itemsList.addEventListener("click", (event) => {
  const editButton = event.target.closest("[data-edit]");
  const removeButton = event.target.closest("[data-remove]");
  if (editButton) editItem(editButton.dataset.edit);
  if (removeButton) {
    state.items = state.items.filter((item) => item.id !== removeButton.dataset.remove);
    render();
  }
});

els.itemsList.addEventListener("dragstart", (event) => {
  const item = event.target.closest(".trip-item");
  if (!item || els.sortBy.value !== "manual") return;
  state.draggedId = item.dataset.id;
  item.classList.add("dragging");
  event.dataTransfer.effectAllowed = "move";
});

els.itemsList.addEventListener("dragover", (event) => {
  if (els.sortBy.value !== "manual") return;
  event.preventDefault();
  const item = event.target.closest(".trip-item");
  if (item) item.classList.add("drag-over");
});

els.itemsList.addEventListener("dragleave", (event) => {
  event.target.closest(".trip-item")?.classList.remove("drag-over");
});

els.itemsList.addEventListener("drop", (event) => {
  event.preventDefault();
  const item = event.target.closest(".trip-item");
  document.querySelectorAll(".drag-over").forEach((node) => node.classList.remove("drag-over"));
  if (item) moveItem(state.draggedId, item.dataset.id);
});

els.itemsList.addEventListener("dragend", () => {
  state.draggedId = "";
  document.querySelectorAll(".dragging,.drag-over").forEach((node) => node.classList.remove("dragging", "drag-over"));
});

[els.tripName, els.currency, els.startDate, els.endDate, els.budget, els.notes].forEach((input) => {
  input.addEventListener("input", render);
});

els.addCity.addEventListener("click", addCity);
els.cityInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") addCity();
});
els.cityList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-remove-city]");
  if (button) removeCity(button.dataset.removeCity);
});

[els.filterText, els.filterCategory, els.sortBy].forEach((input) => {
  input.addEventListener("input", render);
});

els.exportPdf.addEventListener("click", exportPdf);
els.exportExcel.addEventListener("click", exportExcel);

setDefaultDates();
loadSavedTrip();
render();
