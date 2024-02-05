# react-markdown-template







# TODO:
-> modularise test.jsx to 
    -> markdown render
    -> nav bar with theme switch
-> index.jsx
-> login.jsx
-> markdown display
-> generate page depending on markdown file name


# know bugs
- when there are too many code blocks being reloaded, it will cause not enough memory issues. 
- when the theme changes, the markdown gonna re-render and causes the code block to reload
==> possible solution is to try to use stack ==> continuous push result to use sate or so