// const blogs = [
//     { id: 1, title: "blog1", description: "blog1 content", views: 0 },
//     { id: 2, title: "blog2", description: "blog2 content", views: 0 },
//     { id: 3, title: "blog3", description: "blog3 content", views: 0 }
// ];

// //get content of the blog and increase the view count
// function getcontent(id) {
//     const blog = blogs.find(blog => blog.id === id);
//     if(blog){
//         blog.views+= 1;
//         return blog.description;
//     }
//     return "blog not found";
// }

// const content = getcontent(2);
// console.log(content);

// //get all blog titles in array
// function getBlogTitles() {
//     const titles = [];
//     blogs.forEach(blog => {
//         titles.push(blog.title);
//     });
//     return titles;
// }

// const blogTitles = getBlogTitles();
// console.log(blogTitles);

// //add a new blog
// blogs.push({ id: 2, title: "title2", description: "content2", views: 0 });

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
    blogtitle.textContent = blog.title;
    element.appendChild(blogtitle);
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