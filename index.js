class AnimalTable {
  constructor(data, elementId, columns, sortableFields = [], nameStyle = '') {
    this.data = data;
    this.elementId = elementId;
    this.columns = columns;
    this.sortableFields = sortableFields;
    this.nameStyle = nameStyle;
    this.sortDirection = {};
    this.render();
  }

  sortTableData(field) {
    const direction = this.sortDirection[field] === 'asc' ? 'desc' : 'asc';
    this.sortDirection[field] = direction;
    this.data.sort((a, b) => {
      if (a[field] < b[field]) return direction === 'asc' ? -1 : 1;
      if (a[field] > b[field]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    this.render();
  }

  deleteEntry(index) {
    this.data.splice(index, 1);
    this.render();
  }

  editEntry(index, newData) {
    this.data[index] = { ...this.data[index], ...newData };
    this.render();
  }

  render() {
    const container = document.getElementById(this.elementId);
    container.innerHTML = '';
    const table = document.createElement('table');
    table.className = 'table table-bordered';

    // Create Header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    this.columns.forEach(col => {
      const th = document.createElement('th');
      th.textContent = col;
      if (this.sortableFields.includes(col.toLowerCase())) {
        th.classList.add('sortable');
        if (this.sortDirection[col.toLowerCase()] === 'desc') {
          th.classList.add('sort-desc');
        }
        th.addEventListener('click', () => this.sortTableData(col.toLowerCase()));
      }
      headerRow.appendChild(th);
    });
    headerRow.appendChild(document.createElement('th')); // For actions
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create Body
    const tbody = document.createElement('tbody');
    this.data.forEach((animal, index) => {
      const row = document.createElement('tr');
      this.columns.forEach(col => {
        const td = document.createElement('td');
        if (col === 'Name') {
          td.innerHTML = `<span class="${this.nameStyle}">${animal[col.toLowerCase()]}</span>`;
        } else if (col === 'Image') {
          td.innerHTML = `<img src="${animal[col.toLowerCase()]}" alt="${animal.name}" title="${animal.name}" class="animal-image">`;
        } else {
          td.textContent = animal[col.toLowerCase()];
        }
        row.appendChild(td);
      });

      // Add actions
      const actionsTd = document.createElement('td');
      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.className = 'btn btn-warning btn-sm';
      editButton.addEventListener('click', () => this.editEntry(index, { name: prompt('New name:', animal.name) }));

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.className = 'btn btn-danger btn-sm';
      deleteButton.addEventListener('click', () => this.deleteEntry(index));

      actionsTd.appendChild(editButton);
      actionsTd.appendChild(deleteButton);
      row.appendChild(actionsTd);

      tbody.appendChild(row);
    });

    table.appendChild(tbody);
    container.appendChild(table);
  }
}

// Table1
const bigCats = [
  { name: 'Lion', location: 'Africa', size: 'Large', image: 'assets/lion.jpeg' },
  { name: 'Tiger', location: 'Asia', size: 'Large', image: 'assets/tiger.jpeg' },
];

// Table 2
const dogs = [
  { name: 'Labrador', location: 'Global', size: 'Medium', image: 'assets/labrador.jpeg' },
  { name: 'Beagle', location: 'Global', size: 'Small', image: 'assets/beagle.jpeg' },
];

// Table 3
const bigFish = [
  { name: 'Great White Shark', location: 'Oceans', size: 'Very Large', image: 'assets/great_white_shark.jpeg' },
  { name: 'Whale Shark', location: 'Oceans', size: 'Very Large', image: 'assets/whale_shark.jpeg' },
];

// Create tables
new AnimalTable(bigCats, 'big-cats', ['Name', 'Location', 'Size', 'Image'], ['name', 'location', 'size']);
new AnimalTable(dogs, 'dogs', ['Name', 'Location', 'Size', 'Image'], ['name', 'location'], 'font-weight-bold');
new AnimalTable(bigFish, 'big-fish', ['Name', 'Location', 'Size', 'Image'], ['size'], 'font-weight-bold font-italic text-primary');
