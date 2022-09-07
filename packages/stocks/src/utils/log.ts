// Connection URL

type Log = (message: string) => void;

type Init = (verbose: boolean) => void;

interface LogSingleton {
  writeLog: Log;
  init: Init;
}

function singleLog(): LogSingleton {
  let showLogs: boolean;

  async function writeLog(message: string) {
    if (showLogs) {
      console.log(message);
    }
  }

  async function init(verbose: boolean) {
    showLogs = verbose;
  }

  return {
    init,
    writeLog,
  };
}

export default singleLog();
