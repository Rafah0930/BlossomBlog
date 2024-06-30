// JavaScript for Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// JavaScript for Dynamic Content Loading
const contentSections = {
    home: document.getElementById('home'),
    about: document.getElementById('about'),
    blog: document.getElementById('blog'),
    contact: document.getElementById('contact'),
    'new-post': document.getElementById('new-post')
};

document.querySelectorAll('.nav-links a, .hero-content a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = e.target.getAttribute('data-page');
        loadPage(page);

        // Toggle active class for links
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
        });
        e.target.classList.add('active');

        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

function loadPage(page) {
    Object.values(contentSections).forEach(section => section.style.display = 'none');
    contentSections[page].style.display = 'block';
    if (page === 'blog') {
        loadBlogPosts();
    }
    if (page === 'new-post') {
        document.getElementById('new-post-form').addEventListener('submit', createPost);
    }
}

// Load blog posts from local storage and sort by timestamp
function loadBlogPosts() {
    const blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];

    // Sort blog posts based on timestamp (assuming 'timestamp' is a property in your blog post objects)
    blogPosts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    const blogPostsContainer = document.getElementById('dynamic-blog-posts');
    blogPostsContainer.innerHTML = '';
    blogPosts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('blog-post');
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
        `;
        blogPostsContainer.appendChild(postElement);
    });
}

// Create a new blog post
function createPost(e) {
    e.preventDefault();
    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;
    
    // Get current timestamp
    const timestamp = new Date().toISOString();

    const blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    blogPosts.push({ title, content, timestamp });
    localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
    alert('Post created successfully!');
    document.getElementById('new-post-form').reset();
    loadPage('blog'); // Redirect to blog page after creating a post
}

// Load the home page initially
loadPage('home');
