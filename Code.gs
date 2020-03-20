function onOpen() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var menuEntries = [ {name: "Get Timesheet", functionName: "getTimesheet"}];
  ss.addMenu("Toggl", menuEntries);
}

function getTimesheet() {

  var readConfiguration = new ReadConfiguration(SpreadsheetApp.getActive(), new Logging('ConfigurationLoader'));
  var config = readConfiguration.read();

  var timesheetDate = config.timesheetDate;
  Logger.log("timesheet date: " + timesheetDate);

  var renderer = new TimesheetRenderer(
    new FetchTimesheet(
      new Logging('FetchTimesheet'), 
      new TogglRepository(config.apiToken, new Requests(), new Base64(), new Logging('TogglRepository'))
    ),config.user
  );
  renderer.render(config.workspaceId, timesheetDate);
}

function createPayload() {

  var readConfiguration = new ReadConfiguration(SpreadsheetApp.getActive(), new Logging('ConfigurationLoader'));
  var config = readConfiguration.read();
}
