function TimeEntry(client, startDate, duration, id, project, description) {
  this.client = client;
  this.startDate = startDate;
  this.duration = duration;
  this.id = id;
  this.description = description;
  this.project = project;
}

function TogglRepository(apiToken, requests, base64, logger) {
  this.apiToken = apiToken;
  this.requests = requests;
  this.base64 = base64;
  this.logger = logger;

  var that = this;

  this.detailedReport = function (workspaceId, since, until) {

    result = [];
  
    var report = fetchReport(workspaceId, since, until);
  
    that.logger.log("total count: " + report.total_count + " - per page: " + report.per_page);
    var numberOfPages = Math.ceil(report.total_count/ report.per_page);
    that.logger.log("number of pages: " + numberOfPages);
    
    var page = 1;
    
    do {
      for (var i = 0; i < report.data.length; i++) {
        var timeEntry = report.data[i];
        //that.logger.log(timeEntry.client + " StartDate: " + parseISODateTime(timeEntry.start) + " duration:" +  timeEntry.dur + " id:" + timeEntry.id + " description:" + timeEntry.description)  
        result.push(new TimeEntry(timeEntry.client, parseISODateTime(timeEntry.start), timeEntry.dur, timeEntry.id, timeEntry.project, timeEntry.description));//Added timeEntry.project/desciption/id so that they are available to the Renderer
      }
  
      ++page;
      report = fetchReport(workspaceId, since, until, page);
    } while (page <= numberOfPages);
  
    return result;
  };

  function fetchReport(workspaceId, since, until, page) {
  
    var usernamePassword = that.apiToken + ":api_token";
    var digest = "Basic " + that.base64.encode(usernamePassword);
    
    
    var url = "https://www.toggl.com/reports/api/v2/details";
    var queryString = "workspace_id=" + workspaceId + "&user_agent=GoogleSheet" + "&since=" + since + "&until=" + until;
    if (page) {
      queryString = queryString + "&page=" + page;
    }
    that.logger.log("querystring: " + queryString);
    var result = that.requests.get(url, queryString, { 'Authorization': digest });
    return result;
  }
}