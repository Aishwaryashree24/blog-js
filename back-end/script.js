const blogs = [
    { id: 1, title: "blog1", description: "blog1 content", views: 0 },
    { id: 2, title: "blog2", description: "blog2 content", views: 0 },
    { id: 3, title: "blog3", description: "blog3 content", views: 0 }
];

function getcontent(id) {
    const blog = blogs.find(blog => blog.id === id);
    if(blog){
        blog.views+= 1;
        return blog.description;
    }
    return "blog not found";
}

const content = getcontent(2);
console.log(content);