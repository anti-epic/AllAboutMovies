# AllAboutMovies
https://github.com/anti-epic/AllAboutMovies/wiki

## Live Site
https://all-about-movies.onrender.com/

## Main Technologies
Express.js <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--YbV36HLj--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/i/hpg6if7btrwilqkidqbe.png" width="200" height="100">
| Sequelize <img src="https://sequelize.org/img/logo.svg" width="100" height="100">
| Postgres <img src="https://www.postgresql.org/media/img/about/press/elephant.png" width="100" height="100">
| React <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" width="100" height="100">
| Redux <img src="https://raw.githubusercontent.com/reduxjs/redux/master/logo/logo.png" width="100" height="100">


## SplashPage
### The Homepage features a few components
* demo user for easy access to some restricted features like watchlist and leaving a review.
* Signup for new users 
* login for existing users
* search up movies
* see current trending movies by movie and by week
* see current discover movies which are popular nad have a wider range of type of movies
![image](https://user-images.githubusercontent.com/110782272/222786537-d8deaea5-4455-47cb-9fd8-e8094f150b2c.png)





## Signup
* signup to create a new user in a modal
* error handling emplented to check to see if email or user already exsist, must be a valid email, username has to be atleast 4 characters and password over 5 characters.
![image](https://user-images.githubusercontent.com/110782272/222790121-40b9c022-ebe7-47a8-9bfa-4f60b582f01b.png)


## Login
* login to existing users
* if username or password is incorrect it will display the same error message for security reasons
![image](https://user-images.githubusercontent.com/110782272/222791331-a3f00d10-d079-4267-87ee-92f1f37271fb.png)

## Demo user
* demo user in navbar is a button that logs into a seeded demo account
![image](https://user-images.githubusercontent.com/110782272/222792682-6827649b-dead-4969-89d0-afe19b05d9f3.png)

## Trending & Discover
* both are api calls to TMDB to grab current movies that are popular.
* trending has the option of pull data for today or the week.
![image](https://user-images.githubusercontent.com/110782272/222797137-9993dedd-97b3-4f21-9838-d0985ddf5e4e.png)

## Movie Page
* Shows Movie banner, background splash image, description, genres, runtime, title, revenue,budget, gross profit, cast and trailers. All pulled from tmdb
* add/remove to/from watchlist button so you can collect the movies that you want to watch
* leave reviews for current movie your viewing
![image](https://user-images.githubusercontent.com/110782272/222797081-13dff4a4-4828-4e43-acc8-398f55ea6588.png)
![image](https://user-images.githubusercontent.com/110782272/222797787-d6f5d664-6309-4e58-8c9b-1f300170eafe.png)

## WatchList 
* If nothing is on the user's watchlist the discover list will pop up to recommend some movies to check out
![image](https://user-images.githubusercontent.com/110782272/222798204-95c2c480-31a2-4e6c-bb35-630e951736ff.png)
* If user has added movies then they show in the watchlist page
![image](https://user-images.githubusercontent.com/110782272/222798892-9f138dc6-f1f9-4916-98d2-d9601745ef1c.png)


## Search page
* As you type it will pull data from the tmdb API so you can click and view their page.
* data pulled on this page are title, movie, image, description and release date

