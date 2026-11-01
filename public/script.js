
const API = {
    designs: '/api/cake-designs',
    flavors: '/api/flavors',
    sizes: '/api/sizes'
};

async function request(url, options = {}) {
    const response = await fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers
        }
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || data.message || 'Request failed');
    }

    return data;
}

function showError(error) {
    alert(error.message);
}

// ==============================
// LOAD ALL RECORDS
// ==============================

async function loadData() {
    try {
        const [designs, flavors, sizes] = await Promise.all([
            request(API.designs),
            request(API.flavors),
            request(API.sizes)
        ]);

        document.getElementById('designCount').textContent = designs.length;
        document.getElementById('flavorCount').textContent = flavors.length;
        document.getElementById('sizeCount').textContent = sizes.length;

        // Cake Designs
        displayRecords(
            'designList',
            designs,
            'design_id',
            item => [
                `Color: ${item.color || 'N/A'}`,
                `Pattern: ${item.pattern || 'N/A'}`,
                `Texture: ${item.texture || 'N/A'}`,
                `Shape: ${item.shape || 'N/A'}`,
                `Icing Type: ${item.icing_type || 'N/A'}`,
                `Base Price: ₱${item.base_price}`
            ],
            editDesign,
            deleteDesign,
            true
        );

        // Flavors
        displayRecords(
            'flavorList',
            flavors,
            'flavor_id',
            item => [`Additional Price: ₱${item.price_add}`],
            editFlavor,
            deleteFlavor,
            true
        );

        // Sizes
        displayRecords(
            'sizeList',
            sizes,
            'size_id',
            item => [`Price: ₱${item.price}`],
            editSize,
            deleteSize
        );

    } catch (error) {
        showError(error);
    }
}

// ==============================
// DISPLAY RECORDS
// ==============================

function displayRecords(
    containerId,
    records,
    idField,
    getDetails,
    edit,
    remove,
    showImage = false
) {
    const container = document.getElementById(containerId);
    container.replaceChildren();

    records.forEach(item => {
        const card = document.createElement('div');
        card.className = 'product-card';

        // Product Image
        if (showImage) {
            const imageContainer = document.createElement('div');
            imageContainer.className = 'product-image';

            if (item.image) {
                const img = document.createElement('img');
                img.src = `/images/${item.image}`;
                img.alt = item.name;

                img.onerror = () => {
                    img.style.display = 'none';
                };

                imageContainer.appendChild(img);
            }

            const badge = document.createElement('span');
            badge.className = 'new-badge';
            badge.textContent = 'New!';

            imageContainer.appendChild(badge);
            card.appendChild(imageContainer);
        }

        // Product Information
        const info = document.createElement('div');
        info.className = 'product-info';

        const name = document.createElement('h3');
        name.textContent = item.name;

        const details = document.createElement('div');
        details.className = 'product-details';

        getDetails(item).forEach(detail => {
            const line = document.createElement('p');
            line.textContent = detail;
            details.appendChild(line);
        });

        // Edit and Delete Buttons
        const actions = document.createElement('div');
        actions.className = 'actions';

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => edit(item));

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete';
        deleteButton.addEventListener('click', () => remove(item[idField]));

        actions.append(editButton, deleteButton);

        info.append(name, details, actions);
        card.appendChild(info);

        container.appendChild(card);
    });
}

// ==============================
// CAKE DESIGN MANAGEMENT
// ==============================

document.getElementById('designForm').addEventListener('submit', async event => {
    event.preventDefault();

    const id = document.getElementById('designId').value;

    const data = {
        name: document.getElementById('designName').value.trim(),
        image: document.getElementById('designImage').value.trim(),

        color: document.getElementById('designColor').value,
        pattern: document.getElementById('designPattern').value,
        texture: document.getElementById('designTexture').value,
        shape: document.getElementById('designShape').value,
        icing_type: document.getElementById('designIcingType').value,

        base_price: Number(document.getElementById('designPrice').value),
        category_id: null
    };

    try {
        await request(id ? `${API.designs}/${id}` : API.designs, {
            method: id ? 'PUT' : 'POST',
            body: JSON.stringify(data)
        });

        event.target.reset();
        document.getElementById('designId').value = '';

        await loadData();

        alert(id ? 'Cake design updated successfully!' : 'Cake design added successfully!');

    } catch (error) {
        showError(error);
    }
});

// Edit Cake Design
function editDesign(item) {
    document.getElementById('designId').value = item.design_id;
    document.getElementById('designName').value = item.name;
    document.getElementById('designImage').value = item.image || '';

    document.getElementById('designColor').value = item.color || '';
    document.getElementById('designPattern').value = item.pattern || '';
    document.getElementById('designTexture').value = item.texture || '';
    document.getElementById('designShape').value = item.shape || '';
    document.getElementById('designIcingType').value = item.icing_type || '';

    document.getElementById('designPrice').value = item.base_price;

    document.getElementById('designs').scrollIntoView({
        behavior: 'smooth'
    });
}

// Delete Cake Design
async function deleteDesign(id) {
    if (!confirm('Delete this cake design?')) return;

    try {
        await request(`${API.designs}/${id}`, {
            method: 'DELETE'
        });

        await loadData();

        alert('Cake design deleted successfully!');

    } catch (error) {
        showError(error);
    }
}

// ==============================
// FLAVOR MANAGEMENT
// ==============================

document.getElementById('flavorForm').addEventListener('submit', async event => {
    event.preventDefault();

    const id = document.getElementById('flavorId').value;

    const data = {
        name: document.getElementById('flavorName').value,
        price_add: Number(document.getElementById('flavorPrice').value),
        image: document.getElementById('flavorImage').value.trim()
    };

    try {
        await request(id ? `${API.flavors}/${id}` : API.flavors, {
            method: id ? 'PUT' : 'POST',
            body: JSON.stringify(data)
        });

        event.target.reset();
        document.getElementById('flavorId').value = '';

        await loadData();

        alert(id ? 'Flavor updated successfully!' : 'Flavor added successfully!');

    } catch (error) {
        showError(error);
    }
});

// Edit Flavor
function editFlavor(item) {
    document.getElementById('flavorId').value = item.flavor_id;
    document.getElementById('flavorName').value = item.name;
    document.getElementById('flavorPrice').value = item.price_add;
    document.getElementById('flavorImage').value = item.image || '';

    document.getElementById('flavors').scrollIntoView({
        behavior: 'smooth'
    });
}

// Delete Flavor
async function deleteFlavor(id) {
    if (!confirm('Delete this flavor?')) return;

    try {
        await request(`${API.flavors}/${id}`, {
            method: 'DELETE'
        });

        await loadData();

        alert('Flavor deleted successfully!');

    } catch (error) {
        showError(error);
    }
}

// ==============================
// SIZE MANAGEMENT
// ==============================

document.getElementById('sizeForm').addEventListener('submit', async event => {
    event.preventDefault();

    const id = document.getElementById('sizeId').value;

    const data = {
        name: document.getElementById('sizeName').value,
        price: Number(document.getElementById('sizePrice').value)
    };

    try {
        await request(id ? `${API.sizes}/${id}` : API.sizes, {
            method: id ? 'PUT' : 'POST',
            body: JSON.stringify(data)
        });

        event.target.reset();
        document.getElementById('sizeId').value = '';

        await loadData();

        alert(id ? 'Cake size updated successfully!' : 'Cake size added successfully!');

    } catch (error) {
        showError(error);
    }
});

// Edit Size
function editSize(item) {
    document.getElementById('sizeId').value = item.size_id;
    document.getElementById('sizeName').value = item.name;
    document.getElementById('sizePrice').value = item.price;

    document.getElementById('sizes').scrollIntoView({
        behavior: 'smooth'
    });
}

// Delete Size
async function deleteSize(id) {
    if (!confirm('Delete this cake size?')) return;

    try {
        await request(`${API.sizes}/${id}`, {
            method: 'DELETE'
        });

        await loadData();

        alert('Cake size deleted successfully!');

    } catch (error) {
        showError(error);
    }
}

// ==============================
// START APPLICATION
// ==============================

loadData();
