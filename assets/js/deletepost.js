async function deletePost(index) {
    await fetch(`http://localhost:5000/blog/${index}`, {
        method: "DELETE"
    })
}
