const storedBlogs = localStorage.getItem('blogs');
const blogs = storedBlogs ? JSON.parse(storedBlogs) : [
    { id: 1, title: "blog1", content: "content1", views: 0 }
];

localStorage.setItem('blogs', JSON.stringify(blogs));

const savedblogs = JSON.parse(localStorage.getItem('blogs'));
const element = document.getElementById('blog-titles');
element.innerHTML = '';

savedblogs.forEach(blog => {
    const blogtitle = document.createElement('div');

    const viewbtn = document.createElement('button');
    viewbtn.type = 'submit';
    viewbtn.id = 'view-btn';
    viewbtn.textContent = 'View Blog';

    viewbtn.addEventListener(
        'click', () => {
            const view_content = document.createElement('span');
            view_content.id = 'view-content';
            view_content.textContent = blog.content;
            blogtitle.textContent = blog.title;
            element.appendChild(blogtitle);
            element.appendChild(view_content);
        }
    );

    blogtitle.textContent = blog.title;
    element.appendChild(blogtitle);
    element.appendChild(viewbtn);
});


const createblog = document.getElementById('create-blog');
const blogform = document.getElementById('blog-form');

createblog.addEventListener('click', () => {
    const new_title = document.getElementById('new-title').value;
    const new_content = document.getElementById('new-content').value;

    const new_blog = { id: blogs.length + 1, title: new_title, content: new_content, views: 0 };
    blogs.push(new_blog);
    localStorage.setItem('blogs', JSON.stringify(blogs));

    const blogtitle = document.createElement('div');
    blogtitle.textContent = new_title;
    element.appendChild(blogtitle);

    document.getElementById('new-title').value = '';
    document.getElementById('new-content').value = '';
});

const deleteblog = document.getElementById('delete-blog');

deleteblog.addEventListener( 'click', () => {
        const delete_title = document.getElementById('delete-title').value;
        const index = blogs.findIndex(blog => blog.title === delete_title);

        if(index !== -1){
            blogs.splice(index, 1);
            localStorage.setItem('blogs', JSON.stringify(blogs));

            element.innerHTML = '';
            blogs.forEach(
                blog => {
                    const blogtitle = document.createElement('div');
                    blogtitle.textContent = blog.title;
                    element.appendChild(blogtitle);
                }
            );

            document.getElementById('deleted-message').textContent = 'Blog deleted successfully';
        }
        else{
            document.getElementById('deleted-message').textContent = 'Blog not found';
        }

        document.getElementById('delete-title').value = '';
    }
);










// const storedBlogs = localStorage.getItem('blogs');
// const blogs = storedBlogs ? JSON.parse(storedBlogs) : [
//     { id: 1, title: "blog1", content: "content1", views: 0 }
// ];

// localStorage.setItem('blogs', JSON.stringify(blogs));

// const savedblogs = JSON.parse(localStorage.getItem('blogs'));
// const element = document.getElementById('blog-titles');
// element.innerHTML = '';

// const displayBlogs = () => {
//     element.innerHTML = '';
//     savedblogs.forEach(blog => {
//         const blogContainer = document.createElement('div');
//         const blogtitle = document.createElement('div');
//         const viewbtn = document.createElement('button');
//         const view_content = document.createElement('div');

//         blogtitle.textContent = `${blog.title} (Views: ${blog.views})`;
//         viewbtn.type = 'button';
//         viewbtn.id = 'view-btn';
//         viewbtn.textContent = 'View Blog';
//         view_content.id = 'view-content';
//         view_content.style.display = 'none';
//         view_content.innerHTML = `<p>${blog.content}</p><p>Views: ${blog.views}</p>`;

//         let isContentVisible = false;

//         viewbtn.addEventListener('click', () => {
//             isContentVisible = !isContentVisible;
//             if (isContentVisible) {
//                 blog.views += 1;
//                 localStorage.setItem('blogs', JSON.stringify(savedblogs));
//                 view_content.style.display = 'block';
//                 view_content.innerHTML = `<p>${blog.content}</p><p>Views: ${blog.views}</p>`;
//             } else {
//                 view_content.style.display = 'none';
//             }
//             displayBlogs(); // Update the views count in the list
//         });

//         blogContainer.appendChild(blogtitle);
//         blogContainer.appendChild(viewbtn);
//         blogContainer.appendChild(view_content);
//         element.appendChild(blogContainer);
//     });
// };

// displayBlogs();

// const createblog = document.getElementById('create-blog');
// createblog.addEventListener('click', () => {
//     const new_title = document.getElementById('new-title').value;
//     const new_content = document.getElementById('new-content').value;

//     const new_blog = { id: blogs.length + 1, title: new_title, content: new_content, views: 0 };
//     blogs.push(new_blog);
//     localStorage.setItem('blogs', JSON.stringify(blogs));

//     displayBlogs();

//     document.getElementById('new-title').value = '';
//     document.getElementById('new-content').value = '';
// });

// const deleteblog = document.getElementById('delete-blog');
// deleteblog.addEventListener('click', () => {
//     const delete_title = document.getElementById('delete-title').value;
//     const index = blogs.findIndex(blog => blog.title === delete_title);

//     if (index !== -1) {
//         blogs.splice(index, 1);
//         localStorage.setItem('blogs', JSON.stringify(blogs));

//         displayBlogs();

//         document.getElementById('deleted-message').textContent = 'Blog deleted successfully';
//     } else {
//         document.getElementById('deleted-message').textContent = 'Blog not found';
//     }

//     document.getElementById('delete-title').value = '';
// });