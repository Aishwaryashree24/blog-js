const storedBlogs = localStorage.getItem('blogs');
const blogs = storedBlogs ? JSON.parse(storedBlogs) : [
    { id: 1, title: "blog1", content: "content1", views: 0 }
];

localStorage.setItem('blogs', JSON.stringify(blogs));

const savedblogs = JSON.parse(localStorage.getItem('blogs'));
const element = document.getElementById('blog-titles');
element.innerHTML = '';

savedblogs.forEach((blog, index) => {
    const blogContainer = document.createElement('div');
    blogContainer.style.marginBottom = "10px";

    const blogtitle = document.createElement('div');
    blogtitle.style.fontWeight = "bold";
    blogtitle.textContent = `${blog.title} (Views: ${blog.views})`;

    const viewbtn = document.createElement('button');
    viewbtn.textContent = 'View Blog';
    viewbtn.style.margin = "5px";

    const backbtn = document.createElement('button');
    backbtn.textContent = 'Back';
    backbtn.style.display = 'none'; // Initially hidden

    const delete_blog = document.createElement('button');
    delete_blog.textContent = 'Delete Blog';
    delete_blog.style.margin = "5px";
    delete_blog.style.backgroundColor = "red";
    delete_blog.style.color = "white";
    delete_blog.style.border = "none";
    delete_blog.style.padding = "5px";

    const update_blog = document.createElement('button');
    update_blog.textContent = 'Update Blog';
    update_blog.style.margin = "5px";
    update_blog.style.backgroundColor = "blue";
    update_blog.style.color = "white";
    update_blog.style.border = "none";
    update_blog.style.padding = "5px";

    // Create update section (initially hidden)
    const updateSection = document.createElement('div');
    updateSection.style.display = 'none';
    updateSection.style.marginTop = '5px';
    updateSection.style.padding = '5px';
    updateSection.style.border = '1px solid gray';
    updateSection.style.backgroundColor = '#f0f0f0';

    const updateTitleInput = document.createElement('input');
    updateTitleInput.type = 'text';
    updateTitleInput.value = blog.title;
    updateTitleInput.style.display = 'block';
    updateTitleInput.style.marginBottom = '5px';

    const updateContentInput = document.createElement('textarea');
    updateContentInput.value = blog.content;
    updateContentInput.rows = 3;
    updateContentInput.style.display = 'block';
    updateContentInput.style.marginBottom = '5px';

    const saveUpdateBtn = document.createElement('button');
    saveUpdateBtn.textContent = 'Save';
    saveUpdateBtn.style.marginRight = '5px';

    const cancelUpdateBtn = document.createElement('button');
    cancelUpdateBtn.textContent = 'Cancel';

    // Append inputs and buttons to update section
    updateSection.appendChild(updateTitleInput);
    updateSection.appendChild(updateContentInput);
    updateSection.appendChild(saveUpdateBtn);
    updateSection.appendChild(cancelUpdateBtn);

    const view_content = document.createElement('div');
    view_content.style.display = 'none';
    view_content.style.marginTop = '5px';
    view_content.style.padding = '5px';
    view_content.style.border = '1px solid gray';
    view_content.style.backgroundColor = '#f9f9f9';
    view_content.textContent = blog.content;

    // Click event for View button
    viewbtn.addEventListener('click', () => {
        blog.views += 1; // Increment view count
        blogtitle.textContent = `${blog.title} (Views: ${blog.views})`; // Update UI dynamically
        localStorage.setItem('blogs', JSON.stringify(savedblogs)); // Save updated views

        view_content.style.display = 'block';
        viewbtn.style.display = 'none';
        backbtn.style.display = 'inline'; // Show back button
    });

    // Click event for Back button
    backbtn.addEventListener('click', () => {
        view_content.style.display = 'none';
        viewbtn.style.display = 'inline';
        backbtn.style.display = 'none';
    });

    // Click event for Delete Blog button
    delete_blog.addEventListener('click', () => {
        const updatedBlogs = savedblogs.filter(b => b.id !== blog.id);
        localStorage.setItem('blogs', JSON.stringify(updatedBlogs));

        element.removeChild(blogContainer); // Remove from UI without refreshing
    });

    // Click event for Update Blog button
    update_blog.addEventListener('click', () => {
        updateSection.style.display = 'block'; // Show the update section
    });

    // Click event for Save Update button
    saveUpdateBtn.addEventListener('click', () => {
        blog.title = updateTitleInput.value.trim();
        blog.content = updateContentInput.value.trim();

        localStorage.setItem('blogs', JSON.stringify(savedblogs));

        blogtitle.textContent = `${blog.title} (Views: ${blog.views})`; // Update title in UI
        view_content.textContent = blog.content; // Update content in UI
        updateSection.style.display = 'none'; // Hide update section after saving
    });

    // Click event for Cancel Update button
    cancelUpdateBtn.addEventListener('click', () => {
        updateSection.style.display = 'none'; // Hide update section
    });

    blogContainer.appendChild(blogtitle);
    blogContainer.appendChild(viewbtn);
    blogContainer.appendChild(backbtn);
    blogContainer.appendChild(update_blog);
    blogContainer.appendChild(delete_blog);
    blogContainer.appendChild(view_content);
    blogContainer.appendChild(updateSection); // Add the update section

    element.appendChild(blogContainer);
});

// Create new blog functionality
document.getElementById('create-blog').addEventListener('click', () => {
    const new_title = document.getElementById('new-title').value.trim();
    const new_content = document.getElementById('new-content').value.trim();

    if (!new_title || !new_content) {
        alert("Please enter both title and content.");
        return;
    }

    const new_blog = { id: blogs.length + 1, title: new_title, content: new_content, views: 0 };
    blogs.push(new_blog);
    localStorage.setItem('blogs', JSON.stringify(blogs));

    location.reload(); // Refresh page to show new blog
});
