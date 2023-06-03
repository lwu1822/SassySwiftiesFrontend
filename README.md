## Sassy Swifties

Frontend: [Link to our website](https://lwu1822.github.io/SassySwiftiesFrontend/landing.html)

### Building Site

#### Backend - sudo docker-compose up -d --build (Make sure port 8036 is free)
#### Frontend - bundle exec jekyll serve 0.0.0.0:4000

## List of Features

### Taylor Swift Matching Game:

- Match as many album covers as you can in 30 seconds
- Earn Swifties for making matches and finishing the game (may be used to buy NFTs in the shop)
- More Swifties will be earned for matches made earlier in the game

### Song Guessing Game:

- A song will be displayed to the user with 2 blanks replacing 2 letters of the song name
- To guess what you think the song is, type in your guess for the song into the input text box and click the "guess!" button to check your guess
- The aim of the game is get as many songs guessed correctly as possible
- The number of total attempts and the number of songs guessed correctly are listed
- There is also a reset button that changes the song, resets the number of attempts, and resets the number of songs guessed correctly

### Multiple-Choice Quiz:

- There are 13 multiple-choice questions related to Taylor Swift
- When a questions is answered correctly, the selected answer turns green, enlarges and shrinks, and confetti falls
- When a question is answered incorrectly, the selected answer turns red and shakes

### Song uploading:
1. Users will be able to upload their own music with the song-uploading function.
2. Users enter the song name and its corresponding artist, then upload a cover photo and the mp3 file for the song by choosing the file or drag and drop.
3. After setting up the song, the user will click the upload button to upload the song, if the song is successfully uploaded, an alert will pop up saying "Song uploaded successfully".
4. Remember, the songs are stored in local storage and it's only visible to YOU. Since the files are stored in local storage, you might encounter errors when uploading oversized mp3 files or images. Otherwise, enjoy. (We encourage you to upload Taylor Swift's songs)

### Song Playing:
1. Once uploaded your own song, you may navigate to the play tab where you can find all your uploaded songs.
2. All the uploaded songs are sorted in alphabetical order by song name. 
3. The mp3 player allows you to play the song.
4. You will find a delete button near your cover photo, press it if you want to delete the corresponding song.

### Messageboard

A place for Taylor Swift fans to discuss her songs! You can create a post by filling out the title and text forms before clicking the add post button. Every time the page is reloaded, a post is added, or a post is liked, the page pulls from the API and builds each post using jQuery. Additionally, every time a post is created, the API is sent your user ID from your JWT cookie. On the backend, this id allows the api to get details including your username and selected ‘NFT’ profile from the users model. The backend also includes the date at which the post was created. 

### Shop

The shop is a place to use your tokens from games elsewhere on the site to unlock ‘NFTs,’ which are profiles you can use elsewhere on the site. The page displays all profiles and tells you if you own them, and if not how many tokens are required to unlock them. You can switch between NFTs by clicking on any owned profile. To improve scalability, this page is built entirely using jQuery. Therefore, adding new NFTs is trivial and only requires updating some basic information in the code. For security reasons, the update functions is special here. Because a malicious user could send a request misreporting their owned NFTs, the backend actually refrences the users tokens directly from the token model agianst the requirements to unlock each NFT. 

### Header

The header displays links to every page on the site as well as some decorative elements. Importantly, it is built when the page loads using jQuery onto every page on the website, meaning you only have to update one file to change all the headers.

Usage

1. Midnight Theme. Use the GitHub Pages [Midnight Theme](https://github.com/pages-themes/midnight/blob/master/README.md) as a resource.  This project started with customization of _layouts/default.html from the Midnight Theme.  If you wanted to use a different [GitHub Pages Themes](https://pages.github.com/themes/), you would similarly change `_layouts/default.html` from repo used to support that theme.  Observe comment at top of _layouts/default.html ...

```html
<!-- 
  _layouts/default.html
  customization to original Midnight theme 
  found through GitHub Pages Themes
 -->
```

2. Preview Site (Option A) - [Testing your GitHub Pages site locally with Jekyll](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/testing-your-github-pages-site-locally-with-jekyll).  This instruction provides instructions for ruby `Gemfile`,`bundle install`.  As an addition add `.gitignore` to avoid seeing build files in commit.   After pre-requisites run this command to obtain prompt for web server ...

```bash
bundle exec jekyll serve -H 0.0.0.0 -P 4001 # -H and -P are optional
```
3. Install Nix and run using a Nix shell (Option B).  This should be quicker than Docker and more reliable than previous.

```bash
sh <(curl -L https://nixos.org/nix/install) # installs nix requires root password

# restart terminal as shell is updated, then cd ~/vscode/project-dir assuming you have it cloned

nix-shell # start shell, aka nix os virtual environment
code . # activate VSCode in current directory

# open vscode terminal

bundle install # only need to run once, first time. If this command doesn't work, delete your github repo, and reclone it. 

bundle exec jekyll serve # run server

bundle exec jekyll serve --livereload --force_polling # if you are on WSL/windows and the above command doesn't work, try this.

```

4. Preview Site (Option C) - [GitHub Pages Ruby Gem](https://github.com/github/pages-gem) has additional information on making a local server.  Ruby requirements are the same: `Gemfile`,`bundle install`.   This README looks like basis of FastPages `make server` as it uses Docker and shows how to setup a `Makefile`.

5. Customizing style (CSS).  This project uses `/assets/css/style.scss` as the location to customize your CSS. To avoid warnings in VSCode make sure you install `SCSS IntelliSense` plugin.  To understand default style, make sure you ***Preview Site*** and refer to build generated `_site/assets/css/style.css` (this is worth 1000 lectures).  For the reunion site `gallery.md` uses custom style from `assets/css/style.css` to support 3 images per row.  Observe file and position of import and custom CSS, order is important as clarified in Midnight Theme readme. ...

```css
---
---

@import "{{ site.theme }}";

/* "row style" is flexible size and aligns pictures in center */
.row {
    align-items: center;
    display: flex;
  }
  
  /* "column style" is one-third of the width with padding */
  .column {
    flex: 33.33%;
    padding: 5px;
  }
```
