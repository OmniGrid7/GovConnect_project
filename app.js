const DATA_URL = './data/maharashtra_government_websites_igod.json';
const state = { records: [], category: 'All', department: 'All', query: '' };

const el = (selector) => document.querySelector(selector);
const widgets = el('#category-widgets');
const grid = el('#results-grid');
const filters = el('#department-filters');
const queryInput = el('#directory-query');
const globalInput = el('#global-search');

function normalise(value) {
  return String(value || '').toLocaleLowerCase();
}

function matches(record) {
  const q = normalise(state.query);
  const inCategory = state.category === 'All' || record.category === state.category;
  const inDepartment = state.department === 'All' || record.department === state.department;
  const searchText = normalise([record.name, record.department, record.description, record.category].join(' '));
  return inCategory && inDepartment && (!q || searchText.includes(q));
}

function getCategories() {
  return [...new Set(state.records.map((record) => record.category))].sort();
}

function categoryCount(category) {
  return state.records.filter((record) => record.category === category).length;
}

function setCategory(category, scroll = true) {
  state.category = category;
  state.department = 'All';
  history.replaceState(null, '', category === 'All' ? '#directory' : `#category=${encodeURIComponent(category)}`);
  render();
  if (scroll) el('#scheme-results').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function makeButton(label, className, handler, pressed = false) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = className;
  button.textContent = label;
  button.setAttribute('aria-pressed', String(pressed));
  button.addEventListener('click', handler);
  return button;
}

function renderWidgets() {
  widgets.replaceChildren();
  getCategories().forEach((category) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'category-widget';
    button.setAttribute('aria-pressed', String(state.category === category));
    const number = document.createElement('strong');
    number.textContent = categoryCount(category);
    const title = document.createElement('span');
    title.textContent = category;
    const detail = document.createElement('small');
    detail.textContent = 'View directory';
    button.append(number, title, detail);
    button.addEventListener('click', () => setCategory(category));
    widgets.append(button);
  });
}

function renderDepartmentFilters(records) {
  filters.replaceChildren();
  const departments = [...new Set(records.map((record) => record.department).filter(Boolean))].sort();
  if (departments.length < 2) return;
  filters.append(makeButton('All departments', 'filter-chip', () => { state.department = 'All'; render(); }, state.department === 'All'));
  departments.slice(0, 12).forEach((department) => {
    filters.append(makeButton(department, 'filter-chip', () => { state.department = department; render(); }, state.department === department));
  });
}

function makeCard(record) {
  const card = document.createElement(record.url ? 'a' : 'article');
  card.className = 'portal-card';
  if (record.url) {
    card.href = record.url;
    card.target = '_blank';
    card.rel = 'noreferrer';
    card.setAttribute('aria-label', `Open ${record.name} in a new tab`);
  }
  const meta = document.createElement('span');
  meta.className = 'card-category';
  meta.textContent = record.category;
  const title = document.createElement('h3');
  title.textContent = record.name;
  const description = document.createElement('p');
  description.textContent = record.description || 'Government portal information is available through this directory entry.';
  const footer = document.createElement('footer');
  const department = document.createElement('span');
  department.textContent = record.department || 'Government of Maharashtra';
  const action = document.createElement('span');
  action.textContent = record.url ? 'Visit portal ↗' : 'Link unavailable';
  footer.append(department, action);
  card.append(meta, title, description, footer);
  return card;
}

function renderResults() {
  const categoryRecords = state.records.filter((record) => state.category === 'All' || record.category === state.category);
  const results = state.records.filter(matches);
  const title = state.category === 'All' ? 'All government services' : state.category;
  el('#results-title').textContent = title;
  el('#result-kicker').textContent = state.query ? `SEARCH RESULTS${state.category !== 'All' ? ` · ${state.category}` : ''}` : 'DIRECTORY RESULTS';
  el('#results-count').textContent = `${results.length} ${results.length === 1 ? 'record' : 'records'} found${state.query ? ` for “${state.query}”` : ''}.`;
  el('#back-to-categories').hidden = state.category === 'All' && !state.query;
  renderDepartmentFilters(categoryRecords);
  grid.replaceChildren();
  if (!results.length) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.innerHTML = '<strong>No matching records found.</strong><span>Try another search term or clear the selected filters.</span>';
    grid.append(empty);
    return;
  }
  results.forEach((record) => grid.append(makeCard(record)));
}

function render() { renderWidgets(); renderResults(); }

function updateQuery(value, scroll = false) {
  state.query = value.trim();
  state.department = 'All';
  queryInput.value = state.query;
  globalInput.value = state.query;
  render();
  if (scroll && state.query) el('#scheme-results').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function schemeCategory() {
  return getCategories().find((category) => category.includes('Scheme'));
}

async function initialise() {
  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) throw new Error('Unable to load the directory data.');
    const dataset = await response.json();
    state.records = Array.isArray(dataset.records) ? dataset.records : [];
    el('#dataset-summary').textContent = `${state.records.length} verified directory records from ${dataset.source}. Last verified ${dataset.last_verified}.`;
    const hash = decodeURIComponent(location.hash.replace('#category=', ''));
    if (hash && getCategories().includes(hash)) state.category = hash;
    render();
    const schemes = schemeCategory();
    document.querySelector('.browse-schemes').addEventListener('click', (event) => { event.preventDefault(); setCategory(schemes); });
    document.querySelectorAll('.scheme').forEach((link) => link.addEventListener('click', (event) => { event.preventDefault(); setCategory(schemes); }));
  } catch (error) {
    el('#dataset-summary').textContent = 'The directory data could not be loaded. Please run this project from a local web server.';
    grid.textContent = error.message;
  }
}

queryInput.addEventListener('input', (event) => updateQuery(event.target.value));
globalInput.addEventListener('input', (event) => updateQuery(event.target.value, true));
el('#site-search').addEventListener('submit', (event) => { event.preventDefault(); updateQuery(globalInput.value, true); });
el('#clear-search').addEventListener('click', () => updateQuery(''));
el('#back-to-categories').addEventListener('click', () => { state.category = 'All'; state.department = 'All'; state.query = ''; history.replaceState(null, '', '#directory'); updateQuery(''); });

initialise();
