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
    backbtn.style.display = 'none';

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

    viewbtn.addEventListener('click', () => {
        blog.views += 1;
        blogtitle.textContent = `${blog.title} (Views: ${blog.views})`; 
        localStorage.setItem('blogs', JSON.stringify(savedblogs)); 

        view_content.style.display = 'block';
        viewbtn.style.display = 'none';
        backbtn.style.display = 'inline'; 
    });

    backbtn.addEventListener('click', () => {
        view_content.style.display = 'none';
        viewbtn.style.display = 'inline';
        backbtn.style.display = 'none';
    });

    delete_blog.addEventListener('click', () => {
        const indexToDelete = savedblogs.findIndex(b => b.id === blog.id);
    
        if (indexToDelete !== -1) {
            savedblogs.splice(indexToDelete, 1);
            localStorage.setItem('blogs', JSON.stringify(savedblogs));
    
            blogContainer.remove();
        }
    });
    

    update_blog.addEventListener('click', () => {
        updateSection.style.display = 'block'; 
    });

    saveUpdateBtn.addEventListener('click', () => {
        blog.title = updateTitleInput.value.trim();
        blog.content = updateContentInput.value.trim();

        localStorage.setItem('blogs', JSON.stringify(savedblogs));

        blogtitle.textContent = `${blog.title} (Views: ${blog.views})`;
        view_content.textContent = blog.content;
        updateSection.style.display = 'none';
    });

    cancelUpdateBtn.addEventListener('click', () => {
        updateSection.style.display = 'none';
    });

    blogContainer.appendChild(blogtitle);
    blogContainer.appendChild(viewbtn);
    blogContainer.appendChild(backbtn);
    blogContainer.appendChild(update_blog);
    blogContainer.appendChild(delete_blog);
    blogContainer.appendChild(view_content);
    blogContainer.appendChild(updateSection);

    element.appendChild(blogContainer);
});


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

    location.reload();
});
