# PlayFabPasswordResetServer

This is a project to reset your Playfab users passwords easily. Build as a node js solution with a very basic HTML front end.

I am hosting this on heroku.com with no issues.

## Using the solution

### Step 1 check out the project

Check the project code out if you want to execute it locally you will need node.

### Step 2 customize the solution

You should modify the logo and the favicons. Additionally you can modify the .css to change the look of the solution.


### Step 3 upload your project to a hosting solution

We are using heroku.com but any solution that hosts a node application will work.

In your environment you will need the following two vairables.

```
pf_titleid={Your playfab title id
pf_secretkey={Your playfab Secret Key}
```

Additionally the solution will listen on the environment variable `PORT` this is automatically configured by heroku if you are using a different environment you will need to configure PORT or modify `config.js` to use the suitable environment variable.

## Disclaimer

This is my very first node project so node experts may indeed find it laking in many ways. If you see anything you would suggest I fix or change please get in touch.