1. Clone the Repository:
If you haven't already, clone the repository to your local machine using the following command:
git clone https://github.com/your-username/your-repository.git

2. Create a New Branch:
Open the repository in Visual Studio Code and create a new branch. You can do this by clicking on the branch name in the bottom-right corner of the window and selecting "Create a new branch." Enter a name for your new branch.

3. Add and Commit Your Changes:
Make the necessary changes to your files, then stage and commit them to your new branch. You can use the terminal in VS Code or the Git extension.
git checkout -b "Branch-Name"
git add .
git commit -m "Your commit message"

4. Push the New Branch to GitHub:
Push your new branch to GitHub using the following command:
git push origin branch-name

5. Create a Pull Request:
6. Open a Pull Request:
7. Merge Pull Request:

8. Update Local Master Branch:
Switch back to your local machine and update your local master branch with the latest changes from GitHub:
git checkout main
git pull origin main

9. Delete the New Branch (Optional):
If you want to clean up, you can delete the branch locally and on GitHub:
git branch -d branch-name
git push origin --delete branch-name
Now, your changes are merged into the master branch both on GitHub and locally.