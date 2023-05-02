# ReadReader

## Table of contents

- [Description](#description)
- [Functionality](#functionality)
- [Technologies](#technologies)
- [In Progress Features](#in-progress-features)

# Description

This application is meant to help guardians to gauge the reading of the elementary aged children they care for. Children are incentivized to read by the points they get per minute read. The main user/ guardian can add child-specific prizes to encourage the child to read. The guardian has the ability to add a point value on each prize.

# Functionality

A main user can be register as the main user of this application and then login with that same email/password combination.
Once registered a user can add readers to their profile.\
<br />
The main user and reader have separate user experiences and the main navigation allows for a switch between the main user and a reader.
In the main user display there is a summary of all readers associated with that user. When a specific reader is clicked, the main user can see that reader's reading history and any prizes that reader may have earned that need to be redeemed by the main user. The reader's reading history can be edited by the main user if they feel a session has been recorded in error; i.e. A reader recorded a session while not actually reading.\
<br />
When the current selected user is the main user the navigation includes menu items to add an additional user, add additional prizes, or view view current prizes previously added by the main user.\
<br />
In the display for a specific reader, all prizes a main user has created and has assigned to that reader will appear. A summary for how many point that reader has earned will also be displayed. A reader can earned 1 point for each minute they have read.\
<br />
In the reader display a reader can select prizes based on the number of points they have accumulated. There is a button within the reader display that takes the reader to a page to log their current reading.

# Technologies

React, Node.js, MongoDB,

# In Progress Features

## Redeem Prizes

Currently the Redeem Prize functionality is in progress. The way earned prizes are added to readers is being updated in the backend. Once that is changed the funtionality to redeem prizes will be added.

## Timer

At the time being a stopwatch timer is available for readers to log their reading. In the future there will be options of different countdown timers added to the reading log display and functionality./
In the future, the ability to pause a timer before officially stopping the reading session will also be added.
