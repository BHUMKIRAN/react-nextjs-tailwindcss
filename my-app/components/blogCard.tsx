const blogs = [
  {
    "id": 1,
    "title": "The Future of AI in Web Development",
    "description": "Explore how AI tools are transforming frontend and backend development, and what it means for developers.",
    "image": "https://images.unsplash.com/photo-1581090700227-1a0d8f1ff4ea?auto=format&fit=crop&w=800&q=80",
    "postedDate": "2026-02-20",
    "postedBy": {
      "name": "Alice Johnson",
      "photo": "https://randomuser.me/api/portraits/women/68.jpg"
    }
  },
  {
    "id": 2,
    "title": "10 Tips for Responsive Design",
    "description": "Learn practical techniques for making your websites responsive across all devices, from mobile to desktop.",
    "image": "https://images.unsplash.com/photo-1508385082359-f9a0d7aa6f5e?auto=format&fit=crop&w=800&q=80",
    "postedDate": "2026-02-18",
    "postedBy": {
      "name": "Mark Williams",
      "photo": "https://randomuser.me/api/portraits/men/45.jpg"
    }
  },
  {
    "id": 3,
    "title": "Understanding React Context",
    "description": "A comprehensive guide to React Context API, showing how to pass data deeply and manage global state.",
    "image": "https://images.unsplash.com/photo-1581091215365-6f54b55dcddc?auto=format&fit=crop&w=800&q=80",
    "postedDate": "2026-02-15",
    "postedBy": {
      "name": "Samantha Lee",
      "photo": "https://randomuser.me/api/portraits/women/44.jpg"
    }
  },
  {
    "id": 4,
    "title": "Tailwind CSS Advanced Techniques",
    "description": "Discover advanced Tailwind CSS setups, custom configuration, and tips for building scalable designs.",
    "image": "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?auto=format&fit=crop&w=800&q=80",
    "postedDate": "2026-02-12",
    "postedBy": {
      "name": "John Smith",
      "photo": "https://randomuser.me/api/portraits/men/22.jpg"
    }
  },
  {
    "id": 5,
    "title": "Effective UI/UX for Landing Pages",
    "description": "Learn how to design landing pages that convert, using best UI/UX practices for modern web apps.",
    "image": "https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=800&q=80",
    "postedDate": "2026-02-10",
    "postedBy": {
      "name": "Emma Watson",
      "photo": "https://randomuser.me/api/portraits/women/30.jpg"
    }
  }
]

const cards = () =>{

    return(
        <div className="flex flex-col justify-center items-center gap-4">
      {blogs.map((blog) => (
        <div key={blog.id} className="bg-white rounded-lg shadow-md p-4">
          <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover mb-4" />
          <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
          <p className="text-gray-600 mb-2">{blog.description}</p>
          <div className="flex items-center">
            <img src={blog.postedBy.photo} alt={blog.postedBy.name} className="w-8 h-8 rounded-full mr-2" />
            <span className="text-gray-600">{blog.postedBy.name}</span>
          </div>
        </div>
      ))}
    </div>
    )
}

export default cards