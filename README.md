Rally Defects By Closer
============

![Title](https://raw.github.com/RallyApps/DefectsByCloser/master/screenshots/title-screenshot.png)

## Overview

The Defects by Closer app displays all defects within a selected release, along with details about when they were closed, the time closure occurred, and who performed the close action.

## How to Use

### Running the App

If you want to start using the app immediately, create an Custom HTML app on your Rally dashboard. Then copy App.html from the deploy folder into the HTML text area. That's it, it should be ready to use. See [this](http://www.rallydev.com/help/use_apps#create) help link if you don't know how to create a dashboard page for Custom HTML apps.

Or you can just click [here](https://raw.github.com/RallyApps/DefectsByCloser/master/deploy/App.html) to find the file and copy it into the custom HTML app.

### Using the App

By selecting a release from the drop-down menu, information about each story in the release is assembled for display in a grid format. You can click on the column headers to sort items in ascending or descending order. You can also click on the item formatted id link to take you to the detail page of the user story.

## Customize this App

You're free to customize this app to your liking (see the License section for details). If you need to add any new Javascript or CSS files, make sure to update config.json so it will be included the next time you build the app.

This app uses the Rally SDK 1.32. The documentation can be found [here](http://developer.rallydev.com/help/app-sdk). 

Available Rakefile tasks are:

    rake build                      # Build a deployable app which includes all JavaScript and CSS resources inline
    rake clean                      # Clean all generated output
    rake debug                      # Build a debug version of the app, useful for local development
    rake deploy                     # Deploy an app to a Rally server
    rake deploy:debug               # Deploy a debug app to a Rally server
    rake deploy:info                # Display deploy information
    rake jslint                     # Run jslint on all JavaScript files used by this app, can be enabled by setting ENABLE_JSLINT=true.

## License

DefectsByCloser is released under the MIT license. See the file [LICENSE](https://raw.github.com/RallyApps/DefectsByCloser/master/LICENSE) for the full text.