# react-markdown-template
This a customized implementation of markdown renderer utilizing remark plugins, rehype plugins and pyodide in react framework.




# Purpose of this template

I was planning to build my own wiki page that hosts privately. My goal was to have sort of Python code blocks and render the output under the code block. There are several approaches including but not limited to building a HEXO plugin to render the output or building a customized react app that I can have full control of the design.

To extend the idea of rendering markdown files in React which may be useful in some cases in general while no existing template is available for this, this project has been produced.

This project was built on Vite and Reactjs. The page was decorated with Tailwind CSS and Daisyui.

# Live Demo
The under-developing demo is hosted on Google Firebase and can be accessed here [https://siraisinotes-demo.web.app/](https://siraisinotes-demo.web.app/)

- [x] Frontpage [https://siraisinotes-demo.web.app/](https://siraisinotes-demo.web.app/)
- [x] Markdown render samples [https://siraisinotes-demo.web.app/test](https://siraisinotes-demo.web.app/test)
- [x] Page from markdown files [https://siraisinotes-demo.web.app/coding_notes/algorithm_c](https://siraisinotes-demo.web.app/coding_notes/algorithm_c) and [https://siraisinotes-demo.web.app/coding_notes/python](https://siraisinotes-demo.web.app/coding_notes/python)
- [x] Index page for markdown pages [https://siraisinotes-demo.web.app/notes](https://siraisinotes-demo.web.app/notes)


# Supported features

- ✅ Dark theme, Light theme and follow OS theme switch
- ✅ Read markdown files
- ✅ Render markdown (see the render results)
- ✅ Modularise markdown test page into react components
  - ✅ Markdown renderer
  - ✅ Theme switch in the navigation bar
- ✅ Code block execution
  - ✅ Python code block (Pyodide) (OUTPUT ONLY)
  - ✅ CPP code block (OUTPUT ONLY)
- ✅ Generate page depending on markdown file name
- ✅ Index page for listing all markdown files (support sub-directories)
- ✅ General Pages components
  - ✅ Nav_bar
  - ✅ Footer
  - ✅ Markdown page
  - ✅ Frontpage
  - ✅ 404 page

<!-- <br> -->
<!-- - ⚠️  -->
<br>

- 🚧 Implement fuzzy search ([`microfuzz`]("https://github.com/Nozbe/microfuzz"))

- 🚧 Transfer from Javascript to Typescript



<br>

- 💭 Enhance code block render (Render once and add corresponding CSS)
- 💭 Image processing using Sharp js
- 💭 Google log-in and features with log-in users (bookmarks, lock pages access)


## Legend
| ✅ | ⚠️ | 🚧 |💭|
|:---:|:---:|:---:|:---:|
| Done  | Buggy  |  Working on | Brief Idea <br> (Not likely be implemented) |

## Notes
### Markdown file structure

This template aimed to build an automatically constructed wiki-liked react app. To achieve this, the routing was based on file structure within `./src` folder. By default, `react-route-dom` will create routes within `Notes` folder excluding `markdownCheatsheet.md` file.

```md
.
├── Notes
│   ├── coding_notes
│   │   ├── python_tutorials
│   │   │   ├── python ch1
│   │   │   │   └── ch1.md      <- become `<base url>/coding_notes/python_tutorials/python%20ch1/ch1`
│   │   │   ├── python ch2
│   │   │   │   └── ch2.md      <- become `<base url>/coding_notes/python_tutorials/python%20ch2/ch2`
│   │   │   └── python.md       <- become `<base url>/coding_notes/python_tutorials/python`
│   │   └── algorithm_c.md      <- become `<base url>/coding_notes/algorithm_c`
│   └── markdownCheatsheet.md
├── page
├── utils
...
```

The filtering behavior was defined in `App.jsx` file which can be customized.

### CPP code block 
The implementation of CPP worker (`src/utils/cpp_worker`) was adopted from [https://github.com/InfiniteXyy/playcode](https://github.com/InfiniteXyy/playcode).

### Markdown template
In the latest version, markdown YAML heading support has been added. The deading will define the title, date and many attributes that will be rendered. The template of the Markdown files is as follows:

```md
+=+=+=+
title: testing page
date: "2024-02-17 01:31:48"
exeCPP: false
exePYTHON: false
abstract: "This is the abstract of this individual post."
+=+=+=+

# Contents


# title

other texts
other text
```


### Similar projects
#### - [rdoc](https://github.com/jaywcjlove/rdoc)
rdoc is a project aimed at producing blog pages from mardown which is similar to this project. However, rdoc stopped updating for 5 years. In contrast, this project is currently under maintenance and built based on the most recent packages (including React and Pyodide).


# Render results

<details>
  <summary>Contents (table of content)</summary>
    <img src="./README_img/contents.png" width="100%"/>
</details>

<details>
  <summary>Github style collapse</summary>
    <img src="./README_img/githubstyle%20collapse.png" width="100%"/>
</details>

<details>
  <summary>Long text render sample</summary>
      <img src="./README_img/long%20text%20render.png" width="100%"/>
</details>

<details>
  <summary>Horizonal rules</summary>
      <img src="./README_img/horizontal%20rules.png" width="100%"/>
</details>

<details>
  <summary>Emphasis</summary>
      <img src="./README_img/emphasis.png" width="100%"/>
</details>

<details>
  <summary>Blockquotes</summary>
      <img src="./README_img/blockquotes.png" width="100%"/>
</details>

<details>
  <summary>Lists</summary>
      <img src="./README_img/lists.png" width="100%"/>
</details>

<details>
  <summary>Code blocks</summary>
      <img src="./README_img/code.png" width="100%"/>
</details>

<details>
  <summary>Tables</summary>
      <img src="./README_img/table.png" width="100%"/>
</details>

<details>
  <summary>Links</summary>
      <img src="./README_img/links.png" width="100%"/>
</details>

<details>
  <summary>Images</summary>
      <img src="./README_img/images.png" width="100%"/>
</details>

<details>
  <summary>Plugins (emojies, emphasis, subscript and superscript, ins and mark)</summary>
      <img src="./README_img/plugin-emojies-emphasis-sub_sup-ins-mark.png" width="100%"/>
</details>

<details>
  <summary>Footnotes</summary>
      <img src="./README_img/footnotes.png" width="100%"/>
</details>

<details>
  <summary>Definition lists</summary>
      <img src="./README_img/definition%20lists.png" width="100%"/>
</details>

<details>
  <summary>Custom containers</summary>
    <img src="./README_img/container1.png" width="100%"/>
    <img src="./README_img/container2.png" width="100%"/>
</details>

<details>
  <summary>Python wrap</summary>
      <img src="./README_img/python%20wrap.png" width="100%"/>
</details>

<!-- <details>
  <summary>Python Pyodide</summary>
      <img src="./README_img/ .png" width="100%"/>
</details> -->

<details>
  <summary>Mermaid</summary>
      <img src="./README_img/mermaid1.png" width="100%"/>
      <img src="./README_img/mermaid2.png" width="100%"/>
</details>
<details>
  <summary>GitHub flavored markdown (GFM) and HTML</summary>
      <img src="./README_img/GFM%20and%20inline%20html.png" width="100%"/>
</details>


# Usage
## Build local server

```sh
git clone https://github.com/siraisisatoru/react-markdown-template.git
cd react-markdown-template
npm i
npm run dev
```
Access the demo via link [http://localhost:5173/test](http://localhost:5173/test)


## Deploy to Firebase

```sh
firebase login
npm install -g firebase-tools
firebase init
>? Which Firebase features do you want to set up for this directory? Press Space to select
features, then Enter to confirm your choices. Hosting: Configure files for Firebase Hosting and
(optionally) set up GitHub Action deploys
>? Please select an option: Use an existing project
>? Select a default Firebase project for this directory: <YOUR PROJECT> (<YOUR PROJECT>)
>? What do you want to use as your public directory? dist
>? Configure as a single-page app (rewrite all urls to /index.html)? No
>? Set up automatic builds and deploys with GitHub? No
>? File dist/index.html already exists. Overwrite? No
```


# Contributing

Any new ideas want to add to the project are welcome. Please submit a pull request or open up an issue and we can discuss further.

# License

This project is licensed under the MIT License.
