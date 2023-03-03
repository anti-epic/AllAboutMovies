# AllAboutMovies
https://github.com/anti-epic/AllAboutMovies/wiki



##SplashPage
###The Homepage features a few components
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

## Movie Page
* Shows Movie banner, background splash image, description, genres, runtime, title, revenue,budget, gross profit, cast and trailers. All pulled from tmdb
* add/remove to/from watchlist button so you can collect the movies that you want to watch
* leave reviews for current movie your viewing


