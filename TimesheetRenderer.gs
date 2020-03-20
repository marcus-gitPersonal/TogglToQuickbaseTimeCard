function TimesheetRenderer(fetchTimesheet, userId) {

  this.userId = userId
  this.fetchTimesheet = fetchTimesheet;

  this.render = function(workspaceId, timesheetDate) {

    var timesheet = this.fetchTimesheet.execute(workspaceId, timesheetDate);

    var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheetName = formatYYYYMM(timesheetDate);

    var sheet = activeSpreadsheet.getSheetByName(sheetName);
    if (sheet) {
      activeSpreadsheet.deleteSheet(sheet);
    }

    var sheet = activeSpreadsheet.insertSheet(sheetName, activeSpreadsheet.getSheets().length);

    var titles = sheet.getRange(1, 1, 1, 5);
    titles.setValues([["Date", "Related Task", "Activity", "Resource", "Hours"]]);
    titles.setFontWeights([["bold", "bold", "bold","bold", "bold"]]);

    var row = 2
    
    for (var i = 0; i < timesheet.length; i++) {
      var timeEntry = timesheet[i];
      
      if (timeEntry.project != null && timeEntry.project.indexOf(':') > -1) {
        var client = timeEntry.client;
        var startDate = timeEntry.startDate;
        var project = timeEntry.project;
        var durationInHours = millisToDecimalHours(timeEntry.duration);
        var description = timeEntry.description;
        var id = timeEntry.id;
        sheet.getRange(row, 1, 1, 5).setValues([[startDate, project.split(':')[0], description,userId, durationInHours.toFixed(2)]]);
        
        ++row;
        sheet.getRange(row, 1).setNumberFormat("dd/MM/yyyy")
      }
    }

    sheet.autoResizeColumn(1);
    sheet.autoResizeColumn(2);
    sheet.autoResizeColumn(3);
    sheet.autoResizeColumn(5);
  };
}