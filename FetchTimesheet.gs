function FetchTimesheet(logger, togglRepository) {
  var that = this;

  this.logger = logger;
  this.togglRepository = togglRepository;

  this.execute = function(workspaceId, timesheetDate) {

    var since = formatISODate(firstDayOfWeek(timesheetDate));
    this.logger.log("since: " + since);

    var until = formatISODate(lastDayOfWeek(timesheetDate));
    this.logger.log("until: " + until);
  
    var report = this.togglRepository.detailedReport(workspaceId, since, until);
    
    return report;
  };
}
