async function run() {
    // unordered list element for listing all of the teas
    const teaList = document.getElementById("tea-list");
    // since we're a static site, we need to use the github api to find out what files we have access to :(
    const data = await fetch('https://api.github.com/repos/gavrielrh/tea-db/git/trees/main').then(res => res.json());
    const files = Object
        .values(data.tree)
        // We want to only include .json files that aren't the schema.
        .filter(file => file.path?.endsWith('.json') && file.path !== "tea.schema.json");
    for (const file of files) {
        const contents = await fetch(file.path).then(res => res.json());
        // All tea json files should render as list item children of the tea list
        const teaListItem = document.createElement('li');
        const teaLink = document.createElement('a');
        teaLink.href = file.path;
        teaLink.textContent = contents.name;
        teaListItem.appendChild(teaLink);
        teaList.appendChild(teaListItem);
    }
    if (files.length > 0) {
        document.getElementById('tea-list-container').hidden = false;
    }
}

run();