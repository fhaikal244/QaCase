# WeMine test cases

Type is one of Positive, Negative or Offline.

## Flow 0 Sign in

| ID | Scenario | Steps | Expected | Type |
|---|---|---|---|---|
| SI-01 | Sign in with a valid username (first time) | 1. Enter a valid username<br>2. Enter password on the Microsoft screen<br>3. Wait for the master data download | `/user/who`, `/user/me` and `/tenant/master` are called. Progress bar reaches 100%. App asks to restart. | Positive |
| SI-02 | Username does not exist | Enter a random username and continue | Error message is shown. Microsoft login does not open. | Negative |
| SI-03 | Username is empty | Leave it blank (or only spaces) and continue | Validation message is shown. No request is sent to the backend. | Negative |
| SI-04 | Sign in as a different user on the same device | Sign in as user A and leave something waiting to be sent (a hazard or a submission). Sign out. Sign in as user B. | User B cannot see anything from user A (hazards, submissions, waiting items). | Negative |
| SI-05 | Sync fails (server error) | Make one endpoint (for example forms) return 500 during the download | Error is shown with a retry option. App is not marked as synced and no restart prompt appears. | Negative |
| SI-06 | Internet lost during the download | Turn on airplane mode halfway through the progress bar | Download stops with a clear message and a retry button. After retry the download finishes with no duplicate data. | Offline |
| SI-07 | First sign in without internet | Turn off internet, enter username, continue | Message says an internet connection is needed. App does not crash. | Offline |
| SI-08 | Open the app offline after signing in | Sign in and finish the download, go offline, close and reopen the app | User can still open the app and see the master data (locations, forms, and so on). | Offline |

## Flow 1 Equipment Inspection

Precondition: user is signed in and master data is downloaded, unless the case says otherwise.

| ID | Scenario | Steps | Expected | Type |
|---|---|---|---|---|
| EI-01 | Create a form with all field types | On web, open the form builder. Add one of each: text, date picker, select, radio, image picker. Save. | Form is saved and gets a form code. All 5 fields are shown in the saved form. | Positive |
| EI-02 | Add more than 50 fields | On web, add 50 fields, then try to add the 51st | The 50th field is accepted. The 51st is blocked with a clear message. | Negative |
| EI-03 | Add more than 4 radio options | On web, add a radio field with 4 options, then try to add a 5th | 4 options are accepted. The 5th is blocked. | Negative |
| EI-04 | Fill and submit an inspection | In the app, open Equipment Inspection and tap the add button. Pick form code A, then switch to form code B. Fill every field type and submit. | Fields match what was built for each form code. Values typed for A are cleared when switching to B. The submission appears in the list of previous submissions with the correct values. | Positive |
| EI-05 | Submit without internet | Turn off internet, fill the form and submit. Turn internet back on. | Submission is saved on the device and shown as waiting. After reconnecting it is sent once, with no duplicate. | Offline |
| EI-06 | Form is changed while submission is waiting | Submit offline. Meanwhile an admin edits the same form on web. Reconnect. | Submission is not lost. User is told clearly what happened to it. | Offline |

## Flow 2 Hazard Report

Precondition: user is signed in and master data is downloaded, unless the case says otherwise.

| ID | Scenario | Steps | Expected | Type |
|---|---|---|---|---|
| HZ-01 | Report a hazard | In the app, open Hazard and tap the add button. Fill Location, Sublocation, Area and Evidence. Submit once with the default PIC, then report another one with a different PIC. | PIC is the reporter by default. A new hazard appears in the hazard list and a follow up task is created. The task goes to the PIC that was selected. | Positive |
| HZ-02 | Mandatory fields are empty | Try to submit with Location, Sublocation, Area or Evidence left empty, one at a time | Submit is blocked and the empty field is highlighted. Nothing is sent. | Negative |
| HZ-03 | Location, sublocation and area depend on each other | Pick a Location, then check the Sublocation and Area lists. Change the Location. | Sublocation and Area only show items that belong to the selected parent. After changing the Location, the old Sublocation and Area are cleared. | Positive |
| HZ-04 | Notifications after a hazard is reported | Report a hazard in Area A with PIC = user B | User B gets a notification for the follow up task. Everyone in Area A gets a notification for the hazard. People in other areas get nothing. | Positive |
| HZ-05 | Complete the follow up task | As the PIC, open the follow up task. Add Evidence and set the Resolution Date. Tap the (+) button three times and pick a different co observer each time. Submit. | Three co observer fields appear and all three people are saved. The task is marked as done and the hazard shows the resolution. | Positive |
| HZ-06 | Resolution date is empty | Open the follow up task and submit without a Resolution Date | Submit is blocked with a message on the date field. | Negative |
| HZ-07 | Supervisor gets a notification | Submit the follow up task | The direct supervisor of the area gets a notification. | Positive |
| HZ-08 | Report a hazard without internet | Turn off internet, report a hazard with a photo, then turn internet back on | Hazard is saved on the device and shown as waiting. After reconnecting it is sent once, and notifications are sent only once. | Offline |
