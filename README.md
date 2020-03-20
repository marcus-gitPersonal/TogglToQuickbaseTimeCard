# TogglToQuickbaseTable
Import Toggle entries to Quickbase by:<ol>
<li>Creating rows on a Google Sheet from Toggl</li>
<li>Exporting the sheet as a .csv</li>
<li>Importing the .csv to the table in Quickbase</li></ol>

This Google Apps script imports time entries from Toggl.com into a Google Sheet using their Detailed Report API.

For a given week it pulls all the time entries which have projects in the format <b>"\<Quickbase ID\>:\<Description\>"</b>

## Installation
### Simple

Open this <a href="https://docs.google.com/spreadsheets/d/1_ztwrRoNNRgdCy6l2tBWRBtjTniR6IEEaaDc14SXJ2c/edit?usp=sharing">Google Sheet</a> and make a copy in your Google Drive account.

### From scratch

Create a new Google Sheet.

Create a new script in your newly created Google Sheet and paste the contents of all of the src/*.gs files in their respective script files.

Rename the first sheet as Config.

Add the following information in cell A1 of the Config sheet:
| |A: Variable   |B: Value                 | C: Description     |
|-|--------------|-------------------------|--------------------|
|1|timesheetDate | 01/01/2015              | Timesheet Week     |
|2|workspaceId   | _workspaceId_           | Toggl Workspace Id |
|3|apiToken      | _your toggle api token_ | Toggl API Token    |
|4|user          |_your Quickbase user_    | Quickbase User     |

To figure out your workspace_id: go to Team in toggl.com. The number at the end of the URL is the workspace id.

To figure out your api_token: go to your Profile in toggl.com, your API token is at the bottom of the page.

To figure out your Quickbase User id: go to Quickbase workspace at company.quickbase.com and "Export a table to a file". Depending on the table you are importing this may not be relevant

## Usage

You <b>need to link</b> entries in Toggl to Quickbase Record id's. I did this by naming Toggl Projects in the format <b>"\<Quickbase Record ID\>:\<Description\>"</b>
This related to a table I had created in Quickbase called Time cards, the script picks everything before the ":" on project name and assigns it to the Related Time Card.

Once Toggl has been setup so that you are tracking against projects in the right format re-open your Google Sheet. Now you will have a new menu called "Toggl" with a sub-menu "Get Timesheet".

Fill a date of the week you want to import in cell B1. If you want your timesheet for 16/03/2020 - 22/03/2020, fill the date 18/03/2020 and click Toggl > Get Timesheet.

Download the generated Google Sheet as a .csv and Import it to a table in QuickBase

## Acknowledgment

[tdpauw](https://github.com/tdpauw) for providing a foundation on how to
use the Toggl API with Google Sheet. This is essentially a less complex version of his work - for more details see [Toggl Google Sheet](https://github.com/thinkinglabs/toggl-google-sheet)
