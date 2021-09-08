const author = document.getElementById("author")

fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=sports")
    .then(response => response.json())
    .then(data => {
        // console.log(data.urls.regular)
        document.body.style.backgroundImage = `url(${data.urls.regular})`
		author.textContent = `By: ${data.user.name}`
    })
    .catch(error => {
        // default background image and author
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1540848893531-5eece9a5fa64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MzEwNjUxNjg&ixlib=rb-1.2.1&q=80&w=1080)`
        
        author.textContent = 'Photo by: Marcel Schreiber'
    })