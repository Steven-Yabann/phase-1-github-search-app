document.addEventListener('DOMContentLoaded', () => {
    let form = document.getElementById('github-form')
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        let input = (e.target.search.value)
        fetch(`https://api.github.com/search/users?q=${input}`)
        .then((res) => res.json())
        .then((data) => {
            //console.log(data)
            let items= data.items
            //console.log(items)
            items.forEach(item => {
                let loginNames = item.login
                //console.log(loginNames)
                let usersUl = document.getElementById('user-list')
                let usersLi = document.createElement('li')
                usersLi.textContent= `${loginNames}`
                usersUl.appendChild(usersLi)

                usersLi.addEventListener('click',() => {
                    fetch(`https://api.github.com/users/${loginNames}/repos`)
                    .then((res) => res.json())
                    .then((repos) => {
                        //console.log(repos)
                        repos.forEach((repo) => {
                           // console.log(repo.name)
                            let repoUl = document.getElementById('repos-list')
                            let repoLi = document.createElement('li')
                            repoLi.className = 'repoList'
                            repoLi.textContent = `${repo.name}`
                            repoUl.appendChild(repoLi)
                            
                        })
                    })
                })
            });
        })})
})