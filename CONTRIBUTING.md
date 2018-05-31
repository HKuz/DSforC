
# How to Contribute

Thanks for your interest to contribute to this repository! Please read through the following instructions to get a local version of this project set up on your machine and to navigate the pull request (PR) process.

## Software Overview and Prerequisites

- This project uses the version control software Git to track changes - make sure to download a version of it from the [Git website](https://git-scm.com/). Check out the [Pro Git book](https://git-scm.com/book/en/v2) for a Git tutorial
- README.md files are plain text files formatted using standard Markdown syntax. There's a quick tutorial at [commonmark.org](http://commonmark.org/help/tutorial/) for the uninitiated
- Interactive code summaries use [Jupyter Notebooks](https://jupyter.org/)

## Steps to Contribute

1. Fork this project (see the button in the upper right corner). This will automatically create a copy of this project in your GitHub account
2. In your forked project, click the green "Clone or download" button, then click the "Copy to clipboard" icon next to the link
3. Open a command prompt window and run the following command to copy the project folder to your local machine:

```bash
git clone https://github.com/YOUR-GITHUB-USERNAME/DataScienceforConservation.git
```

4. Add a remote upstream so Git knows where the original parent repository is located with the following command:

```bash
git remote add upstream https://github.com/HKuz/DataScienceforConservation.git
```

5. Create a new branch for your work with the command `git checkout -b NEW-BRANCH-NAME`. Try to name your branch in a way that describes your changes, like `fix/addXyzChartLabels`
6. Make your changes, commit them locally (`git add .` to stage them, then `git commit -m "Text describing your changes"`), and push your new branch to GitHub with the command `git push origin NEW-BRANCH-NAME`
7. Go to your repository on GitHub and look for the green button to open a pull request

Make sure to maintain your local fork going forward so it stays up-to-date with this repository.

The next time you want to contribute, checkout your local master branch and run the command `git pull --rebase upstream master` before creating a new branch.

This will grab all the changes on the official master branch without making an additional merge commit in your local repository.

