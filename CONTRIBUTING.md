# Contributing to http-script

Hello! 🎉  
First of all, thank you so much for your interest in contributing to this project! Your help is greatly appreciated and essential for its growth and improvement.

## Best Practices

Before you start contributing, please read and follow these guidelines. They ensure that everyone collaborates harmoniously and efficiently.

### 1. Be Empathetic and Collaborate with Kindness 💬
Respect all contributors. Discussions are always welcome, but they should remain respectful. Every question is valid, and we are all here to learn together!

### 2. Fork, Clone, and Pull Request 🛠️
- Fork the project to your repository.
- Clone the project to your local machine.
- Create a new branch for your changes. Name it descriptively, like `fix-bug-x` or `add-new-feature-y`.
- Once development is complete, open a Pull Request (PR) with a clear description of what was changed and why.

### 3. Write Automated Tests 🧪
If you're fixing a bug or adding a new feature, please write tests. This ensures that there are no regressions in the future and helps understand the expected behavior of the code.

### 4. Build and Test Structure 🛠️
- The build process uses [Babel](https://babeljs.io/) with the command `npm run build`. The output is generated in the `dist` folder to ensure compatibility with the jsDelivr CDN. A specific script adjusts the files as needed.
  
- The test system uses Node.js’s native [`assert`](https://nodejs.org/api/assert.html) module. This choice was made to avoid unnecessary external dependencies and keep the project simple and efficient. While there are alternative testing libraries such as Jest or Mocha, the simplicity and robustness of `assert` meet the project's needs without adding complexity or overhead to the development process.

### 5. Conventional Commits ✅
This project follows the [Conventional Commits](https://www.conventionalcommits.org/) standard. This helps maintain a clear and organized commit history. To facilitate this, when you run `npm install`, git hooks are automatically set up using [husky](https://www.npmjs.com/package/husky) to ensure commit messages follow the correct format.

#### Example of a conventional commit:
```
feat: add support for new configurations in module X
fix: fix bug in module Y
```

### 6. Node.js and Browser Compatibility 🌍
This project supports both Node.js and browsers. When adding new features or fixing bugs, make sure to test in both environments. If you need help with this, feel free to open an issue or discuss it in a PR.

### 7. ESLint and Code Quality 🧹
We use ESLint to ensure code quality and consistency.
To run use: `npm run lint`

- If you need to ignore a specific variable or line of code, you can use ESLint comments:
  - **Ignore a specific line:** `// eslint-disable-next-line no-unused-vars`
  - **Ignore a block of code:** 
    ```js
    /* eslint-disable no-unused-vars */
    const unusedVariable = 'This variable is not used';
    /* eslint-enable no-unused-vars */
    ```
  - **Ignore the entire file:** `/* eslint-disable no-unused-vars */` at the beginning of the file.

### 8. Documentation 📚
Keep the documentation up to date. If you add a new feature or change the behavior of an existing one, make sure to update the README or create dedicated documentation, if necessary.

### 9. Feedback and Review 🧐
All PRs will go through a review to ensure we're maintaining consistent quality standards. Don't worry, constructive feedback is a normal part of the process! If any adjustments are needed, I'll be available to help.

## How Can I Start? 🚀

1. Look for issues labeled [`good first issue`](https://github.com/brunodavi/http-script/issues?q=is%3Aissue+is%3Aopen+label%3A"good+first+issue") or [`help wanted`](https://github.com/brunodavi/http-script/issues?q=is%3Aissue+is%3Aopen+label%3A"help+wanted").
2. Feel free to ask questions or start a discussion.
3. Fork the project, start coding, and send a PR!

Thank you once again for your interest in being part of the development of this project. Every contribution, no matter how small, makes a huge difference! 💙

Let's build together! If you have any questions or suggestions, feel free to open an issue or get in touch.
